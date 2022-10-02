---
title: Why Personal Productivity Boosts Don't Work
date: 2021-04-18
tags: [productivity, advice]
description:
  Reviewing Cal Newport's new A World Without Email to figure out what we
  can do to reduce communication overload.
status: published
permalink: posts/{{ title | slugify }}/index.html
---

I recently finished Cal Newport’s new book _[A World Without Email](https://www.calnewport.com/books/a-world-without-email/)_ and so far… I have mixed feelings. I think the book does an excellent job of explaining the primary challenges that face knowledge workers. It ties up the loose threads related to the costs of context switching and informational overload by connecting personal productivity costs to business productivity costs. It makes a clear point that overload it’s not something we can simply wave away with better personal processes.

![An iMac is on a clean, modern desk with the words "Do More" in white on black text.](https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80 "Do More by https://unsplash.com/@carlheyerdahl")

He notes that so much of our discussion of productivity is framed in personal terms instead of business or systemic terms. He argues that from a business cultural perspective, our spirit of reinvention and experimentation is lacking when it comes to our workflow.

There are a few concepts I found most helpful in the book. Newport's term the **hyperactive hive mind** talks about the idea that companies have traded individual effectiveness for a sort of hive mind of knowledge that can act effectively, but slowly. He argues that this is bad because of something he calls the **attention capital principle**. His argument is that attention capital is our ability to turn information into value via focus.

## The Distinction Between Workflow and Work Execution

I think part 1 of _A World Without Email_ is worth reading. It solidifies a lot of concepts around productivity and systemic thinking. Part 1 of the book deals with making these connections between how the human brain is wired to deal with socialization in specific ways, and how our modern information workflows become the worst of both worlds, feeling like we have to be always on and always responsive. In part 2, he starts talking about specific workflows, centered around software workflow concepts of scrum and agile, specific recommendations for how to structure work in uncertain environments.

He wants to push back on the popular thinking that Peter Drucker articulated: the idea that all knowledge work must be autonomous. The two component parts that Newport breaks knowledge work up into are workflow and work execution. He calls workflow making up all of the ways that we communicate and work together and work execution is the heads down time. I can understand the desire to create this level of abstraction. It protects the autonomy that knowledge workers care about while also exposing some piece of it to outside management. But I think it gets at the wrong problem.

This sounds nice but... there isn’t actually a clear line between heads down making and heads up reviewing work. It’s a best practice for every piece of code that gets committed to go through a “PR” (named for Pull Requests or Peer Reviews) process. This is an opportunity for other developers to take a look at the code and comment on any changes. The issue here is that we’ve quickly turned a “value add” function into a “workflow” function. The developer can’t continue with other work because they need a review, either they have to ping people to get answers or they have to start something else, potentially building new context before switching back. As [this article on pull request explains](https://jessitron.com/2021/03/27/those-pesky-pull-request-reviews/) the pull request workflow causes serious gaps in the process. It's exactly the type of thing that gums up our working time.

Take a similar issue with a junior engineer who might be new to the team. Often it’s important for them to work on their own so they build the types of research and problem solving skills that will serve them as they grow in their career. Often the advice is “if you get stuck for more than 30 minutes, seek help”. Cal would seem to frame this as an inconvenience issue. The junior engineer could wait for a senior to become available. But, having been on both sides of the pattern, often getting help in that moment is important. If the junior has to wait longer it can cause frustration to ruminate on why they’re unable to solve the problem, or spiraling through unhelpful paths that result in more work for the senior developer to help untangle.

One solution to both of these issues (and one that gets explored in chapter 7 of _A World Without Email_), is to decide to do “pair programming” or “mob programming”. This is a process where 2 or more developers (with various types of structure) will decide to work together to solve a problem. As Google’s standards say, if code is paired on, it doesn’t need to be reviewed because the review has been part of the process. This sounds great, but has turned a “workflow” problem in to a “work function” problem. In order to make the system better we've made a change to how people do their work.

## Narrowing Too Quickly

This isn't to say that we shouldn't try to negotiate and create clear principles for how communication occurs, it's to complicate this notion that we can abstract out the various parts of knowledge work into value add or communication time. One of the reasons it's called attention capital isn't just because our attention adds value, it's also because the value of information is in its ability to capture other people's attention as well.

_A World Without Email_ narrows in on a process solution that programming has had for a while: scrum and agile concepts. The idea here is that because engineer's time is so valuable we should put strict delimiters on when work starts and how it's communicated. Broadly speaking it's a good starting point for small teams to work effectively together, but it doesn't solve the information overload problem.

Early days (2018) at Pana we had a problem with bugs in the system. Like every other high growth startup we were trying to work quickly to put stuff into the world and sell to new customers. Often this would result in a flood of bugs coming in taking up precious developer time to track down and fix. We put in plenty of systems in place to try to limit these, but the underlying issue was the stability of the system, the level of customer dissatisfaction that other business stakeholders would accept, and the knowledge of the system each developer had. We used scrum, but scrappy customer success managers (rightly) pushed through the process to get the solutions they needed to do their jobs.

This isn't to say that you should ignore the scrum and agile concepts discussed in Part 2, just that I don't think they alone will solve overload issues. There's a larger, more radical implication in _A World Without Email_ that I wished got discussed.

## We Don't Plan Enough

The pronouncement here shouldn't be for knowledge workers to implement simple queueing systems to take control over their days, it's for leadership and management to take a more active role in understanding who, how and when people in their organization communicate. _A World Without Email_ reframes communication as a competitive advantage. Getting informational flow right means speed in execution and reduced stress for the participants.

But the implications of how and why to get communication flows right gets muddled a bit. In part 2, Newport talks about how a group of small businesses used systems like these to improve the lives of their employees. These are good examples of businesses with a lot of alignment in terms of priorities and a relatively small number of competing internal stakeholders. Doing this stuff at larger organizations or organizations that want to move fast doesn't just require better systems, it requires rethinking project planning and interdepartmental relationships altogether.

Often when we conjure the issues with big companies we think of countless hours in meetings planning. But I would argue these meetings involve little actual planning. Instead of planning and researching we typically quickly move to decision and risk limiting. Given a direction, how can we make sure the product we want to build actually happens. But the solution to this is paradoxical, as the book mentions. In order to get that speed, we need to spend more time up front planning and coordinating goals for projects as well as the communication patterns we intend to use to execute them.

This is where Henry Ford’s "spirit of innovation" could be productively injected into the system. As explained by this now famous IDEO principle, the oft discussed [nurse workflow redesign](https://www.fastcompany.com/1139331/ideos-david-kelley-design-thinking?position=18&campaign_date=10312020) seems like a perfect example of the workflow and work function changes that _A World Without Email_ espouses. At the time, we liked to call this "Design Thinking" but this type of collaboration between business stakeholders and work functions to create systems that improved the functioning of the business are exactly the type of nuanced plans that we need to get out of information hell.

## Aligning Incentives

Spending extra time thinking about how we work feels like a drag on productivity or a symptom of process overload. But the goal here isn't to create processes for their own sake's, it's the concept that we need to apply this sort of problem solving to our businesses in addition to the services we provide.

In order to make these sorts of behaviors permanent, we need a better set of measures and incentives that frame this sort of work is important. My sense is that companies fear the cost of doing the wrong thing more than they fear the cost of lost productivity which the attention capital principle shows is a backwards way of thinking. A single process cannot make up for this incentive misalignment. And the rate of process consideration has to match the rate of change at the business. A single process change will crumple if it's met with changing conditions and minimal will to maintain them.

While _A World Without Email_ is a starting point for the conversation, more work is necessary to find, examine, and incentivize measuring communication and productivity as the goal of a business rather than the goal of the individual.
