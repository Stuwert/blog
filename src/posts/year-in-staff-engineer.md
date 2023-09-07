---
title: Reflections on a Year as a Staff Engineer
date: 2023-09-06
tags: [staff-plus-engineering, hypotheses, leadership]
description: Looking back a year later and seeing how accurate my predictions about becoming a staff engineer were.
permalink: posts/{{ title | slugify }}/index.html
status: published
socialImage: /images/NPG-NPG_2000_51Lay_d1.jpg
---

## Starting Point

About a year ago I wrote about [becoming a staff engineer](/posts/becoming-a-staff-engineer/). I want to evaluate how well my initial thoughts hold up and put some new thoughts out about the role and how it's different from other Individual Contributor roles.

Me, attempting to embody "Staff Engineering"

![/images/NPG-NPG_2000_51Lay_d1.jpg](/images/NPG-NPG_2000_51Lay_d1.jpg)
_Art by Henry Dawkins, active 1753 - 1786_

## Evaluating My Assumptions Coming In

**[:Code and Culture](/posts/becoming-a-staff-engineer/#CodeandCulture)**

My idea here was that staff engineers ship code that change culture. I'm going to call this one a whiff. Yeah... it's kinda true, but ultimately this doesn't happen all that much in practice. And realistically everyone at every level should be encouraging a culture of automation that makes good practices a default.

**[:Getting Here and Going There](/posts/becoming-a-staff-engineer/#GettingHereandGoingThere)**

This one about urgency continues to ring true, with the added twist that changing the time scale of the impact I'm trying to have is important. The value of decisions has to be bounded by the start **and end** of when they will be valuable. There is a half life on decision making that means if I don't take action quickly enough, there's no that much value to making a decision at all. And other things that might not have an impact for a pretty long time.

**[:My Theory about Wealthy People](/posts/becoming-a-staff-engineer/#MyTheoryaboutWealthyPeople)**

I still feel pretty confident about this one. The higher up you go the easier it is to get disconnected from the people doing the work. You have to opt into challenging your perception of the world and staying aligned with the people owning the work.

**[:First "Bullshit" Role](/posts/becoming-a-staff-engineer/#FirstBullshitRole)**

This is a weird one? My hypothesis that it would theoretically be possible to coast is probably **false**. Good managers and directors will know whether or not I'm doing good work. At the same time, one of the most rewarding and weirdest experiences I've ever had was when someone gave me the feedback that my attitude towards problem solving made them feel like it was possible to solve any problem. And the level of trust and confidence me being around gives people still makes me pretty uncomfortable. It's weird being in a role where much of the value I have is in the ability for my process to be copied by other people.

![https://y.yarn.co/248bf2b3-7540-440c-b0dd-a360efdd6b21_text.gif](https://y.yarn.co/248bf2b3-7540-440c-b0dd-a360efdd6b21_text.gif)

I was re-watching _The Return of the King_ and there's the moment where Merry turns to Gandalf and goes "we've got the White Wizard, that's got to count for something" and you can just see the "well fuuuuu\*\*" cross through his eyes, and boy do I feel that. The number of times people will be like "Oh Stuart can figure that out" and I'm going "Oh Stuart has no idea what any of this means" internally. Yeah that's a real thing. But... that is actually also the fun of the job. Sometimes you get to scare off a bunch of Nazgul.

**[:Everyone has a different vision for staff engineering](/posts/becoming-a-staff-engineer/#Everyonehasadifferentvisionforstaffengineering)**

This one still rings quite true. Depending on company size, goals, and opinions about titles, both what a staff does at one company might differ and what the expectations for experience vary wildly. I have friends who are much smarter and more experienced who are not Staff Engineers.

## Core Behaviors

But what about the stuff I used to do as a Senior Engineer? How has that changed in my new role?

### Writing Code

I still write tons of code, but the types of code I write has changed a fair amount. Instead of focusing on building on the core functionality of a project, I spend more time digging around the extremities. I'll work on issues that have stumped other developers, patterns that can be re-used, or maintenance style tasks that involve getting up to standard with monitoring or other infrastructure type work. I also spend a fair more amount of time debugging issues as they pop up or working on tasks that are gnarly to solve but might be higher leverage. I also spend a bunch of time pairing with other devs, walking through implementations and architecture.

The one caveat I'll add here is that this experience was fairly different when I worked with the team I had been a senior engineer on versus the one I moved to already as a Staff engineer. When I remained on the same team as a Staff engineer, I spent more time on specific project execution. Though my experience was that caused way more problems than it solved with my efficiency and institutional knowledge.

Not being directly connected to the core work for a key project can be challenging at times, because emotionally the outcomes of the work is more diffuse.

### Writing Non-Code Stuff

#### Tickets

I write way more tickets than I used to. Instead of building out the tickets to spec a project, I might write tickets to help with cleanup work on system maintenance, SPIKE tickets to investigate a new technology or technique, or "encouragement" tickets to nudge the team in a new direction. I try to be very clear why I'm writing a ticket, but having potential work documented has made it much easier for EMs and teammates to understand what outcome I'm expecting.

#### Design Docs

One of the bigger surprises is that I write fewer design docs now than I used to, actually, though I know this isn't consistent depending on the role or the team. I spend more time reviewing and leaving comments or feedback. Design docs are a big way for other devs to gain visibility and develop a deeper knowledge of the functioning of the system, so I actually don't want to spend a ton of time writing documentation, unless there's a larger problem I'm trying to frame.

#### Weekly Reports

I've started writing a weekly "what I'm up to" so that the manager of the team I'm working on and my manager have a perspective on what's happening. This has really helped keep me focused on what's important and also let other people know what I'm up to, which can get pretty vague. I've found this really helps me feel progress in my work and also help create a positive conversation about where I can focus my time if I'm off-track.

Here are a couple of really excellent articles on the weekly summary.

[Why You Should Send a Weekly Summary Email](https://jefago.medium.com/why-you-should-send-a-weekly-summary-email-1c556149ed42)

[How Do I Make Sure My Work Is Visible?](https://www.theengineeringmanager.com/qa/how-do-i-make-sure-my-work-is-visible/)

### Talking to Other People

Talking to other people as a Senior Engineer was much more about being put in a room to solve a problem and then working together with other people to solve that problem. Being put in a room as a Staff Engineer means trying to drill down from a high level idea into what root causes look like and how they connect to company goals.

One thing I hear a lot as I've talked with coworkers and friends about moving up in our careers is the idea that they wished there were more opportunities just to be a **great** individual contributor without having to deal with the politics of it so much. Staff Engineering is definitely not that, but I also think, it has to do with the realities of what it means to "multiply yourself" as an engineer. Because **"politics" is the outcome of people having different views on how to do things** and the fact that being high leverage means **knowing where the leverage is** which means... talking to people.

In my opinion there are basically two ways to multiply yourself. You can either talk to other people and help them through knowledge transfer or decision making. Both of these solutions basically require an understanding of what the people around you are struggling with and whether or not doing something technical or informational is more important. So basically talking to people (and listening) becomes really key.

That being said **being impacted by politics but not having direct control of them is challenging**. We all like to imagine that there's a higher rung of the ladder where we get to not be impacted by the interpersonal weave of human society but... well... humans gonna human. I have personally found that it's better to try to turn inward and manage my emotions about challenging interpersonal situations rather than trying to effusively give feedback. Finding the right place to give feedback to affect change is key and [knowing when to push](/posts/the-power-of-social-force-in-leadership-using-tone-language-and-body-language-to-influence-change/) is a distinction I'm still getting better at.

### Support and Direction

The way I've been given and received support also changed pretty drastically. Up to Senior title often it was "where do you want to go in your career" and "what sorts of skills do you want to learn" but post role change the conversations got a lot more vague. It's both possible to "stay" a Staff Engineer but also "staying" a Staff Engineer means encountering a multitude of different problems quarter to quarter.

#### Voltrons are Important

Lara Hogan has this concept of the [management voltron](https://larahogan.me/blog/manager-voltron/). I think it's helpful (but not sufficient) to have a great manager (if my manager is reading this, hi! I think you're great). It's important to have a variety of sources for your information and to gather different perspective on challenges. Your manager (as a staff) is going to have a very specific set of pressures they're dealing with and being able to bring an outside perspective is an important way to be useful.

#### Working With Managers

The other thing I've noticed with the move to Staff is how my relationship to managers changed. Firstly, at many places Staff Engineering is an equivalent level to line managers, so there's a presumption of being a peer. Often my conversations will be about helping apply specific technical knowledge to a development strategy, thoughts on how to work with and encourage engineers, and also giving direct feedback to managers of teams I'm embedded on about how they can be more effective.

Because of our vantage points within an org, [giving feedback](/posts/go-give-someone-feedback/) is one of the most impactful things a Staff Engineer can do.

#### Being a Embedded But Not a Part Of A Team

Being a senior engineer meant being a "rock" on the team. You have a depth of knowledge and understand the tools of what you're trying to accomplish. You can be called on to ship code quickly and help lead projects to success. Being a Staff Engineer meant hearing things like "we have to be ready for when you're not on the team". Given that the role reports to the "business" it means I became someone who wasn't load bearing. This changed how I think about building knowledge. Becoming fluent in a specific codebase is slightly less relevant now. It's more important to invest time so that I can quickly pick an area of the codebase up if I need. Where in other roles your goal is to train other people so you can move up, in Staff Engineering, you're goal is to train other people because "by definition of the role" you're not a load bearing pillar for the people you work with.

### Doing Research

While knowledge of a given service might be less important, knowledge about the "technical system" becomes more important. Instead of being concerned about the implementation of a given pattern, I spend more time thinking about whether or not that pattern is going to _fit_ long term, and how to match that pattern so that it works with older and new systems that might come along.

What that often looks like is understanding new technologies that the organization, other teams, or the outside world is looking at, doing enough research to figure it out, and then determining whether or not to dive further. It also occasionally means [ignoring things](/posts/beneficial-ignorance-presence-focus-and-knowledge-work/) until they become more important.

The weirdest part about how my day to day has changed is that it could be relevant for me to spend a day "thinking" about stuff in a way that it probably wouldn't have been relevant previously.

#### Time Management

The biggest thing I personally struggle with is how much freedom and variability I'm given in how I spend my time. On a moment to moment level there are many fewer directions (and guards) that I'm restricted in. This means I have to be thoughtful about where my energy goes. As the [Staff Engineer's Path](/posts/a-deeply-incomplete-review-of-the-staff-engineer-s-path/) talks about, occasionally you have to do things that bring you joy even if they don't have a directly obvious outcome.

## End Result

The most exciting and biggest challenge to being a staff is that the role actively asks that I spend time thinking "what would make the team better?" and then trying to find ways to insert that sort of thinking and thought process in every meeting, code review, and piece of writing I do. It's weird because it feels quite easy for this to be annoying, preachy, or unnecessary most of the time, like I'm inflicting myself on other people merely to prove I can "provide value". But at it's best, I think the sort of perspective and focus can be really beneficial.

One of the biggest narratives I've noticed (even within myself) is this idea that as you move up a corporate ladder you have more opportunities to set a "grand vision" that other people can follow. I occasionally like to joke that what really happens is you're just expanding the scope of people who have the opportunity to ignore you. But, I think the truth is somewhere in between. You want to create a big picture vision so that you can react quickly to new information, but instead of shaping the effort of the people around you, what I've spent more time doing is using my big picture theory to inform the sorts of recommendations that I might make. So the grand vision isn't an outcome I inflict on the world, it's a tool I use to help the people around me doing the work, and it's informed by the research, conversations, and practice I do on a daily basis.
