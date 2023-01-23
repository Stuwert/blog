---
title: How do you deploy multiple services from a single repo
oldTitle: Multi-Service Repos
date: 2022-10-17
tags: [engineering, serverless, aws]
description: How do I deploy multiple services from a single repository?
permalink: posts/{{ oldTitle | slugify }}/index.html
status: published
socialImage: /images/serverless/cloudformation-deploy.png
---

Turning a monolith into a grouping of lambdas probably means deploying multiple lambdas to handle a variety of different functions into AWS. This got me thinking about multi-service deployment and what gets called a mono repo. A mono repo, as I understand it, is a combination of services that live side by side within a single repository, often relying on similar sets of requirements across the list. A mono repo pattern allows lambdas to live together (so you don’t have to have a repo per lambda) for easier development and manipulation. Admittedly, this was something of a naive question, as I know about things like [“Yarn Workspaces”](https://classic.yarnpkg.com/lang/en/docs/workspaces/) but I didn’t know what they meant in practice or how people end up using them.

You can find the resulting here repo: [Cipher-Serverless/Multi-Service](https://github.com/Stuwert/cipher-serverless/tree/multi-service).

Through my experience testing this out, I learned that there are potentially a few different ways to define the boundaries of different “services” within a single repo.

By that, I mean you could be talking about:

1. Chunks of code that re-use the same configuration but get deployed to different lambdas within the same cloud formation stacks.
2. Completely separate cloud formation stacks that don’t interact with one another.

Going in, I assumed that multi-services were the first, but I quickly learned that was not entirely correct.

1. Creating multiple services within a single repository
2. Orchestrating their deployment with Serverless Compose
3. Creating multiple lambdas within a single stack
4. Adding Shared Dependencies
5. Wrap-up

## 1. Creating Multiple Services within a Single Repository

This step was rather straightforward. I created a new directory at a top level called `/players` and moved the existing files into it. Then I created another directory `/games` and ran `sls create --template aws-nodejs-typescript` to generate the second set of services into it. And that was… pretty much it.

My file structure looked like:

```
│   ├── games
│   │   ├── serverless.ts
│   │   ├── src
│   │   ├── tsconfig.json
│   │   └── yarn.lock
│   └── players
│   ├── package.json
│   ├── serverless.ts
│   ├── src
│   ├── tsconfig.json
```

Having had a bit more experience with Yarn Workspaces, I knew that I needed to create a top-level `package.json` with the setting private because I knew that’s what define a thing as a yarn workspace.

```
{
      "private": true,
      "name": "Cipher",
}
```

I also made sure to name the new sub-packages appropriately

```
{
      "name": "players",
      // ... more stuff
}
```

And that was that.

The issue here was that to run each of these components, I’d either have to run something like:
yarn workspace players run dev
Deploying would be similarly onerous:
yarn workspace players run sls deploy

Which would execute the following script:
"dev": "yarn sls offline --reloadHandler"

I had two functional repos, but this wasn’t exactly the level of integration I was looking for. These services knew nothing about one another and would have to be deployed and maintained separately. I wanted to know if I wanted to treat the deployments like interrelated components.

## 2. Orchestrating Deploys with Serverless Compose

I did some googling and saw (rather recently) that Serverless introduced some new concepts related to they call [multi-service deployments this year](https://www.serverless.com/blog/serverless-framework-compose-multi-service-deployments). There were a couple of surprises here that I didn’t totally understand. For one, each sub-service continues to have its own `serverless.yaml` or `serverless.ts` component. Secondly, I would need to create a `serverless-compose.yaml` at the top level of the directory to manage the two.

Luckily, the compose file is incredibly straightforward:

```
# serverless-compose.yml
    services:
      players:
        path: players

      games:
        path: games
```

I also learned that I would need to install a couple of packages at the top level of the directory: `serverless` and `@serverless/compose `.
But from there, running `yarn serverless deploy` was incredibly straightforward.

![The Output of my CloudFormation Deploy](/images/serverless/cloudformation-deploy.png)

And the docs also explain other ways to further interrelate the different services with one another. I was, however, surprised to notice that two separate cloud formation stacks were created. This contracted my initial assumption that one repo would correlate to a single cloud formation stack.

## 3. Creating Multiple Lambdas within a Single Stack

I went back to the drawing board and started digging around the `serverless.ts` configurations that had been generated. I realized that I could add multiple functions to a single configuration. I created a new handler called `/health` and required it into the `games/` directory, and re-ran the script. Voilà, a second serverless lambda was created within that same CloudFormation stack.

I realized I had been working under the assumption that `SLS` would create a single package for each service and then deploy the same package to different lambdas. However, `SLS` under the hood appears to be a bit smarter (you can also add pruning to this) about what it deploys. It will create a separate zip for each function being deployed in the configuration.

![How Serverless Packages Different Functions](/images/serverless/serverless-packaged-packages.png)

It suggests to me that the purpose of creating separate “services” would be to be clear about different boundaries across the application. I’m imagining a situation where you want to distinguish between different types of configuration:

```
- Admin Groupings
- Events
- Step Functions
- GraphQL
- REST
```

But that still work around a distinct set of functions that are worth maintaining and thinking about within the same repository.

## 4. Adding Shared Dependencies

But the real reason you’d want to have a multi-service repository, is if there’s a grouping of packages that maintain shared dependencies across one another.

Getting this working was actually the most complicated portion of the entire work, as it required changes to both `package.json` files and `tsconfig.json` files.

I had to do some googling to try to piece together what was going on under the hood here:

- [https://stackoverflow.com/questions/57679322/how-to-use-yarn-workspaces-with-typescript-and-out-folders](https://stackoverflow.com/questions/57679322/how-to-use-yarn-workspaces-with-typescript-and-out-folders)
- [https://classic.yarnpkg.com/lang/en/docs/workspaces/](https://classic.yarnpkg.com/lang/en/docs/workspaces/)
- [https://semaphoreci.com/blog/typescript-monorepos-with-yarn](https://semaphoreci.com/blog/typescript-monorepos-with-yarn)

I started by creating a new top-level directory structure with `packages/` and `services/`. My idea here is that packages would represent shared dependencies, whereas services represent the stuff consuming those dependencies.

```
    ├── packages
    │   └── cipher-test-orm
    │       └── src
    └── services
        ├── games
        │   └── src
        │       ├── functions
        │       │   ├── health
        │       │   └── hello
        │       └── libs
        └── players
            └── src
                ├── functions
                │   └── hello
                └── libs
```

I changed the top-level package to make it a bit easier to add new stuff without having to manually add each new directory.

```
    // top-level package.json

      "workspaces": [
        "services/*",
        "packages/*"
      ],
```

Within the new “`cipher-test-orm`” directory, I added a **main** path, which represents the entry-point for the package.

```
    {
      "name": "cipher-test-orm",
      "version": "0.0.1",
      "main": "lib/index.js"
    }
```

```
    "compilerOptions: {
      "composite": true,
      // ... other stuff
    }
```

I added the above, which I believe tells the compiler that this will be the composite of multiple different simultaneously compiled packages.

I created a top-level config file:

```
// top-level tsconfig.json
{
  "exclude": ["**/tests/**", "**/dist/**", "**/node_modules"],
  "include": [],
  "files": [],
  "references": [
    {
      "path": "./packages/cipher-test-orm"
    }
  ]
}
```

Most importantly is the **references**, which defines where the referenced packages live and what order they should be compiled in. This is key in situations where referenced packages might rely on one another.

Then, at the top level I ran typescript, with a slightly different flag:

```
    yarn tsc --build tsconfig.json
```

Then I added `cipher-test-orm` to the dependencies:

```
  "dependencies": {
    // ... other stuff
    "cipher-test-orm": "0.0.1"
  },
```

and required in the package from the **health** function:

```
import { middyfy } from "@libs/lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { repeatAString } from "cipher-test-orm";
const health = () => {
  return formatJSONResponse({
    success: true,
    string: repeatAString("test"),
  });
};

export const main = middyfy(health);
```

Running `yarn workspace games dev` locally, I was able to confirm the functioning of the component!

Woohoo.

I quickly noticed that this pattern doesn’t allow for the same sorts of easy automatic recompilation. I think it would require more work to get running out of the box.

## 5. Reflections

One question I have here pretty quick is whether the typescript configuration composites are necessary for all (specifically `service/`) files I have specifically, or if I could bump those down into the `packages/` repository and have the tsc compile live specifically there.

Currently, multi-service serverless packages don’t have instrumentation to be run all at once on your local, so you can’t really turn this into a “monolith stand-in”. You have to either choose which serverless offline you want to execute, or if you want to try to spin up your own customization.

This seems reasonable to me, at least in the short term, as it’s unlikely that I’ll need to build off more than one of them at a time.

I’m getting closer to actually kicking this project off in earnest, just one more step… messing around with GraphQL and Appsync.
