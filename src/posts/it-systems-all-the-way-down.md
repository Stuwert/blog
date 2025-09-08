---
title: Systems All the Way Down
date: 2025-09-07
tags: [leadership, management, engineering]
description: What books on how systems fail and how big projects succeed can teach us about software engineering.
permalink: posts/{{ title | slugify }}/index.html
status: published
socialImage: /images/workers-at-construction-site.jpg
---

A review of two of my favorite books of the last 12 months. [The Unaccountability Machine By Dan Davies](https://www.amazon.com/dp/0226843084/?bestFormat=true&k=the%20unaccountability%20machine) and[How Big Things Get Done by Bent Flyvbjerg](https://www.amazon.com/dp/0593239512/?bestFormat=true&k=how%20big%20things%20get%20done)

Unexpectedly two of my favorite books in the last year are _How Big Things Get Done_ and _The Unaccountability Machine_. You wouldn't really think they relate to one another. _How Big Things Get Done_ is a book about why and how big projects happen and _The Unaccountability Machine_ is a scathing look at why the world feels so crappy because of the way businesses and governments are set up. But both books are about systemic capacity and measurement. And both books care deeply about seeing systems not as a grouping of interchangeable parts but as a representation of processes that can not simply be decomposed without cost. This aligns with the viewpoint that the atomic measurement of software engineering isn't an engineer it's a team.

Honestly you should stop reading this summary and read both of them. They are absolutely worth the read and will hopefully change the way you think about building and delivering projects. But I want to highlight a few of the big takeaways that I most appreciated.

- Embedded Knowledge Exists Within the Relationship Between Teams, Not Individuals
- Stable Systems Can Survive Lots of Errors Before Collapsing
- Feedback Systems Matter

### Embedded Knowledge Is Real and Valuable

One of the most fascinating conclusions of _How Big Things Get Done_ is that when you start a new project you cannot simply add up all of the component parts to get at a timeline. As a software engineer I cannot help but chuckle at this idea in comparison to the pointing a bunch of tickets, adding up the points and then hoping to come out with a result that resembles reality. Instead, _How Big Things Get Done_ suggests that you must compare the outcome of similarly scoped projects to get at a reasonable expectation of delivery. You have to compare against what similar projects have actually experienced in the past.

This is very similar to what _The Unaccountability Machine_ talks about when it talks about analyzing systems as varying degrees of black boxes. They both cannot be reduced into their component parts, and also have to be evaluated against the role which they sit. You have to map out the entire system to get useful information about its behavior.

From a software engineering perspective, this implies things like you cannot simply add an allstar engineer to make a project go faster unless you have specific knowledge about both the goals of the project and the parts of the system that they would be supporting. It also means you cannot really evaluate engineers outside of the systems they sit within. From this perspective, leveling up as an engineer becomes less about your innate technical competence and more about their ability to operate at specific levels of the system when needed. I.e. Can you operate on the org as a whole, making decisions about how its structure will change/improve based on the code that you ship? It also means you can't do things like take a team of 1 Junior and 1 Senior Engineer and replace them with 3 Mid-Level Engineers because the competency is roughly the same. You are functionally forming a new black box which you have no information about.

Adam Grant has talked about research that shows that "star employees" cannot simply transition their stardom from one company to the next when they switch roles. In fact, there's no guarantee that the stardom will persist at all. This shows two highlights that both books get at. Which implies the third thing, the knowledge that the system has is about its relationship between the parts, not the functioning of any given part. I.e. The ability for a software engineer to understand the business domain, the code domain, and delivery is not just a function of their technical acumen, but about where they sit in the business and what information they're exposed to. You can't atomize that knowledge into its component parts, even within an individual.

### Stable Systems Can Withstand Lots of Errors Before Collapsing

What's interesting about both of the books is they spend a lot of time talking about the ways systems can break down, and what happens as a result. But the other takeaway I was reaffirmed of, is this idea that when big projects (or systems) fail, they _tend_ to not fail spectacularly, outside of Black Swan style events. Since Black Swans are what get coverage, but the institutional decay that proceeds them is often very real, if unmeasured.

On a practical level there are two basic experiences I have that line up with this. Firstly, watching Twitter (X?) mostly continue to function even with a large chunk of the engineering org gone. Given that the original system was reasonably well architected, rather than seeing a broadly cascading failure like many expected, what you instead saw was pockets of instability within the system which caused bugs and annoyances, but mostly allowed the top level narrative to persist.

This aligns with my own experience of leaving and watching other leave companies. The assumption is that things will either go poof or that means that that person wasn't actually all that important. Rather, what tends to happen is that other people will compensate for a departure in a variety of ways that mostly shores up the consequences of that departure, but leaves other gaps unfilled (if that person was a regrettable exit). There, for the most part aren't flashy collapses.

In _How Big Things Get Done_ this looks like the variety of ways that projects can fail. In the instance of the couple's renovation that went wildly over on budget and time. Life mostly persisted for those individuals in a slightly degraded fashion until they ultimately decided to leave without ever having really enjoyed their renovated home. The loss here wasn't in terms of explicit chaos (necessarily), but the valuable years of their life they left unfelt.

Similarly on software projects, it's really hard to capture the value loss of poorly run projects. Shifting engineers and product around like pawns can result in degraded working conditions, frustration in communication and longer timeline. But if a top level feature still gets delivered, who will notice the two weeks that it could have been delivered sooner? It is very hard to differentiate until someone really digs in.

Big systems can withstand a huge amount of change and mostly continue to function as-is without a huge discrepancy in what they're doing until a catastrophic event occurs, the signals being delivered in ways that never get back to central planners.

### Feedback Structures Matter

Finally, the conclusion I've drawn that somewhat integrates concept from both book is this idea that if Middle Management cannot actively impact delivery in meaningful ways, they will optimize the next best thing, which is their personal responsibility. In _How Big Things Get Done_ he talks a lot about what good project management actually looks like. Best in class estimations, stakeholder management upfront, testing and iteration on new concepts, using tried and true technologies. But what if you can't make those decisions? Well, as _The Unaccountability Machine_ lays out if you're in middle management and you work for leadership that has mandated new technology and minimal estimation, what should you do? You can see the long tail coming. The options are basically either, get out or to create systems which deflect blame.

The obvious and ideal answer is, this group of people would dig in and figure out how to make it work. But this only works so long. Typically such people who do this successfully are either rewarded with promotions into leadership (of which there are fewer roles than the middle) or burn out. So what then? From a leadership perspective this offers an interesting and somewhat different viewpoint. Basically it points to dysfunction being the result of a system where teams feel they cannot accurately respond to the information being put in front of them, either because they have no autonomy to do so or because they do not believe there's any value in the attempt. So the levers here become more transparent, either reduce the information coming in (i.e. reduce thrash), increase the cost of deflection, or decrease the cost of doing the right thing (and ideally some form of all three).

One of the most interesting conclusions of _The Unaccountability Machine_ is to answer the question of why so much middle management spends its time with accountability management. I.e. Why do middle managers try to diffuse accountability away from themselves?

Well, let's look at _How Big Things Get Done_ as an example. If you're not doing things like estimating based on best in class comparisons or breaking problems into smaller components, and you're not the explicit decision maker who gets to drive those decisions, then the appropriate next step is to make sure you can diffuse as much responsibility as possible away from you (or leave). Said another way, the less direct the feedback is to make changes to _how_ things happen, the more focus there will be on accountability diffusion.

## Where To Go From Here

Ok so there's lots of pointing out how things are bad, what does that mean for managers and higher level contributors? I think there are two primary takeaways:

1. Feedback mechanisms matter. This is something you can poke at in 1-1s and in interview processes. Asking questions like "When things break down, how does that get resolved" or "What does accountability look like". Also digging in on questions like "How does the business measure project success?" and "What happens when problems go sideways" are good ways to understand and adapt what you're doing.
2. Problem solving mechanism: When things go wrong, both books work in conjunction to ask a variety of useful questions. Like... "What were the incentives that created the decisions that lead to the failure?". "What system broke down? Was it immediate decision making or higher level change?" and "Who is responsible for making the necessary system design changes?"
3. As an individual contributor, it's worth asking the question, is the cost to not being able to respond to this information really challenging for me personally? (This is the definition of stress and anxiety is getting a lot of information that you are unable to respond) or if you think digging in will have a direct benefit for you? And then mapping out what would have to be true for those components to change. The options here are to remain in a system that you have no control over and functionally be buoyed by the fact that your deflection systems will protect you or leave.

Photo by <a href="https://unsplash.com/@sunburned_surveyor?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Scott Blake</a> on <a href="https://unsplash.com/photos/seven-construction-workers-standing-on-white-field-x-ghf9LjrVg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
