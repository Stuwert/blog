---
title: Ingesting External Financial Data
oldTitle: Building out an Ingestion System
author: Stuart Urback
tags: [engineering, software-architecture]
date: 2021-04-18
description: An overview of a financial ingestion data structure.
status: published
permalink: posts/{{ oldTitle | slugify }}/index.html
---

The Prompt

In the summer of 2020, I worked with the finance team at Pana to improve the reliability of our system, which matched booking charges to trips to bill them back to the customer's trips. The system generates a transaction for every request which meant extra transactions floating around unassociated to a trip, making it difficult to understand which were errors and which were "correctly" unassociated. The system occasionally duplicated transactions or failed to create a transaction for a trip. Because of the "floating" transactions, it was hard to tell if this was because it failed to generate or because it generated but didn't link. And, because of how the charging worked, occasionally we would bill customers before the transaction finalized, resulting in occasional "correction" charges of small amounts added on to the customer.

The result was a system that was unreliable and hard for our financial team to use (to validate we knew where our money was) and reduced trust from our customers who had to follow up with us to validate that we billed them the correct amount.

In addition, while we used three key services at the time (Uber for rides, Emburse for virtual cards, and Transferwise for reimbursements), there were plans to expand the system to further providers. We wanted to develop something that was extensible and customizable, reducing work for future developers to implement a new payment type.

## The Plan

We centralized around a few different core requirements that the system should be able to handle and continue operating on.

### Terminology

Working with the finance team, we came up with a set of vocabulary and system to

- ingestion: storing a flat copy of external financial data sent to us by a provider
- application: attempting to save the external data as a Transaction record
- charge: charging the customer for the applied transaction

We actually built out an overview of how the tool worked in Whimsical, which helped us iterate on our ideas about how the system functioned and how we would like it to function.

### Multiple Entry Points

Each of the external systems had different ways of communicating with us. Emburse used a webhook that would send us updates anytime a transaction state change occurred, Uber sent us a monthly csv, and Transferwise sent the result in the response. The system we built had to accept entry points from a variety of sources, as we couldn't dictate the method used by our providers.

### Duplicative Data

Because of the external sources and multiple entry points, duplicative data could come through. We wanted to capture each instance of that input but also only store the correct number in our financial system at the end. This meant having a unique primary key per external source that the system could use to track and keep a record of each instance. This reliability also had the benefit of meaning our internal team could "rerun" a CSV upload multiple times to validate it went through, and it also gave our reports a historical record of each input attempt for free.

### Outcome Record

The system had to produce a record of what happened when it tried to apply a transaction. This had the benefit of making it easier for on-call developers to debug issues if they came up (which helped us as we were running initial tests on the system) and also support reporting tools for the financial teams.

### Reporting Data

The financial team wanted to build queries and reports to determine the percentage of successful attempts and review any areas of concern. They also wanted a set of tools to determine the total amount of outstanding spend for a period of time.

### Stingy Restrictions and Replayability

From a technical perspective, the other goal we had was to restrict the amount of data entering the system to the minimum amount. This would help us debug the system more effectively, and because the system persisted the external data, we could theoretically push a code change, and "replay" the application of a detail that had an incorrect outcome.

## The System

### Processors and Backups

We divided the system to ingest and apply transactions into (roughly) three separate processors. The first processor takes a single external record and saves it for processing. The application processor accepts a source and a record id and attempts to generate a new transaction or invoice for the customer if necessary. There's also a third processor, built as a cron to check for any records in the table that have gotten lost (for whatever reason) and then attempt to apply them.

Custom entry points kick off the ingestion processor, which kicks off the application processor. The backup cron also kicks off the application processor if it finds any stragglers hanging around.

### Rough Architecture

One goal from a technical perspective was to reduce the amount of custom logic that each external provider used. At the time we had 3, but it was possible that as we grew, we'd want to add multiple different types, with a different configuration for each.

Typescript came into handy here from a perspective of Class and Interface management. We created an Abstract class that contained the bulk of the functionality but then use types to require each of the customized methods to return the same details.

This meant each tool could compare things like status (which would differ between external sources) with the same application processor. It was the marriage of extensibility without repeating ourselves that we were looking for.

The application processor is where all the magic lies. It checked if it still needed to attempt processing, and then would try to find an appropriate linkage to a trip and customer to bill. If anything unexpected occurs along the way, it would store an error record so that someone from finance could follow up. In all cases, it would return attempt details, so that we could explain what had happened.

The final decision we made was to wrap all creation logic (any new records that might need to be generated for charging) inside a single database transaction so that if any component failed, it would generate none of them. We didn't want to deal with any lingering records we had to chase down.

## The Outcome

The result has been satisfying. The system has a 99.99% automated matching success rate, there's reporting built into Periscope that our financial team can use, and we've only received one bug ticket in the last 6 months, caused by an unexpected charge being sent to us from an external source. Because of the architecture of the system, we resolved that issue in under a day. Decoupling the system also allowed us to add custom error monitors to each component, so we can more easily tune alerts to each part.
