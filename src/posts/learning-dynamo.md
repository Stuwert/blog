---
title: DynamoDB Adventure, Stepping Into NoSQL Storage Land
date: 2023-05-05
tags: [serverless, aws, aws-sam, local-development, dynamodb, nosql]
description: Discover the DynamoDB concepts that transformed how I think about NoSQL and data storage in general.
permalink: posts/{{ title | slugify }}/index.html
status: published
socialImage: /images/DALL-E-Dynamo-As-14th-century.png
---

The first time I heard about DynamoDB it was in the context of the benefits of going fully serverless. And to be honest I didn’t understand why someone would want to do any of that, outside of some specific dogma for DynamoDB.

I decided to try it out in a new project, because it seemed like a simple document datastore would be good enough for the project, and it could be good to learn.

It wasn’t until I started reading [_The DynamoDB Book_](https://dynamodbbook.com/) and with a gentle nudge from a coworker, that I understood that DynamoDB wasn’t just a JSON data store, but a different way of modeling and seeing the world of data, built on different concepts.

![The DynamoDB Book](/images/the-dynamo-db-book.webp)

### Caveat

My knowledge of this is still super thin. I’m sharing this in the hope that some of my _very early learnings_ will help other people as they learn about DynamoDB.

_DALL-E: A visualization of the abstraction of a nosql database as a metaphorical representation of a physical thing in the style of a 14th century oil painting_
![A visualization of the abstraction of a nosql database as a metaphorical representation of a physical thing in the style of a 14th century oil painting](/images/DALL-E-Dynamo-As-14th-century.png)

## Things That Changed How I Think

1. Going in I assumed that Dynamo was a simple key store. You could think about it like any other set of files with an arbitrary structure. I was wrong.
2. Dynamo isn’t just a key value store. It can also be what _The DynamoDB Book_ calls a wide column.
   1. The indexes and secondary indexes mean you can create de-normalized entities that allow you to quickly search for data across multiple columns in a whole new way.
3. Data duplication is your friend
   1. As the point that _The DynamoDB Book_ makes, a Gigabyte now costs 3 cents (and getting cheaper) as of 2014.
   2. This means that rather than trying to make sure multiple rows don’t store similar data, the goal is to store data in such a way that makes it as easy as possible to retrieve it quickly, even if it means the same data gets duplicated a ton.
   3. This, however, means developers will have to think differently about their mental model of data storage.
4. It uses HTTP as the connection model instead of TCP
   1. This is part of the reason they work so well with serverless functions. You don’t need to worry about grabbing and releasing connections from individual instances.
5. Your field restrictions don’t have to be quite as intense as they do in Postgres.
   1. For example the concept of doing something like
      1. `id: MyEntity#1234`
         would seem absolutely obscene in a Postgres world because why would you ever need to reference the type within the id. But if you want/need to store multiple similar types within a single instance, Dynamo doesn’t have… well… anything against that.
6. There are differences between Dynamo and other NoSQL type databases
   1. I didn’t fully realize that they had their own flavors.
   2. I assumed that every NoSQL storage was basically the same. But... like everything in development, there are lots of different ways to think about data storage.
   3. [Cassandra](https://cassandra.apache.org/_/index.html) is open source database structure that behaves very much like Dynamo but without being locked (or supported) in the AWS ecosystem.
   4. Mongo is more document oriented (rather than key value pair) and allows for easier restructuring of data

## Things I Hadn’t considered Until I Read the Book

1. The importanc eof Infrastructure as Code compatibility
   1. As the book points out, DynamoDB works incredibly well with infrastructure as code because all of the component parts can be encapsulated in a template or a CDK.
   2. There’s some distinction between this and running migrations. It’s still… IAC, but it lives in a different location and you have to maintain it on your own.
   3. The biggest benefit here is you don't have to worry about things like... say... making sure you're migrating data appropriately as part of a deploy step, or rolling it back if it fails. Your data management can be wrapped up into every infrastructure change you make by default.
2. DynamoDB actually requires more upfront considerations than Relational
   1. I went in with the assumption that in some sense, because you were using it as a key value store, it could change relatively simply over time.
   2. But… in fact it’s the opposite. While DynamoDB is changeable over time, thinking intently about what you care most about right now from a storage and retrieval process, helps make it easier to reduce toil in the long term.

### Questions I still Have

1. When, in this new world should you use Postgres instead?
   1. There are probably some answers around when you really need things like “row locking” or immediate consistency
   2. I found the “when to use Postgres” section somewhat uncomplying, because it really made it seem like Dynamo is probably **the** choice unless you want to get away from AWS lock-in or can’t think about the up front design decisions quickly enough.
2. Why is DynamoDB a faster storage mechanism than Postgres if it connects over HTTP? My mental model says that should be slower.

## Setting it up on my local

I wanted to walk through this because getting my hands on stuff helps me start forming better pictures of what’s happening, even if it’s at a super basic level. Things like understand what the bare minimum requirements are to set up a database help give a picture of what constraints are the most important and which ones can change.

As I mention in [another article](/posts/starting-to-figure-out-aws-sam-sync/), the purist answer is, of course, to [not run things locally](/posts/starting-to-figure-out-aws-sam-sync/). Unless you’re doing something like [AWS Amplify](https://aws.amazon.com/blogs/aws/new-local-mocking-and-testing-with-the-amplify-cli/). From AWS’ perspective you should be spinning everything up in the cloud. However, DynamoDB is one of the easier ones to relatively quickly have something up and running for your perusal.

With the help of [Dynobase documentation](https://dynobase.dev/run-dynamodb-locally/#docker-compose), I found the easiest way to spin something up is to run it inside of docker.

`docker run -p 8000:8000 amazon/dynamodb-local`

This gets a dynamo instance running locally. From there we can use the `aws sdk` to create and delete instances as necessary.

Either via the command line:

```bash
aws dynamodb create-table \
--table-name BookMatcher \
--endpoint-url http://localhost:8000 \
--key-schema \
AttributeName=GameId,KeyType=HASH \
--attribute-definitions \
AttributeName=GameId,AttributeType=S \
--billing-mode PAY_PER_REQUEST
```

Or in Typescript:

```ts
import {
  DynamoDBClient,
  CreateTableCommand,
  DeleteTableCommand,
} from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient({
  endpoint: "http://localhost:8000",
});

const tableName = "BookMatchGame";

const primaryKey = "GameId";
const sortKey = "Round";

const createTableCommand = new CreateTableCommand({
  TableName: tableName,
  KeySchema: [
    {
      AttributeName: primaryKey,
      KeyType: "HASH",
    },
  ],
  AttributeDefinitions: [
    {
      AttributeName: primaryKey,
      AttributeType: "S",
    },
  ],
  BillingMode: "PAY_PER_REQUEST",
});
const response = await client.send(createTableCommand);
```

From there it would be possible to write some code that retrieved data, modified indexes, all without racking up AWS charges.

## Conclusion

The biggest cost seems to be developer speed, to be honest. (Though, as I’ve grown in my career I’ve become less and less convinced that developer speed as a measurement is all that it’s cracked up to be.) With DynamoDB you can’t just start slamming your hands on the keyboard and cranking out a database. You have to be thoughtful about how you want to store and retrieve data. This, for me, falls in line with the idea that storage options are expanding more broadly, and you should care deeply about how and when your data is being access, instead of thinking about it purely in terms of spinning up some code and some databases.

This is all super basic. I haven’t gotten into most of the more complex concepts of storing or representing data. To the point, it’s definitely a different way of iteratively thinking about a system. In Postgres land modifying data is as easy as spinning up a new table or dropping and creating some new columns with new constraints. But in DynamoDB world, changing things like your primary access patterns aren’t quite as cut and dry. From a development perspective though, that might be as straightforward as getting comfortable with dropping and recreating databases as necessary in order to get up and running, rather than relying on iterative modifications.

This is honestly, quite exciting. Beyond the serverless-ness of it all, it's cool to start playing around with different ways to store and transport data that match the needs of the problems I'm trying to solve.
