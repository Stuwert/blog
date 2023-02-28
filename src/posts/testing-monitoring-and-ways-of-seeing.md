---
title: '"Seeing" Code as a Dev: Testing and Observability'
oldTitle: '"Seeing" Code as a Dev: Testing and Monitoring'
date: 2023-02-25
tags: [monitoring, testing, developer-experience]
description: TDD, Monitoring, and other things can feel like buzzwords, but they're actually key ways to "see" the systems we build, especially as we scale.
permalink: posts/{{ title | slugify }}/index.html
status: published
socialImage: /images/DALLE-ui-of-where-bug-is.png
---

# Seeing Your Code

I remember learning about test-driven development or observability as a strategy, primarily as ways to improve the trust and reliability of my code. But as a junior developer, I remember how much those things felt like restrictions rather than empowerments. I remember thinking about how silly it was to be asked to do all of this extra work or configuration to ship the same amount of functionality.

On reflection, this is quite hilarious to me. React has basically been sold as a Developer Experience benefit, even in the early days when it required an obscene amount of Webpack setup, the benefit was always **better DX**. And the same for Typescript. But no one ever said TDD was a better DX, they just said I had to if I wanted to call my code good, so I rebelled against it.

So, I want to take a second to talk about the benefits of testing and observability, through the lens of the

## How do you know your code works?

But as I got more experience, and as I started joining more teams, I began to see the benefits of both of the things. There’s nothing quite like the experience of going through your first on-call rotation and experiencing waves of bugs with little to know warning and having to try to figure out **what the system is doing**. It really sucks. And then comes the slack journey of trying to figure out which PM or dev wrote the tickets or the code. Once you’ve found the dev/pm, you can attempt to figure out if the code is actually working the way they intended, often within a tight and stressful timeline.

There’s a lot of bike shedding around what encapsulate test-driven development and what good observability looks like, and how to tell if you’re following “best practices” at any of these things. I don’t find this critique focused method of analysis a particularly great way to encourage myself or others to jump onto the testing or observability bandwagons, or particularly good internal heuristics for understanding if I’m doing it well.

So instead, I’d like to posit we think about tests and observability in a different way: we should think about them as ways of building our internal image of the code.

### Seeing With Code

The first class I took in college was Observational Drawing. My art teacher was a soft-spoken, critical man with a belief that anyone could learn to draw because drawing wasn’t about talent, it was about changing how you see the world. He would say we spend so much time looking through our eyes that our brains would just start to abstract shapes into ideas. So instead of seeing collections of lines and shadows, we would see a house or a person. Learning to draw was about stepping back and seeing those lines and shapes and shadows again, instead of the idea. He would encourage us to hold up our pencils against the object we were trying to recreate, so we could get a real idea of the angle or the size or the distance. Basically, a way of forcing our brains to deal with the world as it is instead of the abstraction.

I think of my growth with software engineering similarly. I spent so much of my time thinking about getting to the execution of the whole that I would often miss the small building blocks to getting there.

#### My Limited Perspective

Starting in bootcamp as a developer, the first way I “saw” my code was by running it on my personal machine. I would make a change and either run it in the terminal, open up a browser, or fire off a request and see if it “did the thing” I expected. If it didn’t, I would debug the issue, make some modifications to my code, and then try again. It’s sort of the “guess and check” methodology.

#### Seeing Through Feedback

As I got more experienced, code reviews became part of that practice, and then sending the code off to a PM or a tester to exercise it and give me feedback. So, my view of the code expanded. I didn’t just think about whether I could execute the code, but whether I could hand it off, and it would succeed even if others were doing the testing.

But these ways of seeing and visualizing code are quite self limiting. You only have to go through a few rounds of on-call and a few incidents to understand just how quickly even chaining 2 to 3 functions together can create a plethora of outcomes you didn’t intend.

#### Seeing With Tests

That’s why the next level of seeing, is seeing with tests. I fundamentally believe that unit tests and functional tests don’t primarily exist to “protect” our code from future bugs. Unit tests and functional tests exist to encapsulate the boundaries of the functions and services we write. They help us understand, articulate, and see our code better, and they help us share that knowledge with other developers.

When you make a change to a piece of well-tested code and a unit test starts failing, it’s not necessarily true that that test prevented a bug from going out. But it is true that the unit test failure helped the other developer (maybe future you) have a clearer picture of how the developer who wrote or maintained it was expecting it to operate. It creates a picture that’s broader than the scope of a single execution and starts helping us paint the boundaries of the system. As a result, we get stabler code, but we also get faster development and a better development experience. Thinking about tests only as a way of catching “bad stuff” is self limiting and will make the tests you write less helpful (and less likely to catch the bad stuff).

If tests are step one, the next phase of this is code that’s made it out to production. Tests are still limited by your imperfect understanding of how your functionality might work. As you scale, you’re still dependent on pings and pongs from other users/teams to tell you whether stuff’s going wrong.

Now when I ship code, if there aren’t tests associated with it, my default assumption is that I don’t have a particularly good understanding of what that code does. It’s a quick sketch at best.

#### Seeing with Observability\* 

\* I realize reading this as a “normal person” seems rather obvious. But in technical terms, observability means using some sort of tool like [DataDog](https://www.datadoghq.com/) or [Chronosphere](https://chronosphere.io/) to introspect what your code is doing.

Monitors, like tests, are a terrifying level of abstract that requires a similar shift in how we think about our code. Instead of seeing it as a user experience or even a set of requirements, now we see it as a set of numbers, lines, and dots on a screen. We can see things like execution time, errors, sequel queries. It’s pulling us away from the direct user experience which we’re comfortable with and towards further abstractions. But just like lines and shadows, these abstractions help get us closer as engineers to maintaining and building solid codebases.

I’ve started trying this method that I call **alerts that cause joy**. It can seem absolutely wild to think that an alert could cause joy, but its fundamental purpose is to support developers. As a developer, you basically have two options:

1. You can wait until someone tells you something has gone wrong. Potentially to many people.
2. You can be told immediately, and have an opportunity to fix it before it gets bad.

There’s nothing worse than being on a support cycle and showing up Monday morning to 15 bugs related to two issues that you now have to parse your way through.

Waiting for user reports to let you know something has gone wrong is the worst. And if you don’t have observability in place, that is absolutely where you are. An observability system doesn’t just tell you when things go wrong. It gives you a window into how your system is operating. Similar to testing, if you think about monitoring only as the process of catching errors, you’re self limiting. Observability systems can show you an entire scope of your application and give you an early indication **before** things might go wrong.

Now if I ship code and don’t have the ability to look at traces, metrics, and logs together, I assume I basically don’t know what’s happening to it.

## Changing How We Write Code

_DALL-E rendering of the ui of a monitoring system that points to the exact location in a codebase where a bug is_
![DALL-E rendering of the ui of a monitoring system that points to the exact location in a codebase where a bug is](/images/DALLE-ui-of-where-bug-is.png)

The reason I want to compare tests and observability to drawing is because at the end of the day, our goal in both is to accomplish the objective. To create a cohesive experience for our users. And we still have to keep our eyes on that level of understanding. It doesn’t matter whether we draw the best lines or write the best tests if the whole isn’t coherent and meaningful. But what the techniques of observation and testing do is help give us tools to improve the scope of our sight, to create a richer experience for a wider variety of people.

A former boss came up with an excellent metaphor for this sort of development, **sick is worse than dead**. It’s the concept that in a pre-testing and pre-monitoring mindset, we’ll end up with functions that handle a plethora of use cases without really failing, which means users don’t see errors. But they also won’t really succeed, which leaves devs with a lot of work to suss out what’s going on and to try to fix it.

### Adding Tests

Often, when we start writing tests against a mature codebase, it can feel incredibly painful. Flexible functions with a variety of outputs are incredibly difficult to test. If the shape of an object in a response can vary based on the types of input, the optimal outcome is to write tests for each of those use cases. But enumerating them out is so hard.

Tests actually require that we start writing different types of functions that operate in a much smaller scope, so we can use tests to explain and understand them. And this can feel strange, uncomfortable and limiting because we can’t just write a thing to do a thing, we have to write a function that can be tested.

Tests are limiting in that way because they mean the code we write has a much narrower scope. But within that scope, we have a higher trust that what it’s telling us is something it truly believes.

### Adding Observability

I’ve seen numerous times when instead of letting a request fail, the code will catch the error, log it and then move on. The hope is that the user wasn’t impacted, and a dev can go back and clean the issue. (in our imaginations) But in practice, these errors rarely get resolved. It’s because handling errors this way kneecaps our observability systems’ abilities to actually tell us what’s going on and makes it harder for us as developers to improve our systems over time.

Like tests, this can feel strange, limiting and uncomfortable. Instead of letting a user simply continue on, we’re increasing the chance that they’ll get blocked and that it will be an immediate negative experience. But the tradeoff is that by letting these issues surface we can catch them more quickly, before they impact more people, and before they can spiral out to downstream issues causing challenges that are increasingly hard to resolve meaningfully.

Systems that are built to be monitored have better client contracts, better developer experiences, and ultimately a better user experience. The developers who support these systems have a much clearer image of the code they’re trying to support.

### Back to Baggage Claims

Part of the [:reason I find the metaphor for baggage systems in airports so helpful](/posts/explaining-software-engineering-with-airplane-luggage/) is that unlike websites, you would never try to analyze the health of the system based on simply attempting to send one bag through. At best, it’s an incredibly limited way of seeing what’s going on in one use case, and at worst it gives you a biased perspective on what your users experience.

That same boss came up with another gem, good observability gives you the same understanding **at scale** as you have early days when you’re first spinning up an application on your personal laptop.

Pulling up to a more abstract level can feel like letting go of your previous ways of seeing the world that were more concrete and more real. But the tools are in place to help us write code that gives us better opportunities to create a great experience for our users.
