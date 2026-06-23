---
title: Reading Code Is the Job
dek: We're trained to write and left to figure out reading on our own. It's backwards — most of the work, and most of the skill, is in the reading.
kicker: Essay · Craft
author: The FOE
pubDate: 2026-05-12
---

Count the hours. In any codebase older than a weekend, you spend far more time reading code than writing it — figuring out what's there before you can safely add to it. Yet every course, every tutorial, every interview optimizes for the opposite: writing from a blank file, fast, alone.

We train the rare skill and neglect the constant one.

## Reading is not a passive act

The mistake is thinking reading code is like reading prose — eyes move, comprehension happens. It isn't. Reading code well is an active interrogation. You're not absorbing; you're forming hypotheses and hunting for the line that confirms or kills them.

A few habits that separate fast readers from slow ones:

- **Find the shape before the detail.** What are the entry points? Where does data come in, where does it leave? Get the skeleton before you read a single function body.
- **Follow the data, not the calls.** Control flow tells you what runs; data flow tells you what *matters*. Trace the value you care about from birth to death.
- **Read for the invariant.** Every healthy piece of code is holding something true. Find what it's protecting and the rest stops looking arbitrary.

## The author was not stupid

The single most useful assumption when reading unfamiliar code: whoever wrote this was as smart as you and knew things you don't. When something looks pointless, the default isn't "this is dumb," it's "what did they know that I don't yet?"

> Most "bad code" is good code responding to a constraint you can't see from here.

Sometimes you're right and it really is cruft. But you earn that verdict by understanding it first. The engineer who deletes what they haven't understood is just adding tomorrow's bug with confidence.

## Write to be read

The flip side: once you accept that reading dominates, your own writing changes. You stop optimizing the keystroke and start optimizing the future read. Clarity over cleverness. Names that survive being read at 2 a.m. by someone tired. Comments that explain the *why* the code can't say for itself.

Code is read far more often than it's written. Write it for the reader — usually a stranger, often you, always tired.
