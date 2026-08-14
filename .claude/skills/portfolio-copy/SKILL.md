---
name: portfolio-copy
description: Write or edit any user-facing text for this portfolio site - headlines, project descriptions, outcome lines, CMS content, meta descriptions, alt text. Use whenever prose will be read by a visitor. Enforces a specific, non-generic voice and blocks AI-slop patterns.
---

# Portfolio copy

This site sells one contractor to professional recruiters, most of them
technical: engineering managers and full-stack engineers who hire as part of the
job. Copy that could describe any contractor actively hurts it. Everything below
serves that.

**Write up, not down.** This reader knows what a message queue is. Naming the
actual stack, architecture, and tradeoff is what earns credibility; explaining
the basics loses it. Jargon used precisely is fine. Jargon used decoratively is
not, and they can tell the difference.

**Confident, not edgy.** They are assessing professionalism. A direct line with
a point of view works ("If you need a contractor who waits for a ticket before
thinking, that's someone else"). Snark, hustle-culture register, and
manufactured contrarianism do not. If a sentence is doing personality rather
than making a claim, cut it.

`.ai/design-reference.html` is a **reference for tone, not a spec**. Read
it to calibrate register, then write for the current design. Do not treat its
sentences as fixed or its structure as binding.

## The test every sentence must pass

**Could this sentence appear on a different contractor's site unchanged?**
If yes, it is unusable. Rewrite it until it is falsifiable, specific, or both.

- Unusable: "I deliver high-quality solutions tailored to your needs."
- Usable: "Eight engagements, current priorities first."

The second one could be *wrong*. That is what makes it worth reading.

## Voice targets

**Short declaratives, often in pairs, where the second turns the first.**
> AI does my boilerplate. I do the thinking.

**Concrete counts, honestly small.** Ten years. Two years. Eight engagements.
Never "numerous", "countless", "a variety of", "many years of".

**Appositives instead of dramatic pauses.** This is the main technique for
carrying a subordinate clause without reaching for an em dash, which is banned:
> the pipeline work, CI/CD, infrastructure as code, observability, that makes
> releases boring in the best possible way

**Admitted limits build credibility.** Flagging an NDA or a placeholder reads as
confidence. Never paper over a gap with vague language.

**Direct address, sparingly, with an edge.** One or two per page maximum,
otherwise it turns into a sales letter.

**No exclamation marks. No emoji. No rhetorical-question openers.** A question is
allowed when it does real work, such as a contact-section heading.

## Project outcome lines

Wherever a project gets a one-line pull quote, that line **makes a claim with
something at stake**. It never summarises the paragraph above it.

| Works | Why |
|---|---|
| Editorial process as code. What used to live in people's heads now lives in a template. | Names the actual transformation |
| Where AI-generated output meets a pipeline that refuses to let it ship broken. | Takes a position on the project's central tension |
| The project that moved me off .NET Framework and onto modern .NET for good. | Personal stake, admits a before-state |

Failure mode: *"This project delivered significant value through modern
architecture."* Summarises, claims nothing, fits any project.

## Banned vocabulary

Never in user-facing text:

`seamless(ly)` `robust` `cutting-edge` `state-of-the-art` `leverage` (verb)
`empower` `elevate` `unlock` `delve` `realm` `tapestry` `testament to` `landscape`
(figurative) `journey` `passionate` `dedicated` `innovative` `solutions` (standing
alone) `synergy` `holistic` `best-in-class` `world-class` `game-changer`
`transformative` `streamline` `harness` (verb) `navigate` (figurative) `foster`
`myriad` `plethora` `crucial` `pivotal` `vital` `comprehensive` `utilize`
`facilitate` `meticulously` `boasts` `stands as` `serves as` `plays a key role`
`it's worth noting` `needless to say`

## Banned structures

- **"In today's fast-paced digital landscape..."** and every variant.
- **"Whether you're X or Y..."** hedging opener.
- **Rule of three adjectives.** "fast, reliable, and scalable" is a tell.
- **Closing restatement paragraphs** that repeat the opening in new words.
- **Bullet lists where every item is a bolded two-word phrase plus a colon.**
- **"It's not just X, it's Y."** Allowed at most once per site, in the headline
  position, where the contrast is the point. A second use turns the first into a
  formula. Check whether it is already spent before using it.

## Typography

A `PostToolUse` hook (`.claude/hooks/check-typography.sh`) blocks these on write:

| Blocked | Use instead |
|---|---|
| em dash | Restructure with an appositive, colon, or full stop |
| ellipsis char | Three periods, or cut the trailing-off |
| smart quotes | Straight quotes |
| bullet char | A real `<ul>` |
| non-breaking space | A normal space |

The em dash is the single strongest AI tell in prose, which is why it is blocked
outright rather than rationed.

**Not blocked, because they are correct typography:** en dash in numeric ranges,
middot as an inline separator, arrows in status labels. Use them properly; do not
"clean them up" when you find them.

To change what is enforced, edit the hook. It is the source of truth, not this list.

## Process

1. Draft.
2. Delete every sentence failing the "could be anyone" test.
3. Read it aloud. Anything that sounds like a brochure gets cut.
4. Check length against the space the design allots. Length creep is the most
   common regression.
