---
title: I Made a Game With ChatGPT, Here’s what happened next
author: Stuart Urback
date: 2023-05-16
description: What I learned trying to integrate ChatGPT into a single player web game.
tags: [games, computer-games, chatgpt, ai, serverless]
status: published
socialImage: /images/Dall-E-2023-05-16-board-game-code.png
---

_How’s that for a clickbait title?_

## I Built a Game

One of my favorite board games of all time is called [Decrypto](https://boardgamegeek.com/boardgame/225694/decrypto). In it you have a set of four words you're trying to share back and fourth with your teammates (who can also see the words), but you're trying to do so in a way that won't tip off your opponents who cannot see the words, but can use their powers of deduction to figure out what's going on.

One of the reasons it's single player is the simple matter that trying to find people to reliably test a multiplayer online game is challenging. However in the past, the sorts of tools and APIs that were available to make these word associations real weren't all that great. They didn't have the sort of flexibility and randomness that make word association fun. So when ChatGPT came out it felt like a great excuse to play around with a tool that seemed more capable of creating interesting associations that might be able to support a game.

I built a single player variant of this game called Cipher, where the basic goal was a guess and check game where players would be given series of words and asked to categorize them, until they get the opportunity to guess the word. I didn't want to keep the same Cipher concept, but the idea of categorization seemed straightforward enough, so I figured, why not play around with book categories.

The approach I took to this experiment was basically to have an API call to ChatGPT (3.5 I should specify) behind a GET or POST route, making a specific request to ask it either to categorize books or to give an explanation on why it categorized books the way it did. It's not a good game, but it is something that could almost be called a game. The goal was to build a UI where users could drag and drop the categorized books into the slots they felt fit best, and then be explained to by ChatGPT why they were or weren't wrong.

## Stuff I Ignored From The Start

There's a world where the UX on the game is nice, where the code is well formatted and where it's easy enough to add on. But ultimately that wasn't my goal with the game. My goal was to understand the functionality of the bot.

I was also interested in understanding what the game might say about the relationship between myself and the algorithm. These sorts of weird game-y expectations outline how we have different experiences about what language is and isn't. And in a lot of ways it did that.

## The Game

You can play the game here: [https://card-cataloger.netlify.app/](https://card-cataloger.netlify.app/). (It is very rough and prone to erroring)

The game occurs over two rounds.

At the beginning of the game, I fetch a random date in the last 10 years, and get 14 randomized books from all of the New York Times best-seller lists on that day. I then pass those books onto the ChatGPT prompt asking it to categorize them into 3 categories.

_Dragging and Dropping Books_
![Dragging and Dropping the Game](/images/games/card-cataloger/Drag-and-Drop.gif)

The 14 books are handed off to the frontend which then splits it into two hands of 7 (or maybe less if I didn't get 14 books back). Players are asked to sort each of the books into the category they think fits best.

_Seeing A Description of the Book_
![Seeing A Description of the Book](/images/games/card-cataloger/Show-Description.gif)

When the round ends they're given an explanation of why they were incorrect.

_Showing the Results After the First Round_
![Showing the Right and Wrong Answers After the First Round](/images/games/card-cataloger/Show-Results.gif)

Then they get the second hand of books and have to categorize the rest, with double points being awarded for correct answers. And that's it!

_Final Results_
![The UI of the final results of the game](/images/games/card-cataloger/Final-Answers.gif)

There are definitely a bunch more directions the game could go, but if you want to mess with this Proof of Concept, you can find it here. It will probably be up for a bit longer.

## The Boring Stuff

The game was built on top of Parcel, React, and XState for game management on the frontend and Chalice deploying to an AWS Lambda on the backend. It uses OpenAI's ChatGPT turbo and New York Times' Book API to source data.

I suspect there will be two primary critiques my conclusions based on this approach:

1. I'm using 3.5 and ChatGPT 3.5 is significantly less good at what I'm asking it to do than ChatGPT 4 is.
   1. Yes that's true, but I'm not so sure how much it matters in this case. The takeaways will likely be the same (if somewhat less oftenly occuring)
2. I'm not using ChatGPT the "right way".
   1. As many tutorials will explain, the correct way to "use" ChatGPT is to throw it into some sort of chat based interface. I'm just still completely skeptical that this is the way most of these things will function. I think prompts will ultimately become wholly overrated as models get "smarter" and as the best prompts are agreed on and able to be re-used effectively. The most exciting use of AI I've seen thus far still comes from Copilot where it acts as a sort of superpowered autocomplete, without requiring me to jump out of my flow to actually function.
   2. Setting a UI in front of this might be unnatural, but in the flow of the game "categorizing books", I don't think asking people to type out a chat based prompt particularly makes much sense, and much of the benefit of the chat interface is that it means that people get to do the heavy lifting of figuring out and ignoring the hallucinations.

## What I Realized

### Formatting Responses

Even giving very specific commands, the formatting of the response would come back in a variety of ways, with different characters, increments (numerical versus alphabetical), and different parentheses. Sometimes it would come back as [Book A: Title] or sometimes it would be Book A: TITLE or sometimes it would be Book A: [Title] or Book 1: Title or any combination there in. That meant that getting the request back in a format that I could easily decode and use was always a challenge. I know it's theoretically possible to request a JSON response, but parsing JSON from a source seems less than ideal.

### The Occasional Hallucination

While I expected hallucinations going in, I had hoped they would be more... well interesting on average than they ended up being. Most of the hallucinations I noticed happened when asking it to describe why a particularly book had been categorized a certain way. The facts of the book seemed to get all jumbled up. I was hoping that the hallucinations would lean more towards suggesting an interesting category or the like, but I never quite got there.

This all goes back to prompt tuning. There's probably a world where I could do more processing to categorize the books, and then a separate prompt using the books to ask for an interesting category. But, it also doesn't seem like the type of thing that you can create clever prompts to get better results. While it seems you can give better prompts to get better answers, you can't necessarily write cleverer prompts to get cleverer answers. (More exploration is probably warranted there.)

### Getting Back What I put In

One constant struggle was trying to make sure that the books I put into the algorithm came back out. I would say about half the time I would get a different number of books in total that were categorized, than the number I asked for details on. Even though I almost always got the correct number (and format) of categories. I would also occasionally get a response like "I'm a Large Language Model and do not have opinions", which, given the amount of time I put in, would break the system and require a reset.

For example I had the temperate set fairly high (1.0 on a 0 to 2.0 scale), I was equally likely to have that result in poor formatting as it was to be more interesting or dynamic responses. There are probably other sequences of requests I could make to get the appropriate combination of sequencing and interesting names, but I'm not sure if that sort of time investment is necessarily worth it.

### What's the Role Determinism Has to Play in the Future?

When it comes to Large Language Models, the whole nature of the "stochastic parrot" is both the excitement and the drawback to the technology. Obviously whole methods of working will change, but spending your time trying to clean up after that sort of output is neither productive nor particularly useful. It feels like there are two potential paths in the road. We either "get over it" and build out more chat based systems that let human brains parse the subtle differences that might get spit out, or more time and effort are put into improving the structure and determinism of the output.

It's not all that hard to imagine a world where you're inputting all of the drag and drop functionality into ChatGPT instead of creating a UI on top of it, but in that world is the lack of determinism of the experience a drawback? Or part of our lives? Playing sudoku that way wouldn't work the same, for one example. But maybe that's just the cost of further integrating the power of the technology into our lives.

## The Game Stuff

One of the most interesting things about experimenting with the game was realizing that actually the input of the books played a huge role in how fun or exciting the output might be. If the books were too closely clustered together in concept, it wouldn't be all that interesting to try to pick them apart, because all of the answers would feel like cheats. If the books were too far apart, the connections inside a category felt more like a laundry list than an insight.

On top of that, I realized that while there were real moments of sparks, when a connection between some disparate ideas would come alive, those were too few and far between. My favorite was still _The Hungry Caterpillar_ and _The Mueller Report_ being both categorized as "growth and discovery", but for the most part none of the connections were revelatory or particularly interesting to play with. The "bad input bad output" comes into play here. Zach Gage [talks a lot about how](https://eggplant.show/51-good-sudoku-with-zach-gage) when he started creating [Good Sudoku](https://playthistonight.com/posts/the-best-sudoku/) he thought that just setting up the engine was most important, but what he learned was that type setting the challenge was equally important, because most of the possible (valid) puzzles actually weren't all that fun. Doing something similar here feels equally true.

This could come about in various ways. Either doing something like a "Wordle" with daily challenges that everyone has to take, or something more like a versus challenge, where you would get to the pick the books, and challenge someone else (or yourself) to figure out how they might connect.

## Game Changes to Make

### A "Challenge" Button and GPT

One interesting feature I thought about was the ability to "Challenge" the results. If you didn't like something you could ask the algorithm to reconsider and re-adjudicate the decision. I do actually think this would be an interesting area for the game, but it would only be interesting if the game itself had its own persistent model (or maybe the player gets their own model), where the successful and unsuccessful challenges would create a tapestry of experiences that could inform future community or individual play. It's the difference between training and managing your own model versus using a more standard out of the box formula.

### The Word Association Was Quite Good But Not Quite There

Honestly the connections between themes were often quite fun and insightful, and I appreciated how it was able to come up with categorizations that created some sort of interesting play. There are probably better prompts I could've managed (or maybe if I get that GPT4 API Key) to see if the output would be a better structure. But what I realized was that the magic of both Decrypto and Codenames doesn't just come from the rules, it comes from the adversary nature of the other players. Having to create a perfect prompt to try to spit out interesting combinations didn't feel like a productive use of time, and the connections between the books, for the most part, wasn't particularly illuminating or exciting. Most of the feedback I got was "I realized the bot was right and I was wrong", which is interesting, but not all that fun. Fun would be answers more like "That was a connection between two concepts I hadn't considered before".

## Not a "This is Useless" Critique

It's easy to conclude that this is some sort of "not ready for primetime" critique of using ChatGPT. But it's not. What I was specifically interested in was the ability to use ChatGPT as a sort of "human proxy" for multi-player games (especially word games), and then as its own sort of language based experience. What I'm interesting in is how sprinkling these sort of language based experiences requires a lot of shifting on the part of how user experience flows work. Either the entire UX has to change to be a chat based experience (which I'm skeptical is the long term goal), or a lot of work has to go on behind the scenes to make sure the inputs and outputs are useful for the specific experience you're trying to give to your user, and having it be a value add beyond something you could do by slamming some prompts into the text box.

The sorts of experience that seem the most exciting to me, are the ones like Github Copilot where the completions are extensions of the thought process you already have, rather than as a wholesale shift to a prompt-based methodology. But there's a lot of tension there, because the prompt format is obviously the past of least resistance, structuring the outputs into a UX format that's not a conversation isn't trivial, which means it can't simply be pasted into applications quickly and easily.

My concerns about the technology are less about the automation of it all (though there's plenty of that) and more about looking at how easy it is to create really bland, middle of the road content, pushing more risk and responsibility on our users instead of using the functionality to give them more incredible experiences.
