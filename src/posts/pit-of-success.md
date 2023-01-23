---
title: Don't Build a Pit, Outfit Your Explorers
date: 2022-09-14
tags: [engineering, leadership]
description: Some thoughts on how to build pits of success so your developers actually fall in them.
permalink: posts/{{ title | slugify }}/index.html
status: published
socialImage: /images/ian-chen-wrrgZwI7qOY-unsplash.jpg
favorite: 5
---

We've gotten to the point in software engineering where the concept of a [pit of success](https://blog.codinghorror.com/falling-into-the-pit-of-success/) is mostly taken for granted. It's great that framework and system designers are showing the desire (and sometimes wherewithal) to make systems that users fail into success.

Dan Abramov made a great addition to this in [Optimized for Change](https://overreacted.io/optimized-for-change/). When you design an API, it's not good enough for you to make a system that's good now. Your system has to be good through time as well. Well, I'd like to propose a 0th order concern you'd have.

When you’re talking about a brand-new framework, pits of success are an important way to help push your users into beneficial patterns. I think, generally, new frameworks have done a good job of this. Elements that jump out are React’s thoughtfulness around functional components, Rust and memory safety, Go and concurrency, Typescript and type safety…

But these are all net new systems. What happens when we add things to old systems?

## Outfit Your Explorers

Most systemic change doesn't start fresh. It starts in existing systems that have lots of gnarled roots and stuff that can easily trip you up. Most of your users are tired of just trying to make it through the world and not thinking about what mountain they're going to have to climb (system changes, package or version upgrades, coding language changes).

Yes, it would be great if your users were on that shiny new system where you could gently guide them from decision to decision. But they're not. It's way more likely they're in the [99%](https://future.com/software-development-building-for-99-developers/) on an old version of some framework trying to make their project successful.

And in those cases, pits of success make about as much sense as… well… wanting to fall in a pit while scaling a mountain.

![image](/images/ian-chen-wrrgZwI7qOY-unsplash.jpg)
_This pit of success can be yours for the low low price of…_

Waiting for a pit of success means sitting around wondering how to use the system we already have and what it means to get there. It’s less about falling into (or waiting around for) best practices, and more about traversal. Waiting for a pit of success to be built means waiting around for a standard that might never make it to you, when you likely needed to ship your product yesterday.

In these cases, I would like to propose another set of metaphors, related more towards expeditions. Things like:

- equipping your explorers (documentation of teams who’ve encountered previous migrations)
- Separate parties (allowing for different groups to do a reasonable amount of duplication to understand what works best)
- Recovery mechanisms (how do we roll back changes that may not have worked)

Standards, best practices, and the like work really well on flat surfaces, and are absolutely things we should put into practice when creating brand-new frameworks and functionality. But as systems designers and leaders, we also need to figure out how to help our teams travers the mountains and get to the shiny new functionality we’re hoping for.
