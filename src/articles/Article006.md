---
title: "Why I Built the Vibecoding Playbook"
date: "2025-12-23"
index: 6
---

Let me be perfectly clear from the start: I’m not a system architect, a software architect, or any of the other prestigious engineering hats you find in the tech world. I am, by trade and training, an architect - the kind who designs physical buildings, coordinates contractors, and spends hours poring over construction drawings. My world is one of scale, materials, human use, and the unforgiving laws of physics. Code, for the most part, has been a foreign language.

But curiosity is a powerful force. I had developed a disciplined, step-by-step process for working with AI - a workflow - and I was obsessed with a single question: could it hold up under the pressure of a real project? A theoretical process is just an idea. To prove its worth, I had to build something tangible. So I set out to create this very website, the Vibecoding Playbook. My mission was twofold: first, to document the workflow for others, and second, more critically, to prove its validity by using it to construct the very platform that describes it.

This is the complete, exhaustive story of that experiment: a deep dive into how a non-coder used a blueprint-driven process to orchestrate a team of AI agents, why a crucial tool called [RepoLiner](https://davidtiberias.github.io/RepoLiner/) was born from a mix of necessity and productive laziness, and the profound lessons I learned in bridging the gap between building physical structures and digital ones.

---

## The Spark: Why I Needed a Building, Not Just a Set of Blueprints

In my profession, a blueprint is not the building. It’s an essential, non-negotiable set of instructions, but it isn’t the thing itself. When I first formalized the Vibecoding Playbook, it lived in a series of Markdown files - the digital equivalent of a rolled-up set of drawings. This felt incomplete, static. Documentation alone couldn’t convey the dynamic, iterative nature of the process.

I realized I needed a living model, a demonstration project that could:

- **Explain the workflow visually and spatially**, like a 3D architectural model you can walk through, not just a flat, two-dimensional plan.
- **Demonstrate the process in action**, serving as irrefutable proof that the site was a product of the very system it was designed to teach.
- **Serve as a reproducible pilot**, a case study to show other domain experts that you don’t need to be a seasoned programmer to build sophisticated digital tools.

The goal crystallized: build a website that was both the instruction manual and the finished structure. It was then that I hit my first major, intensely practical roadblock. Manually feeding context to different AI tools is a nightmare. I was constantly copying and pasting dozens of files, explaining folder structures, and correcting the AI’s fragmented understanding of the project. It felt like running between a plumber, an electrician, and a carpenter on a job site, giving each of them slightly different verbal instructions and hoping the building doesn’t collapse. It was inefficient and dangerously prone to error.

Out of that frustration, **[RepoLiner](https://davidtiberias.github.io/RepoLiner/)** was conceived. I needed a "master blueprint" - a single, canonical document that every AI "contractor" could refer to. With the help of **Google AI Studio** (this was before Antigravity existed), I designed it. I described my problem in plain English and asked the AI to help me build a lightweight script that would recursively scan a project folder, cherry-pick the important files, and flatten everything into one comprehensive Markdown file. [RepoLiner](https://davidtiberias.github.io/RepoLiner/) was my solution, born from the simple need to create a single source of truth. It wasn't designed to be fancy - for heavy-duty production work with token counting and secret detection, a tool like Repomix is a better fit - but for this project, it was the perfect, pragmatic tool.

---

## The First Pour: A Foundation of Three Text Files

My project didn't start with `git init` or a boilerplate template. It started with what we in AEC call a "concept design." For this website, that consisted of just three Markdown files, drafted with the help of ChatGPT:

- `README.md`: The project brief, outlining the core vision.
- `feature.md`: A list of the essential "rooms" and functionalities the site needed.
- `roadmap.md`: A rough construction schedule, outlining the phases of development.

That was the entirety of my starting "repo." Just text. I ran this humble seed through the workflow, and to my astonishment, a functional website emerged. But it wasn't great. It felt like the exposed concrete and rebar of a building's superstructure - structurally sound, but cold, bare, and lacking the finesse of a finished space. It proved the workflow was viable, but the result wasn’t a place anyone would want to spend time in.

---

## The Grand Construction: A Detailed Walkthrough of the Workflow in Action

To transform that barebones structure into this finished Hub, I didn't improvise. I went back to the very beginning of the blueprint and ran the entire workflow again, this time with a more refined vision. Here is a detailed, step-by-step log of that construction process.

### **Step 01: The Conceptual Brainstorm (Gemini Flash)**

My process began in what I can only describe as controlled chaos. Using Gemini Flash felt like the initial, frenzied sketching phase of an architectural project. I threw out a storm of ideas for new features, better layouts, and a more engaging user experience - interactive tours, improved article indexing, accessibility tweaks. The output was noisy and often impractical, but that was the point. This was divergent thinking, designed to generate a wealth of raw material before imposing any constraints.

### **Step 02: Design Development & Specification (Microsoft Copilot)**

This phase was about taming the chaos. Copilot acted as my technical translator, taking the wild sketches from Gemini and turning them into a clear "scope of work." It helped me refine vague concepts like "better articles" into structured prompts like, "Design a card-based layout for the articles page using Flexbox, with tags for categorization and a published date." This step was crucial for translating human, often ambiguous, intent into the kind of precise instructions a machine can execute.

### **Step 03: The Schematic Design (ChatGPT)**

With a clear set of prompts, ChatGPT became my draftsman. It expanded the instructions into updated and more detailed `feature.md` and `roadmap.md` documents. These weren't just simple lists anymore; they contained structured outlines for new components, user flows, and technical requirements. These Markdown files became the official "schematic design" for the next phase of construction.

### **Step 03.5: The Master Blueprint (The First Repo Dump with [RepoLiner](https://davidtiberias.github.io/RepoLiner/))**

This was a pivotal moment. I ran [RepoLiner](https://davidtiberias.github.io/RepoLiner/) on the entire project folder, including the newly updated Markdown plans and the existing, barebones codebase. The script ingested everything and produced a single, comprehensive snapshot: the "master blueprint." For the first time, I had a document that captured both the existing state of the "building" and the detailed plans for its "renovation." The project was no longer a collection of scattered files and ideas; it was a coherent, unified whole.

### **Step 04: The Construction Schedule (Deterministic Task Generation with AI Studio)**

With the master blueprint as its sole input, AI Studio acted as the project manager. I configured it for deterministic output (`top-p=0`), ensuring it would produce a reproducible, logical plan. It read the roadmap and generated a precise, step-by-step task list: "1. Create a new `Card.tsx` component with props for `title`, `description`, and `tags`. 2. Refactor the `ArticlesPage.tsx` to map over an array of article data and render a `Card` for each. 3. Update the Tailwind CSS config to include new theme colors..." and so on. There was no room for improvisation; it was a clear construction schedule.

### **Step 05: The Subcontractors (Agent Execution with Antigravity)**

Antigravity and its agents were my specialized crew of digital contractors. Each agent was given a set of tasks from the schedule. They took the instructions and executed them, writing the new components, refactoring the existing code, and wiring everything together. This was the heavy lifting, where the plans on the blueprint were meticulously translated into a tangible, functional structure.

### **Step 06 & 06.5: Site Inspection and As-Built Updates (Debugging with Search AI and Refreshing with [RepoLiner](https://davidtiberias.github.io/RepoLiner/))**

No construction project is without its problems. When bugs surfaced or builds failed, Search AI became my site inspector. I fed it the raw error logs and the latest repo dump. It would analyze the context and suggest fixes. After applying a correction, the most crucial step was to immediately run [RepoLiner](https://davidtiberias.github.io/RepoLiner/) again. This generated an updated, "as-built" blueprint reflecting the changes. This prevented any AI agent from working with outdated plans, a common source of catastrophic errors in complex projects.

### **Step 07: The Post-Mortem (The Solution Feedback Loop)**

After each major feature implementation and debugging cycle, the verified fixes and successful patterns were fed back into the process. The prompts for Copilot were refined, and the instructions for ChatGPT became more precise. This feedback loop ensured that the entire system grew "smarter" and more efficient with each iteration, learning from its mistakes.

---

## The Unseen Foundation: The Invariants That Prevented Collapse

In architecture, we rely on immutable principles - building codes, structural mechanics, material tolerances - to keep buildings standing. They aren't suggestions; they are the guardrails against disaster. The Vibecoding Playbook is built on a similar set of non-negotiable invariants.

- **The Master Blueprint Invariant:** All planning and debugging must start from the latest repo dump. This is the single source of truth. Working from old plans is malpractice.
- **The Clean Site Invariant:** Before starting a new task, all previous conversations (context windows) must be cleared. This prevents "context drift" and hallucinations, the digital equivalent of a contractor misremembering a verbal instruction from last week.
- **The Specification Invariant:** Vague plans lead to flawed structures. The translation step must resolve all ambiguity before any code is generated. "Make it look better" is not an acceptable instruction.
- **The Determinism Invariant:** The construction schedule must be reproducible. Task generation is a logical, not a creative, process. The creativity belongs in the initial brainstorm, not on the assembly line.
- **The Division of Labor Invariant:** The crew that lays the bricks does not design the building. The roles of planning (AI Studio), drafting (ChatGPT), and execution (Antigravity) must remain separate to maintain accountability.

For a non-coder navigating this alien landscape, these rules were my lifeline. They turned a potentially chaotic and overwhelming process into a manageable, predictable system.

---

## The Toolkit: A Frank Assessment of My Digital Contractors

Throughout this journey, I learned to see the AI tools not as monolithic oracles, but as a team of highly specialized, often quirky, digital interns.

- **Gemini Flash:** The wildly creative artist. Invaluable for early brainstorming, but utterly unreliable for producing precise specifications.
- **Microsoft Copilot:** The sharp, logical translator. Exceptional at turning fuzzy human language into structured, code-like prompts, but it demands a clear starting point.
- **ChatGPT:** The diligent drafter and documentarian. Superb at creating comprehensive roadmaps and outlines, but with a tendency to over-specify, requiring its output to be treated as a draft.
- **Google AI Studio:** The rigid but reliable project manager. Its adherence to deterministic instruction makes it the perfect tool for creating reproducible build plans.
- **Antigravity:** The powerful but silent construction crew. It executes tasks with formidable efficiency, but its black-box nature makes it difficult to debug without clean logs and a dedicated inspection tool.
- **[RepoLiner](https://davidtiberias.github.io/RepoLiner/):** My fast, simple, and indispensable blueprint generator. While it lacks the advanced features of production-grade tools, its simplicity is its greatest strength.

The true power of the workflow lies not in any single tool, but in the art of orchestrating this diverse team, sequencing their contributions so that the strengths of one compensate for the weaknesses of another.

---

## The Blueprint for Others: Practical Tips for AEC Professionals

If you are an architect, engineer, or any domain expert outside of software, and this story resonates with you, here are the most practical lessons I can offer:

1.  **Start with What You Know: Documentation.** Don't try to code. Begin with a project brief (`README.md`) and a schedule (`roadmap.md`). This is our native language. A solid plan is the best foundation.
2.  **Automate Your Blueprints.** Make the process of creating a repo dump a single command. This will become the most important tool in your arsenal, your single source of truth in a complex project.
3.  **Embrace the Role of the Director.** Your job is not to write the code. Your job is to orchestrate the AI, to clarify intent, and to rigorously verify the work - exactly as you would manage a team of contractors on a job site.
4.  **Trust the Process.** The workflow is your construction schedule and your safety checklist in one. Follow the steps and honor the invariants, especially when the project becomes complex.

---

## Conclusion: A Bridge Between the Physical and Digital Worlds

This project was a journey into a field that was not my own, yet it felt surprisingly familiar. The principles of good architecture, I discovered, are universal. Whether you are building with steel and concrete or with code and components, success hinges on a clear vision, a solid blueprint, and a disciplined, iterative process to bring that vision to life.

The Vibecoding Playbook is more than a website. It is a testament to the idea that structure is not the enemy of creativity, but its greatest enabler. It stands as proof that a domain expert, armed with the right process, can orchestrate the immense power of modern AI to construct something real, stable, and useful in a digital world. The tools are powerful, but the blueprint is what matters.
