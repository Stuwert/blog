---
title: Explaining Software Engineering with Airplane Luggage
date: 2023-01-28
tags: [metaphors, distributed-services, software-engineering]
description: Using an airport baggage claim system as a metaphor for distributed system engineering.
permalink: posts/{{ title | slugify }}/index.html
status: published
socialImage: /images/serverless/DALL·E2023-01-27-birds-eye-baggage-system.png
popularity: 36
---

With the move to “the cloud” and “distributed systems” it’s gotten harder to come up with a mental model for talking to the not-engineers in my life about what I do. I also think it’s harder as an engineer to visualize what’s going on under the hood.

So much of how we think about technology is predicated on the concept of a conversation, you do a thing, which creates a reaction that ends up in a result. But distributed systems don’t actually behave that way, they’re an entirely separate beast that doesn’t directly conform to traditional ways of thinking about their operation.

I’ve hit upon a metaphor that has held up and helped me that I think it’s worthwhile to share. Distributed systems (and my job) is like designing and maintaining a baggage system at an airport.

### Why I don’t like the restaurant metaphor

The most common metaphor I’ve seen for distributed systems is a restaurant. And it’s the most obvious for a variety of reasons. It’s something we interact with a lot, it uses things like queues and orders, and issues of timing come up all the time.

But… I don’t like it because it doesn’t cover the thing I actually care about, which is the ability to describe how things fail. When things go wrong at a kitchen, as far as I can tell, the metaphor of a distributed system stops working quite so well. This is because kitchens still operate more akin to a series of tightly coupled components, than a distributed system with multiple concerns.

I also appreciate the Airport/Baggage metaphor here because, as someone who has checked baggage, I know there’s an input and an output, but I can’t actually visualize what’s happening.

There are a few reasons I think this is a helpful metaphor:

1.  It’s been visualized by greats such as Toy Story
2.  It’s a complex system that we know is complex.
3.  It scales really well
4.  It helps explain the concept of cascading failure
5.  Visualizing Cascading Failure

_DALL·E a bird's eye view of the inside of the denver airport's baggage system_

![a representation of a bird's eye view of the inside of the denver airport's baggage system](/images/serverless/DALL·E2023-01-27-birds-eye-baggage-system.png)

### 1. It’s Been Visualized by Greats Like Toy Story

Firstly, and I cannot emphasize this strongly enough, I don’t have any inside knowledge of how a baggage system works.

[https://youtu.be/JxHXsjMIvD0](https://youtu.be/JxHXsjMIvD0)

That’s part why I think it’s helpful. The goal here isn’t necessarily to create a perfectly accurate metaphor, it’s to use this metaphor as a tool to help people (me and others) visualize the benefits and components of the system.

When you think about a baggage claim system, there are a few components that jump to mind:

1. Baggage Check
2. Bag Tagging
3. The Carts that Deliver bags to loading
4. The ramps that baggage people throw bags onto to get onto the plane

We can also recognize this as a vast and complex system with many competing demands.

### 2. It Scales Well

This actually might be my favorite part. One of the most difficult challenges, especially among engineers, is understanding and conceptualizing the jump from a “Server” to a “Distributed System of Microservices”.

The server pattern is easy to conceptualize. It’s got endpoints, you make requests, it does some stuff with a database, and then you get a response. To me, this is very similar to the goal of a small regional airport. For the most part, there aren’t many moving pieces. There are only 1–2 flights going in or out at a given time, so what you’re trying to accomplish is more straightforward. You store the bag in a holding location, someone comes and picks it up, and then they deliver it to the plane. And the same process happens in reverse when they unload the plane. It’s direct and it’s one to one.

It’s also apparent this is not how a system like the biggest airports in the world function.

### 3. It’s a Complex System that We Know Why It is Complex

Thinking about the baggage claim system of something like O’Hare and the types of problems it has to deal with makes it clear why the “direct” model wouldn’t work all that well. To process that many bags that quickly, it simply can’t rely on doing everything inside a single process. It needs to distribute the load between different components, each with different concerns.

It’s not too hard to imagine that part in the Toy Story 2 scene of the bag switcher as a small microservice. It doesn’t know anything about how the larger system operates, it has no idea where the bag might be headed now or later. All it cares about is making sure it kicks the bag to the right place.

Visualizing a software system in such a way can help make it clear why they’re so complex. Often when we interact with a website it feels immediate, like a call and response conversation. That makes it seem like what’s happening is simple, but usually there’s a lot of abstraction to go on under the hood to make it seem that way. The comparison to an airport is helpful here because the outcome is also simply (make a bag go from point A to point B) but the complexity of that task, with all of its competing demands, is clear.

### 4. It Helps Explain the What of When Things Go Wrong

The other reason I prefer the baggage metaphor to the restaurant metaphor is that it helps better explain what happens when the system breaks. Cascading failure doesn’t… really… happen at a restaurant, at least not the same way. Maybe our order gets delayed or discarded, but those are all easy to see and conceptualize, and not really the types of bugs that happen in software.

Often bugs aren’t even seen by the people they may have impacted, or we hear them as a weird one off story. We all have heard some story of how someone’s bag got on the wrong flight or their flight was delayed, but their bag got there on time. These are stories that map easily onto the types of issue I deal with in my job. I’ve had bugs where some data that needed to make it from a service I own to a service owned by another team, and it failed to get there for some reason.

But for the most part, when the system works, poor operation isn’t ever seen by the user, it’s just experienced as a bad day by the people who operate the system. And this is conjecture, but I suspect something similar happens at airports all the time. For example, when we’re frustrated at an airport baggage check-in because there’s a delay, there could be many systemic reasons going on behind the scenes.

### 5. Visualizing Cascading Failure

Looking at you Southwest…

_DALL·E Edward Hopper painting of hundreds of bags at baggage claim and disgruntled passengers waiting_

![a representation of Edward Hopper painting of hundreds of bags at baggage claim and disgruntled passengers waiting](/images/serverless/DALL·E2023-01-27-Edward-Hopper-Baggage-Claim.png)

These systems are so intricately linked and well maintained, often the only times we see things go wrong is when they go… very wrong. That’s really the only time we get an inner working into all the things that’s happening behind the scenes.

The [JIRA issue of last year](#)(https://www.atlassian.com/engineering/post-incident-review-april-2022-outage) and [Southwest’s issue over the holiday](#)(https://www.cbsnews.com/news/southwest-airlines-missing-bags-passengers/) seem pretty similar in this regard.

And this is the final component of the metaphor, the types of concerns and issues you face working in that complex system, look very different from the direct response world. It’s a personal reminder when building out that a distributed system has a variety of wholly different concerns than building out a more direct application.

## What’s a Meta For?

I think there are three primary takeaways here:

Finding the metaphor has been personally quite helpful for me to explain what I do and what problems I solve to my friends and family.

But mostly, it helps me reframe my perspective about what I’m trying to accomplish with the software systems I design. There will be times when I get frustrated by the amount and pace of the concepts, terms, and different ways of viewing my job. It helps to ground myself by thinking about whether the software I’m thinking of fits at an “O’Hare” or a “regional airport”.

Finally, it serves as a reminder for the fact that, similar to how there are plenty of regional airports, there are plenty of use cases where building out a more direct server pattern makes a ton of sense.
