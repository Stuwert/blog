---
title: 5 Boring Questions about ChatGPT and working
date: 2023-03-25
tags: [engineering, artificial-intelligence, leadership]
description: Mundane questions about how chatgpt will change the workplace experience
permalink: posts/{{ title | slugify }}/index.html
status: published
socialImage: /images/DALL-E-speech-calvin-hobbes.png
---

Here’s my obligatory ChatGPT article. It’s less about the space-agey stuff and more about 5 immediate consequences I can think of as a software engineer. These are small, not earth-shattering questions I have that might become completely obsolete in like a week, but, it’s where my head is at right now.

<aside class="content__aside">
(No I did not ask ChatGPT the questions, this is isn't a gimmick)
</aside>

_cartoon bubbles of two people communicating like in calvin and hobbes_
![cartoon bubbles of two people communicating like in calvin and hobbes](/images/DALL-E-speech-calvin-hobbes.png)

## 1. Will engineers continue to use open-source code packages heavily?

I’m imagining something like _lodash_ where, the package is open source, publicly accessible, and something that’s easy for ChatGPT to spit back out. Now that you can just ask it to spit out something like a `sort` with full unit tests, is there any value to adding lodash? Or will people just start re-using bespoke utilities and not installing the full set of requirements. It’s harder to imagine something like `React` going away, but smaller utils that do more specific things, one could imagine disappearing entirely.

## 2. How much will it reduce human to human communication?

It is theoretically possible that instead of asking anyone about anything else, you could simply query ChatGPT for any context you need from a coworker. Will we see situations where people stop communicating with one another altogether? Or will we communicate to one another about different types of things? How will that impact things like team psychological safety? Where communication is a core part of the way safety gets built. This is one of those things that strikes home because human to human communication is the sort of thing that’s filled with friction that we often like to avoid if we can. But, when we abstract it away, it can reduce our trust in one another overall and create bigger challenges as a team and company.

## 3. How and where will the hallucination-tax strike?

Chat-GPT hallucinates facts. And while, it does great at synthesizing things, you can’t actually validate whether the hallucination is real unless you actually read the underlying material. In the case of summaries, bullet points, and the like, reading the underlying material defeats the purpose of using it in the first place. One easy story to tell is a situation where your Microsoft Copilot creates a summary of the meeting. That summary gets sent in email form. Then another Copilot summarizes that meeting into a set of bullet points so that an executive doesn’t have to attend. However, the summary creates a lossy compression that mistranslates the intent. Will another meeting get called? Will the exec read the notes? Listen to a recording?

I’m curious what sorts of heuristics are going to pop up for when you should dive further and when you should let it be. This especially strikes me for executives and people who spend most of their time deciding what to dive in based on summaries already. Will [“swoop and poop”](https://uxplanet.org/air-cover-vs-swoop-and-poop-advice-for-designers-290d90f8a3df) get worse?

## 4. What interfaces will pop up that take advantage of the functionality better?

Typing in a question and asking for a result honestly kind of sucks. It’s helpful when you’re spinning up brand-new things like software tests or a new framework or microservice, but copy-pasting code back and forth kind of sucks. And there’ve been a decent number of situations where I’ve found myself troubleshooting the communication as much as, if not more, if I’d just been doing the work myself.

Something like the soon-to-be improved [Github Co-pilot](https://github.blog/2023-03-22-github-copilot-x-the-ai-powered-developer-experience/) seems like a much more natural interface. And I’m curious to see how this will evolve and improve over time.

## 5. How will customer service work?

I was reaching out to my health insurance the other day and asking about the coverage for a specific set of procedures. I was awed by just how frustrating the situation was, both to have to sit to and to try to understand. It’s easy to imagine why I might want something like ChatGPT to abstract that interaction away from me. I give it a set of commands/concerns and let it handle the communication. Similarly, it’s easy to understand why the healthcare company would want to do the same…

But… that leaves us in a really silly place where we’ve just exposed a much more poorly contracted set of APIs talking to one another. There are many cases where more direct communication would actually be preferable. What happens then?
