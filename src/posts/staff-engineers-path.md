---
title: A (Deeply Incomplete) Review of The Staff Engineer's Path
date: 2023-02-28
tags: [staff-plus-engineering, hypotheses, leadership, book-review]
description: My thoughts on The Staff Engineer's Path by Tanya Reilly.
permalink: posts/{{ title | slugify }}/index.html
status: published
socialImage: /images/DALLE-pencil-sketch-map-road.png
---

Today I'm going to spend some time reviewing [_The Staff Engineer’s Path_](https://www.amazon.com/Staff-Engineers-Path-Tanya-Reilly-ebook/dp/B0BG16Y553?crid=7KIVDAA5UEB0&keywords=staff+engineer's+path&qid=1677557326&sprefix=staff+engineer's+pat,aps,152&sr=8-1) by Tanya Reilly.

![The Cover of The Staff Engineer's Path by Tanya Reilly](/images/staffpath.jpeg)

I appreciate anyone who can take on what being a "Staff Engineer" means. It broadly means you're "important" (either through earned value or title inflation), and it also means you're "different" than other engineers in some specific way (either through earned value or title inflation). So the role is weird and I appreciate anyone who tries to take it on in a thorough and nuanced way. I found it to be at once a thoroughly researched and excellently sourced reference, an overwhelming tome, and a snappy read with a number of easy to apply insights.

<aside>
I am quite sympathetic to the myriad of competing challenges responsible in writing a book. Especially one that can ostensibly become one of the standard-bearers of the literature on the topic. You're ostensibly trying to make a thing that was designed to be read front to back, while also taking into account other strange use cases like reference material, people who will drop in, and other people who will reference its existence without ever having seen the cover.
</aside>

I found it to be at once a thoroughly researched and excellently sourced reference, an overwhelming tome, and a snappy read with a number of easy to apply insights. I’m going to try to break it out into the different components that I found the most salient, by grouping them into affirming, novel, expansive, and challenging to implement. This is meant as less of a direct critique and more of a "here's how I'm thinking about the book". My assumption is that a good portion of this is influenced based on how relatively new as a staff engineer I am. I suspect for some readers the things I found insightful might seem rather obvious, and that's ok!

#### The Principles I Found Most Impactful

- [:Ask obvious questions, make the implicit explicit](#Askobviousquestionsmaketheimplicitexplicit)
- [:Make Sure the People Around Help You Raise Your Game](#MakeSurethePeopleAroundHelpYouRaiseYourGame)
- [:Celebrate landings not launches](http://localhost:8080/posts/a-deeply-incomplete-review-of-the-staff-engineer-s-path/#Celebratelandingsnotlaunches)
- [:Making work manageable for someone else](http://localhost:8080/posts/a-deeply-incomplete-review-of-the-staff-engineer-s-path/#Makeworkmanageableforsomeoneelse)
- [:Gently direct your colleagues to the most valuable work](http://localhost:8080/posts/a-deeply-incomplete-review-of-the-staff-engineer-s-path/#Gentlydirectyourcolleaguestothemostvaluablework)
- [:There are different level of staff+ engineering reporting](http://localhost:8080/posts/a-deeply-incomplete-review-of-the-staff-engineer-s-path/#Therearedifferentlevelsofstaffengineeringreporting)
- [:What can you do to make 14,000 engineers better?](http://localhost:8080/posts/a-deeply-incomplete-review-of-the-staff-engineer-s-path/#Whatcanyoudotomake14000engineersbetter)
- [:Creating Maps of Your Org](http://localhost:8080/posts/a-deeply-incomplete-review-of-the-staff-engineer-s-path/#CreatingMapsofYourOrg)
- [:There are different types of staff engineering](/posts/a-deeply-incomplete-review-of-the-staff-engineer-s-path/#Therearedifferenttypesofstaffengineering)

## Affirming

These were things that I already knew (or at least already thought I knew) but it felt good to hear them from someone who has much more experience than I do.

### Ask obvious questions, make the implicit explicit

This is a skill I think I’m particularly good at, and it was nice to hear that it’s something that might be considered valuable as a staff engineer. The point Tanya makes about these is that often there’ll be a ton of implicit assumptions about the way things are. Rather than letting those lie, it’s important to jump in and get them documented so that they can be understood, and potentially challenged. She says, “It’s better to be wrong than vague” and it's good advice. It's way better to say something specific and be told you're wrong, so your team can succeed, than to say something vague, technically not be wrong, and have your team languish.

### Make Sure the People Around Help You Raise Your Game

One thing I genuinely struggle with is occasionally being selfish. One of the points Tanya comes back to is you can’t be effective as a staff engineer unless you pay attention to your scope, influence, and happiness. Having developers around you that help you raise your game and push you to do better work is critical. It's critical both for your future growth and also to make sure you stay active and engaged in your role. And it was affirming to hear, to reassure me that I can look out for myself occasionally.

## Expansive

These are things that added to and extended my previous understanding of the world. They might’ve been things I had intuitions around but hadn’t taken to the next step.

### Celebrate landings not launches

This had been a direction my perspectives have been evolving over the last few years anyway, the idea that your code being stable over a long period of time, on production, is equal to shipping the code. But “celebrating landings” helped solidify that concept. It’s the idea that you should actually wait (or in my case additionally) celebrate when the old code is gone, when you’re comfortably stable, not just when you get the thing out there. It’s something I plan to do with teams I’m on moving forward.

### Make work manageable for someone else

As a staff engineer, starting out, it was hard to understand where my work begins and ends. As Tanya repeats throughout the book, if I’m working on code, it’s likely at the expense of someone else’s experience. But finding limits around trying to wake complex work more manageable for other engineers creates better boundaries for how I can be impactful without harming someone else’s potential learning. It’s imperfect, but I have pretty good senses of places where I think other developers might be overwhelmed, and I can also ask them about it. If I think it might be too overwhelming, I can help out. But If I think it’s enough uncertainty, I don’t need to step in, and I can let them learn through experience.

### Gently direct your colleagues to the most valuable work

This is one of those ideas that connects to general concepts of leadership without authority I’ve had for a while. But this makes it more concrete, in the sense that you should use your insight to help direct teammates towards work that you think will have a good impact on their career. This is the corollary to taking on “glue work” that might be important but not showy (that staffs should take on). Staffs should also encourage other devs to take on the sorts of high profile, impactful work that can make a difference in their career.

_A Dall-E rendering of: A pencil sketch of someone looking at a map of a road_
![A Dall-E rendering of: A pencil sketch of someone looking at a map of a road](/images/DALLE-pencil-sketch-map-road.png)

## Novel

These are concepts I found genuinely new or exciting, putting together ideas I hadn't even considered previously.

### There are different levels of staff+ engineering reporting

I really appreciated Tanya calling out the varying levels of reporting that a Staff+ Engineer could direct at. From a line manager all the way up to a VP. In one discussion I had with a former boss, he thought this sort of progression helped show that individual experience scaled up equivalently with management growth. But, I found it helpful to understand how reporting low and high has different benefits and can change the way you interact with an organization, especially as it relates to your personal and professional goals.

She also assigned the words “reporting high” and “reporting low” for the various ways of thinking about these things. It was really helpful to get a picture of the pros and cons of each level of reporting. The higher you get, the more expansive your scope but the fuzzier your view, and the lower you get, the narrower your scope but the more sharp your view.

### What can you do to make 14,000 engineers better?

The specific number, 14,000, came from a quote from a principal engineer in the book, but the point is the same regardless of the multiplier. I don’t want to admit that this one blew my mind, but it did a bit. The point, as she discusses at multiple points through the book, is this idea that you have to think about how you can make an impact on more than just one person at a time. And being explicit about that scale. Whether it’s a team of 5 devs, or teams of 25 devs, that scale is bigger than what anyone on one or even one on two interactions can manage. And finding ways to think about impacting multiple engineers is something I’m going to sit with for a while.

## Challenging to Implement

These are ideas I found intriguing, and potentially beneficial, but acting on them felt too time-consuming or complex.

### Creating Maps of Your Org

The book highlights three types of maps you can make, as a staff engineer, to help give yourself a better understanding of where you sit and how you can be impactful:

- Treasure
- Locator
- Topographical

These are different ways of seeing your employer and where you sit within it. They’re supposed to help situate you inside your organization and make you more effective. The different views, which remind me a bit of Jesse Schell’s [100 lenses of game design](https://www.amazon.com/Art-Game-Design-Book-Lenses/dp/0123694965?crid=3GRIDQPVZFTTZ&keywords=jesse+schell&qid=1677557012&sprefix=jesse+schell,aps,227&sr=8-3&ufe=app_do:amzn1.fos.304cacc1-b508-45fb-a37f-a2c47c48c32f), were about your personal goals and the various relationships between different teams.

I really appreciated the focus on different ways of seeing your org, but actually implementing these maps felt overwhelming and close to impossible. If I had a free week I could probably sketch out it all, I might be able to articulate something, but I’m not actually sure how useful such a map would be. I wished there were more directly implementable ideas I could jump into with a bit less effort.

### There are different types of staff engineering

The book outlines 4 different types of staff engineering work (show below) to highlight the different ways that a staff+ engineer can engage and drive a project forward.

- Core Technical Skills
- Product Management
- Project Management
- People Management

Tanya calls out the different flavors of work that a staff engineer can take on. The point she was trying to make, I think, is that there’s a variety of different behaviors that you can (and maybe should?) flex into across your career depending on where the moment takes you. But, while each of these certainly feels like types of work I’ve done in the past, whether that work is valuable is heavily constrained by the organization you happen to be in. I’ve had managers at various jobs explain to me that engineers really shouldn’t be doing any product work to create a clearer separation of responsibility. If that’s the case, what does that mean, and how should I be thinking about these flavors of staff engineering? The book left me a bit wanting more in that regard.

## A Good Resource

If I had a recommendation, I would probably say similar to Camille Fournier’s [The Manager’s Path](https://www.amazon.com/Managers-Path-Leaders-Navigating-Growth/dp/1491973897?crid=20KUJFVB7YJBE&keywords=camille+fournier&qid=1677557149&sprefix=camille+fournier,aps,199&sr=8-3), it’s probably best to take a section or a couple of chapters at a time that feel most applicable to you and your role, and focus on those, instead of trying to read it all in one go. But the writing, level of research, and insight is consistent throughout the book, and it’s one a plan to come back to from time to time.

### Epilogue: Sections I Would Focus on

If you have checked the book out, or on loan from friend, here's what I would focus on, ranked:

- Chapter 3: Creating the Big Picture (Pages 69-111)
- Chapter 8: Good Influence at Scale (253 - 284)
- Chapter 1: What Would You Say You Do Here (Pages 3-30)
- Chapter 4: Finite Time (115 - 150)
