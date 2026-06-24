---
title: The Foundations of Software Engineering
dek: A field guide to the ideas that don't churn — the load-bearing principles under every framework you'll ever learn and forget.
kicker: Essay · Foundations
author: The FOE
pubDate: 2026-06-18
---

Most of what we call "learning to code" is learning the surface. A new language this year, a new framework the next, a new deploy target the year after that. It feels like progress because the vocabulary keeps changing. But strip away the syntax and the tooling and you find a much smaller set of ideas underneath — ideas that have barely moved since the people who named them were writing in assembly.

This is a guide to that smaller set. Not a tutorial, and not a list of tools. A map of the foundations: the principles that stay true after the framework you learned them in has been deprecated twice.

> The half-life of a framework is about three years. The half-life of a good idea about software is closer to thirty.

We'll move through four of them — abstraction, correctness, the cost of change, and taste — and try to say something concrete about each, because "fundamentals matter" is the kind of advice that's true and useless at the same time.

---

## What an abstraction actually buys you

An abstraction is a trade. You hide some detail so you can stop thinking about it, and in exchange you accept that you no longer *can* think about it without lifting the lid. The whole discipline of engineering is choosing those trades well.

The naive view is that abstractions are good because they reduce code. They don't, reliably — a bad abstraction adds code *and* hides the thing you needed to see. The useful question is never "does this reduce duplication," it's:

- Does this let a reader stop thinking about something they don't need right now?
- When the hidden detail *does* leak — and it will — how expensive is it to get back to?
- Is the boundary drawn where the problem actually has a seam, or where the code happened to split?

That last one is the whole game. Good abstractions trace seams that already exist in the problem. Bad ones invent seams to feel organized.

```python
# A boundary at a real seam: the caller never needs to know the storage backend.
def save_user(user: User) -> None:
    _backend.put(user.id, user.serialize())

# A boundary at a fake seam: "helpers" that just move code around
# without hiding any decision the caller would otherwise have to make.
def process_user_helper_v2(user, opts, ctx, flags):
    ...
```

The first hides a *decision* — where users live. The second hides nothing; it just relocates complexity and charges you a function call to find it again.

<figure class="fig">
  <p class="fig-label">Fig. 1 · A boundary at a real seam</p>
  <div class="fig-body">
    <svg viewBox="0 0 600 330" width="600" role="img" aria-label="A diagram of an abstraction boundary: above the line the caller sees one call, save_user(user); below the line the boundary hides serialization, the backend, retries, and the schema version." style="max-width:100%;height:auto;font-family:'EB Garamond','Adobe Garamond Pro',serif">
      <text x="300" y="26" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-size="11" letter-spacing="2" fill="#7a6f5d">WHAT THE CALLER SEES</text>
      <rect x="190" y="40" width="220" height="46" rx="8" fill="#f6f2e6" stroke="#b8ad8e"/>
      <text x="300" y="69" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-size="15" fill="#1a1612">save_user(user)</text>
      <line x1="300" y1="86" x2="300" y2="141" stroke="#b8ad8e" stroke-width="1.5"/>
      <line x1="40" y1="151" x2="560" y2="151" stroke="#f97316" stroke-width="2"/>
      <rect x="241" y="143" width="118" height="17" fill="#e8e1cd"/>
      <text x="300" y="155" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-size="10.5" letter-spacing="2" fill="#c2570c">THE BOUNDARY</text>
      <text x="300" y="188" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-size="11" letter-spacing="2" fill="#7a6f5d">WHAT IT HIDES</text>
      <line x1="300" y1="161" x2="98" y2="206" stroke="#a89e85" stroke-width="1" stroke-dasharray="2 4"/>
      <line x1="300" y1="161" x2="232" y2="206" stroke="#a89e85" stroke-width="1" stroke-dasharray="2 4"/>
      <line x1="300" y1="161" x2="370" y2="206" stroke="#a89e85" stroke-width="1" stroke-dasharray="2 4"/>
      <line x1="300" y1="161" x2="503" y2="206" stroke="#a89e85" stroke-width="1" stroke-dasharray="2 4"/>
      <rect x="40" y="206" width="116" height="38" rx="7" fill="#ddd4b8" stroke="#b8ad8e"/>
      <text x="98" y="230" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-size="12" fill="#4a4236">serialize()</text>
      <rect x="170" y="206" width="124" height="38" rx="7" fill="#ddd4b8" stroke="#b8ad8e"/>
      <text x="232" y="230" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-size="12" fill="#4a4236">_backend.put</text>
      <rect x="308" y="206" width="124" height="38" rx="7" fill="#ddd4b8" stroke="#b8ad8e"/>
      <text x="370" y="230" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-size="12" fill="#4a4236">retry on fail</text>
      <rect x="446" y="206" width="114" height="38" rx="7" fill="#ddd4b8" stroke="#b8ad8e"/>
      <text x="503" y="230" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-size="12" fill="#4a4236">schema v3</text>
      <text x="300" y="284" text-anchor="middle" font-size="17" font-style="italic" fill="#7a6f5d">one door, one decision — “where users live”</text>
    </svg>
  </div>
  <figcaption class="fig-cap"><span class="fig-n">Fig. 1</span>Above the line, the caller sees one call. Below it sits everything the boundary spares them — <strong>serialization</strong>, the <strong>backend</strong>, <strong>retries</strong>, the <strong>schema</strong>. A sound boundary hides a decision you can name in a single sentence, no “and” required.</figcaption>
</figure>

### The leak test

Here's a test that has never failed me: an abstraction is sound if you can explain what it hides in one sentence, without using the word "and." The moment you need "and," you've bundled two decisions behind one door, and the door will jam.

---

## Correctness is a budget, not a state

Beginners think of correctness as binary — the code works or it doesn't. Experienced engineers treat it as a budget you spend deliberately, because *total* correctness is unaffordable and usually unnecessary.

The skill isn't writing perfect code. It's knowing which parts of the system have to be perfect and which parts can be merely good, and putting your guarantees where the blast radius is largest.

A few places where the budget is almost always worth spending:

1. **Boundaries that take untrusted input.** Anything a user, a network, or another team can reach. Validate at the edge; trust the interior.
2. **State you can't recompute.** Money, audit logs, anything you can't regenerate from a source of truth. Lose a cache, shrug. Lose a ledger, update your résumé.
3. **Invariants other code assumes silently.** The ones nobody checks because "that could never happen." Those are exactly the ones worth an assertion.

And places it usually isn't:

- A render path that's visibly wrong the instant it breaks — the screen *is* the test.
- Throwaway scripts whose failure mode is "run it again."

> Spend your correctness budget where failure is silent and expensive. Save it where failure is loud and cheap.

The engineer who tries to make everything bulletproof ships late and still has bugs — just evenly distributed ones, including in the places that didn't matter. The one who aims the guarantees ships sooner and fails in the cheap places on purpose.

---

## The cost of change is the real metric

Almost every "best practice" you've been handed is, underneath, a claim about the cost of future change. We don't write tests because untested code is morally inferior; we write them because they make change cheaper later. We avoid global state not out of superstition but because it makes every change ripple further than you can predict.

This reframing is useful because it gives you a way to *decide* instead of cargo-culting:

> Don't ask "is this clean?" Ask "what does this make the next change cost?"

A pile of straightforward, slightly-repetitive code that any junior can modify in an afternoon is often cheaper-to-change than an elegant abstraction only its author understands. Cleanliness that raises the cost of change is just decoration with a good vocabulary.

This is also why premature abstraction hurts so much. You pay the cost of the abstraction up front — the indirection, the learning curve, the wrong boundary — to save a change cost that, half the time, never arrives. You bought insurance against a fire in a house you hadn't built yet.

The discipline is to let cost-of-change be revealed, not guessed. Write the duplicated version. Feel where it actually hurts to change. *Then* abstract the seam the pain showed you — and not a moment before.

---

## Where taste comes from

Eventually you reach the edge of the rules. Two designs both pass the tests, both have reasonable cost-of-change, both draw their boundaries at real seams — and one is clearly better, but no principle in the book tells you why. That gap is where taste lives.

Taste isn't mystical. It's compressed experience: thousands of small "that felt wrong later" moments collapsed into an instant judgment you can no longer fully unpack. The way you build it is unglamorous:

- **Read more code than you write** — especially code that has survived a few years of change, because survival is the only real review.
- **Go back to your own code after it's been maintained** by someone else, and notice what they cursed at.
- **Name the discomfort.** When something feels off, don't just move on — articulate *why*, even badly. The articulation is what turns a feeling into a tool you can reuse.

Taste is the foundation under the foundations. The principles tell you what's defensible; taste tells you what's good. And the only way to the second is through enough reps of the first that they stop being rules and start being reflexes.

---

The frameworks will keep coming. Learn them — you have to, that's the job this quarter. But spend a little of your attention one layer down, on the things that were true before this framework and will be true after it. That's where the compounding is. That's the foundation.

Everything else is just this year's syntax for it.
