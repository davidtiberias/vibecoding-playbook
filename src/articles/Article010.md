---
title: "The SEO Recursion: How I Vibecoded the Search Result You Just Clicked"
date: "2025-12-26"
index: 10
keywords:
  - "Vibecoding SEO strategy"
  - "AI generated SEO workflow"
  - "Vike SSG SEO optimization"
  - "JSON-LD schema for developers"
  - "Programmatic SEO with LLMs"
  - "Google search ranking case study"
---

**You are reading this right now for one reason: The system worked.**

You didn't stumble here by accident. You likely typed a query into Google—maybe about "vibecoding," "AI workflows," or "Google Antigravity"—and the algorithm served you this page. You saw a headline, a snippet of text that matched your intent, and a date that told you this content was fresh.

You might wonder: _Did I hire an SEO agency? Did I spend weeks tweaking meta tags and agonizing over keyword density?_

No. I simply asked the AI to do it.

This article is the documentation of that process. It is a meta-analysis of how I used the **Vibecoding Playbook** to optimize the very platform that hosts it, turning a "black box" React app into a "glass box" that Google loves to read.

---

## The Problem: The Single-Page Application "Black Box"

When I first built this site using the workflow, it was a standard Single-Page Application (SPA). It looked great to humans, but to search engines, it was a ghost town.

If you viewed the source code, all you saw was:
`<div id="root"></div>`

Google's bots are smart, but they are impatient. They don't like waiting for JavaScript to load just to find out what a page is about. I had built a library, but I had locked the doors and turned off the lights. I needed to turn this into a **Static Site**—where every article exists as a pre-built, readable HTML file the moment the bot arrives.

## The Prompt: Treating SEO as a Feature Request

In traditional development, fixing this requires deep knowledge of Server-Side Rendering (SSR), hydration mismatches, and complex build configurations. In **Vibecoding**, it requires a clear intent.

I didn't look up the documentation for Vike (the framework I'm using). I didn't write the Schema.org JSON manually. I simply fed the problem into the workflow.

**The Prompt (Step 02 - Translation):**

> "My site is invisible to Google. I need to convert this from a client-side SPA to a pre-rendered Static Site. I need dynamic meta tags for every article, a sitemap.xml, and JSON-LD structured data so Google knows these are articles written by David Tiberias."

**The Execution (Step 04 & 05):**
The AI didn't just give me advice; it refactored the architecture.

1.  **It implemented SSG:** It configured the build tool to generate real `.html` files for every Markdown article in my folder.
2.  **It injected the Head:** It rewrote the renderer to inject `<title>` and `<meta name="description">` tags on the server side, before the JavaScript even runs.
3.  **It added the "Business Card":** It generated **JSON-LD Structured Data**. This is a block of invisible code that hands Google a digital business card saying: _"This is an Article. The headline is X. The author is Y. The keywords are Z."_

## The Result: The "Glass Box"

Now, when a search engine crawls this site, it doesn't see an empty `<div>`. It sees a **Glass Box**. Everything is transparent.

- **The Title:** Matches your search query.
- **The Description:** Is dynamically pulled from the article content.
- **The Keywords:** Are injected from the very file you are reading (look at the source code of this page; you'll see "Vibecoding SEO strategy" sitting right there in the metadata).

## Why This Matters

This is the ultimate proof of the **Vibecoding Playbook**.

I am an architect, not an SEO specialist. I don't know the intricacies of the `canonical` tag or the syntax for `og:image`. But I understand the _concept_ of visibility.

By adhering to the workflow—**Brainstorming** the goal, **Translating** it into a spec, and **Generating** the code deterministically—I was able to implement "Production-Grade" SEO in a fraction of the time it would take to learn it.

You landed on this article because I treated SEO not as a dark art, but as just another set of invariants to be enforced. I defined the rules, and the AI built the engine to follow them.

**The search result you clicked is the artifact of that process.**
