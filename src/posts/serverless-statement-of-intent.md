---
title: Serverless, A Statement of Intent
date: "2022-09-18"
tags: [engineering, serverless]
description: What I plan to accomplish with this project
permalink: posts/{{ title | slugify }}/index.html
status: draft
# socialImage:
---

I believe that while server less is right now a pain in the butt, long term, the types of systems being developed will look more and more like “server less” systems and less and less like traditional servers of yore. This has less to do with the various costs and benefits of say Ruby versus Node, and more to do with the fact that companies like AWS and Google Cloud Provider are able to provide basic functions (like routing) out of the box for developers.

While in the short term, the learning curve for these pieces of functionality feels even more arcane than code, in the long term, as time and money gets invested, these pieces of functionality are going to be cheaper and easier to configure and manage. Why bother having to configure your own “worker queue” when you can click a few buttons in AWS and ship a single file function to manage it for you.

But how do we get there?

### Knowledge I’m coming in with

I have enough experience with books like _Accelerate_ to understand the general concept of why lambdas are good.

My theories are twofold:

1. Devops resources are the scarcest in the world. Building out EKS clusters is a pain in the ass and trying to maintain them is harder. “Serverless” technologies basically mean you have to spend less time on that stuff as a business.
2. While single servers are great and scale wonderfully, they actually create huge chokepoints on the development side because the more developers that have to commit to a single infrastructure the harder it gets to actually make changes.

I’ve also been around long enough in the serverless space to hear things like

1. Lambdas can’t handle long execution times.
2. Cold starts in lambdas are awful experiences for our users.

#### Why People Are Actually Anti-Lambda

I generally believe Swyx’s post about [the end of localhost]. Basically as systems get increasingly complex (and we’re honestly almost already there), less and less of our system development will happen on a personal machine and more and more development will happen “in the cloud”. For a group of people who have made their bones on having a lot of control over their set-up and environment, moving to patterns that are more and more defined by vendors (and vendor lock in) feels scary.

Honestly, I’m in agreement about this skepticism and concern. However, regardless of if it’s the right choice, it’s certainly the choice we’re headed towards and it’s worth understanding what’s going on under the hood.

### The Plan of Attack

Look I know that going to server less land is about a whole new way of seeing and thinking about the world. But while that might be the way the world is headed, it’s easiest for me to understand this stuff in the context of how I typically develop software. Long term most of this stuff is going into event driven systems where the “call and response” of the front end backend coupling doesn’t make much sense, which will further disconnect the need for this type of work.

So what I’m going to do is I’m going to build out an API in AWS lambda using Graphql and Restful components to communicate between a backend and a front end. I’m going to be walking through my impressions and expectations each step of the way. Along with what I have learned.

Yes… ultimately lambdas mean thinking about “distributed systems” or toolchains that behave completely separately from the typical call and response of REST requests. We’ll get there eventually, but to start, I’m going to recreate what I know.

### Goals for this Experiment

Have a deployed, publicly accessible API the operates in a similar way as an existing API I have deployed previously:

This Games API: [https://github.com/play-this-tonight/games-api]

You’ll notice that right now this is **only** a Graphql server. That is not entirely helpful for us at the moment. So… I’m going to be doing some general stuff to understand how and why different components of AWS work.

That I know enough to create competent fully orchestrated implementations of AWS lambda and that I know enough when to use lambda versus not (and where the technology is going) and

### My Approach

At each point I’d like to write a quick blog post about what I’ve learned and then publish those thoughts, and move onto the next one.

I plan to follow Julia Evans’ advice here and do one thing at a time, asking questions, framing those questions, and then repeating back what I’ve learned

[https://jvns.ca/blog/2018/09/01/learning-skills-you-can-practice/]

I also plan to keep the projects separate. Each will have a single goal and try to answer a single question [https://jessitron.com/2022/06/07/keep-your-experiments-separate/]

- Each post will focus on a single question or concern. This will either come in the form of:
  - Attempting an implementation
    - Will we be adding a “health” check? You bet your ass we will.
  - Answering a Question I have about
- Each question answered will come in the form of a new GitHub branch related to implementation.
