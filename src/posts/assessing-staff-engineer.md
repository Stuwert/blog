---
title: How Do You Assess a Staff(+) Engineering Candidate?
date: 2025-08-28
tags: [engineering, hiring, staff-engineer]
description:
permalink: posts/{{ title | slugify }}/index.html
status: published
socialImage: /images/diagram-sketch.jpg
---

Reviewing a bunch of code challenge submissions for an open Staff role has me reflecting on a surprisingly tough challenge. How do you differentiate technical competence when it comes to Staff Engineering versus, say, a strong Senior Engineer? It's an interesting problem because there's a larger information gap that's filled by social proof (in my experience) than with roles that are more directly hands on keyboard. How can you fill that gap with useful assessments?

One of the intricacies of hiring is that there exists an information gap that is (now) incredibly easy to overcome, on some levels, and so the usual heuristics for measurement are harder than normal. A lot of the traditional things that differentiate Staff+ Engineers from Senior Engineers are soft skills like projects coordinated, product roadmaps supported, and standards enforced. But that's all social proof stuff that's easy enough to fake and is hard to represent or differentiate outside of direct conversations.

From a technical skills perspective how do you think about measuring a Staff Engineer against those things? And what are the hard skills that a Staff Engineer has that a Senior Engineer might not?

## Things I'm (personally) not particularly interested in

### Ability to create arbitrary unbounded features

I've thought about this one and this is almost always the most common interview question. But, contrary to popular belief I don't think that engineers should try to moonlight as PMs (I think engineers should generally get better at thinking in product, but that's a different story).

Secondly, this is far and away the least indicative part of the stack. Producing arbitrary feature code quickly is indicative of very few things that we actually care about in the Staff role, especially in the ways I would expect a Staff Engineer to help guide and mentor other Associate and Senior Engineers.

### Shape Drawing

This is something of a personal attack (on myself) because I am in fact very good at drawing the shapes. But I'm just not sure it's a good signal to much of anything from an internal/external information perspective. Being able to quickly whip up boxes and arrows is a very good way of communicating quickly, and I would expect most Staffs and Principal Engineers to do stuff like this, but... pretty much any Senior Engineer worth their salt should also be able to do domain modeling within a reasonable amount of time as well. Being able to draw something like "Gateway->Function" doesn't tell me much of anything meaningful about your ability to map systems.

### Digging into the Why

This gets back to the social proof perspective, and it's easy enough to just practice your way out of this. Asking good questions during an interview (which is something you should definitely practice as an interviewee) is good, but might not represent anything special about seniority, experience, or competence.

I also don't think being able to explain the why or the value of a particular software you "shipped" means much of anything. I'm fairly confident I can speak to at least 3 different projects at my current job that I was not involved in, and it's hard to tell how much of the answer is BS versus thoughtful engagement.

## Things I am interested in

### Ability to quickly model and interpret domain from reading code (across multiple systems ideally)

The thing good staff engineers can do is pick up codebases, and then understand what that system is trying to accomplish between the two and how they sit relative to each other. From there a Staff Engineer should be able to add functionality (in the right or at very least defensible location) to meet the task at hand.

### Create coherent function guards and boundaries while still passing tests

Constraining a system in useful ways is a challenging but important problem that often differentiates systems thinking. Being able to do that **in practical code** is non-negotiable in my mind. Given a relatively straightforward function (and tests), add useful boundaries that would make system failure create more useful information, without

### Quickly producing code to solve problems

I think that Staff+ engineers should be able to quickly write useful code when necessary. Especially when there are clearly defined goals (like tests or other outcomes), Staffs should be able to produce code quickly to solve those problems.

<aside class="content__aside">
<h3>Am I Just Writing This to Satisfy My Own Conceit?</h3>

#### Or... how do I actually stack up against these questions?

If I you are an employer who is reading this trying to assess my quality as a Staff+/Principal Engineer and is deciding whether or not to offer (or continue to offer) me a salary:

_Yeah I absolutely rock._

If you aren't...

I think I'm ok, and I think that's ok. A lot of my current role is more strategic and when I dig back into domain specific code, it takes me longer to get up to speed than I would like. Being able to do the feedback loop (read, interpret, write) is a fluency you can go in and out of. I'm plenty confident I can pick these things back up.

</aside>

## Are any of these tests Realistic?

In short, basically no. The reason why unbounded questions and "digging into the why" are so popular is that they're relatively cheap to produce and maintain. And most teams think they're good enough at sussing out BS to get away with it. The reality (especially in the current hiring market in 2025) is that no one wants to talk about all of the time you spent crafting systems to hire someone instead of you know.... crafting systems that will make your employer money more directly.

### Are there elements of this you can copy?

I think so! If you're someone starting with a challenge and you've got the standard "unbounded questions" or "design a feature", I'd start by taking whatever exemplar you have as a system diagram (that you're ostensibly comparing candidates to) and share it with the candidate. Ask them to critique it and ask them what they might change and why. Then, ask them to produce the code for one of the pieces of the system, mocking out responses from connecting systems, and producing reasonable constraints on their behavior of the system.

This isn't perfect, but is getting at a few core concepts that are useful to test like how does this person respond to constraints and feedback. It also will get at things like looking at how they go from modeling a system to how they actually write code based on that model, and also what types of mocks they use to situate it. This, to me, feels like a step forward from the typical "Senior Plus" exercise that seems incredibly common.

Photo by <a href="https://unsplash.com/@kellysikkema?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Kelly Sikkema</a> on <a href="https://unsplash.com/photos/a-person-drawing-a-diagram-on-a-piece-of-paper-lFtttcsx5Vk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
