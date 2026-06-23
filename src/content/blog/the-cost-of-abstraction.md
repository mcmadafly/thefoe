---
title: The Cost of Abstraction
dek: Every layer you add to hide complexity charges rent. A short essay on reading the bill before you sign the lease.
kicker: Essay · Design
author: The FOE
pubDate: 2026-05-29
---

There's a moment in every codebase where someone notices two functions that look alike and reaches for the obvious fix: pull out the shared part, give it a name, call it from both places. It feels like tidying. Sometimes it is. Often it's the first payment on a loan nobody decided to take out.

Abstraction is not free, and pretending it is the most expensive mistake in the trade.

## The bill has three lines

When you introduce an abstraction, you pay on three fronts, whether or not you read the bill:

1. **Indirection.** Every reader now has to jump to a definition to understand a call. Multiply that by everyone who touches the code, forever.
2. **The wrong boundary.** You committed to a seam before you knew where the real one was. When requirements move, the abstraction fights you instead of helping.
3. **Lock-in.** Two callers now share fate. A change one needs and the other doesn't has to be negotiated through the shared code.

None of these show up the day you write it. They arrive later, quietly, in the form of changes that take three times longer than they should and nobody can quite say why.

> The cost of a good abstraction is paid once, up front. The cost of a bad one is paid a little at a time, forever, by people who didn't choose it.

## Duplication is cheaper than the wrong abstraction

This is the line that takes years to believe. Repeated code is *visible* — you can see all of it, change all of it, delete all of it. The wrong abstraction is *invisible* — it spreads its assumptions into every caller, and untangling it means understanding all of them at once.

When in doubt, wait. Write the duplicated version. Let the codebase show you where change actually concentrates, and abstract *that* seam — the one the pain pointed at — instead of the one that looked symmetrical on a Tuesday.

The best abstractions feel less like inventions and more like discoveries: the seam was always there, you just finally saw it. Those are the ones that earn their rent.
