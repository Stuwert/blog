---
title: Testing, Monitoring, Ways of Seeing as a Dev
date: 2023-02-25
tags: [monitoring, testing, developer-experience]
description: TDD, Monitoring, and other things can feel like buzzwords, but they're actually key ways to "see" the systems we build, especially as we scale.
permalink: posts/{{ title | slugify }}/index.html
status: draft
---

When I talk or hear about test driven development, domain driven design, hexagonal architecture, or monitoring as a strategy, I find the general perspectives and rules to be hard to follow. Like how can you tell what Test Driven Development actually is? Do you, say, have to always write the tests first? And anytime I've encountered these principles the interactions can feel dogmatic, restricting, and confusing as hell. Why would I want to slow down what I'm doing, not rely on my own experience, and spend more time writing tests and managing monitors than writing code?

But the reasons become clear especially as the systems you build become more complex. Those tools are the only ways we can see and comprehend the software we write.

### Unhelpful Metaphors

When I started learning about test driven development I basically thought it was complete BS., to be honest. The thought that you would write tests before you wrote your code and then (and only then) would you write functionality for your code seemed absolutely ridiculous.

Since then I’ve come around to the perspective that anything that doesn’t have solid tests is basically code that no one truly understands how it operates. I still wouldn’t call myself someone who believes in “Test Driven Development”, but tests are a core part of how I develop. But how did I get there and why?

### Evolution of Architecture and Ways of Seeing

Starting as a developer, the first things you think about are literally doing things that show up on your screen/terminal/etc. So code is, in that sense, literally something you create that produces an impact that **you** can notice. What you see in the code is literally how you understand how your code works.

But as you start developing more complex systems you might integrate other tools like manual testing, UX feedback, or say, asking friends or family members what they think about something you’ve created.

If you work at a software startup that’s scaling, you’ll start to build out a bug process. And that process will involve collecting bug reports from your users and using those pieces of information to inform how you “see” your software.

Seeing things with your eyes, either in the form of personal user testing, recreating a flow on your local machine, or through screen capture technology like Fullstory can feel the most concrete and physical. But at best it can only give you a limited slice of what many of your users might be seeing and building.

### Building Flexible Systems

As devs we want to build flexible systems. We want systems that do their best to accomplish what their users want and only error at the final moment that things go wrong. Often this happens through the liberal application of try/catches and error logs that are meant to “inform” some sort of monitoring system when things go wrong but not let it escape to the user that anything bad has happened. Or it happens by allowing different values to be not set and have the system just try to “deal with it” if that happens. Has the user not provided their phone number yet? That’s fine, just let it through and we’ll clean it up later.

A former boss came up with an excellent metaphor for this sort of development, **sick is worse than dead**. In terms of maintaining the system, the problem with defaulting to sick instead of dead is that it’s actually hard to tell **what the system is trying to accomplish** at any given time. Is phone number required? Maybe for this business it is, so maybe you’ll get a bug there, but from a systemic perspective it isn’t.

Sick is worse than dead not only proliferates the number of bugs that get created, it also doubles down on implicit knowledge in the operation of the system. How do you know what the business requirements are? You have to access the developer that put it together and why they intended to allow that value through. If code doesn’t accurately represent business expectations, the business will still expect those things, but then it’s on the developers to understand and maintain the system they’re a part of.

And it directly connects to “ways of seeing”. It’s because in this world you can only “see” what happens as the result of the output of the system and someone communicating to you something has gone wrong. That “seeing through communication” is faulty, flaky, and scales really poorly.

### Tests to the rescue

Often when we start writing tests against a mature codebase it can feel incredibly painful. Flexible functions with a variety of outputs are incredibly difficult to test. If the shape of an object in a response can vary based on the types of input, the optimal outcome is to write tests for each of those use cases. But enumerating them out is so hard.

Tests actually require that we start writing different types of functions that operate in a much smaller scope, so we can use tests to explain and understand them. And this can feel strange, uncomfortable and limiting, because we can’t just write a thing to do a thing, we have to write a function that can be tested.

For me, what this comes down to is how you, as a developer, understand the functioning of your code, at a unit, functional, and integration level. So often we think about tests as “defenses” to “protect” code from unwanted errors. And that is _somewhat_ the case, but in reality what you’re actually doing is building out a toolset around understand what your code does. And I would basically contend that if you haven’t written tests, you probably only have a vague and abstract understanding of your code.

Rather than waiting to see what the output tells you, tests let you know upfront what’s going on underneath the code. You can articulate to very specific levels of understanding:

- The test fails if a phone number isn’t provided
- The test succeeds if a phone number is provided
- The test fails if a phone number has an incorrect format

Tests help you dial in exactly what’s going on, and help, as a developer, you to create code that creates very clear expectations for its callers. You no longer have to run the system in order to build a mental model of its operation, you can run the tests and understand how it builds and shapes what it’s trying to accomplish.

### Tests Aren’t Enough

So tests are step one, the next phase of this is code that’s made it out to production. Tests are still limited by your imperfect understanding of how your functionality might work. As you scale, you’re still dependent on pings and pongs from other users/teams to tell you whether or not stuff’s going wrong.

And this is where monitoring comes in. Monitoring will similarly require you to change the way you code because monitoring systems are often built around standardized ways of thinking. If you, for example, catch errors all over the place, your tests might pass but your monitoring system might be useless because it can’t give you a signal on when those occur. So you have to refactor your REST routes to use default error catching, and in the course actually rethink the UX a bit. This, just like the tests can feel strange, unsettling, and even limiting.

I’ve started trying this method that I call **Errors that cause joy**. It can seem absolutely wild to think that monitoring could cause joy, but its fundamental purpose is to support developers. As a developer, you basically have two options:

1. You can wait until someone tells you something has gone wrong. Potentially to a lot of people.
2. You can be told immediately, and have an opportunity to fix it before it gets bad.

There’s nothing worse than being on a support cycle and showing up Monday morning to 15 bugs related to two issues that you now have to parse your way through.

Waiting for user reports to let you know something has gone wrong is the worst. And if you don’t have monitoring in place, that is absolutely where you are. Monitors don’t just tell you when things go wrong. They give you a window into how your system is operating. Early errors absolutely cause joy by giving you clear insight into how and when things occur.

### Back to Baggage Claims

Part of the reason I find the metaphor for baggage systems in airports so helpful is that unlike websites, you would never try to analyze the health of the system based on simply trying to send one bag through. At best it’s an incredibly limited way of seeing what’s going on in one use case, and at worst it gives you a biased perspective on what your users experience.

Pulling up to a more abstract level can feel like letting go of your previous ways of seeing the world that were more concrete and more real. But the tools are in place to help us write code that gives us better opportunities to create great experience for our users.
