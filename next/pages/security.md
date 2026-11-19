---
title: Security
description: Static files, no server code of yours, no database, no cookies by default, no login page on the site. And plainly, what that does not protect against.
---
# Almost nothing to attack

This page is about the Sovereign Agentic Website, one of our two [case studies](/next/case-studies/). A cell is a small team of AI agents, each with a role, a brief and written rules, working in your own accounts ([what a cell is](/next/cells/)).

A website you own, control and can take anywhere is also a website with very little on it to attack. This page says why, and says just as plainly what it does not protect against.

{{figure:attack-surface}}

## What the site is made of

- **Static files.** The site is built once and served as files. The host runs its own servers; no server code of yours runs there.
- **No database.** There is no database of yours to break into. The repository itself can be public, and then its files and their history are public too.
- **No plugins.** Nothing of yours to patch within hours of a flaw being published.
- **No cookies by default.** The site stores nothing in your visitors' browsers unless you add something that does. The host keeps its own logs of visits, including visitors' IP addresses ([GitHub's page](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection), read 19 November 2026).
- **Nothing to log in to on the site.** There is no admin page to guess a password for. Changes are made in the repository, by you or your Claude.

Dinis Cruz's argument, in [static against the platforms](https://newsroom.sgit.ai/articles/static-against-the-platforms.html): a static design removes the kind of flaw that makes up almost all the vulnerabilities counted in the WordPress ecosystem, which is code running on a server. He also says that no independent study measures how much safer static sites are, so we claim no number.

## The guard rails on every change

A static site is not automatically safe. Your own Claude could publish something private, embed a script from somewhere unsafe, or break a page. So the sites we build come with:

- **A behaviour policy** that says what any agent working on the site may do.
- **Checks before anything goes live:** a build, a validation and a leak scan that looks for secrets.
- **A history.** Every change is a commit, and any version can be restored.

These help keep changes safe; they do not make mistakes impossible.

## What this does not protect against

Say it plainly, because it is where the risk moves:

- **Your GitHub account.** Whoever controls the account controls the repository, and so the site. Use a strong password and two-factor sign-in.
- **The email account behind your GitHub and your registrar.** Whoever can read it can reset those passwords. Protect it the same way.
- **Your domain registrar.** Whoever controls the domain controls where your address points. Keep the registrar account behind two-factor sign-in too.
- **Anyone you give access to the repository**, such as a partner. They can change the site; give access only to people you trust, and remove it when the work ends.
- **A Claude session misled by what it reads.** A web page, an email or a file can carry instructions meant to trick it. Read what Claude says it changed: changes are reviewed by the checks and can be undone.
- **GitHub itself.** An outage takes the site down while it lasts, and GitHub can suspend an account under its own terms. Because you hold the files, you can move to another host.
- **Our organisation, before hand-over.** Until the repository moves to your account, it is in ours, and our accounts are part of the risk. Ask for the move early if that matters to you.
- **Anything you add.** A form service, analytics or an embedded script brings its own risks and, often, its own cookies.
- **Content you publish.** If it should not be public, do not put it in a public repository: its history keeps it.

If you want a person to watch over the site, a [partner](/next/partners/) can sell you that, at their own price.

## How we work while we build it

Until hand-over, the site is in our GitHub organisation so we can finish the work. Our agents work under written rules: they never send email, post, move money or sign up for anything, and a person approves what matters. Those rules are mostly rules the agents follow, not walls a machine enforces, and our [trust page](https://agenticcells.ai/trust/) says so, with what we cannot yet show. Nobody outside the team has reviewed our security.

[Questions and answers](/next/faq/)
