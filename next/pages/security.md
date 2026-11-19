---
title: Security
description: Static files, no server code, no database, no cookies by default, nothing to log in to on the site. And plainly, what that does not protect against.
---
# Almost nothing to attack

A website you own, control and can take anywhere is also a website with very little to attack. This page says why, and says just as plainly what it does not protect against.

{{figure:rent-or-own}}

## What the site is made of

- **Static files.** The site is built once and served as files. There is no server code running.
- **No database.** Nothing to inject into, nothing to leak from.
- **No plugins.** Nothing to patch within hours of a flaw being published.
- **No cookies by default.** Nothing is stored in your visitors' browsers unless you add it, so there is nothing to put behind a banner.
- **Nothing to log in to on the site.** There is no admin page to guess a password for. Changes are made in the repository, by you or your Claude.

Dinis Cruz's argument, in [static against the platforms](https://newsroom.sgit.ai/articles/static-against-the-platforms.html): a static design removes the kind of flaw that makes up almost all the vulnerabilities counted in the WordPress ecosystem, which is code running on a server. He also says that no independent study measures how much safer static sites are, so we claim no number.

## The guard rails on every change

A static site is not automatically safe. Your own Claude could publish something private, embed a script from somewhere unsafe, or break a page. So every site ships with:

- **A behaviour policy** that says what any agent working on the site may do.
- **Checks before anything goes live:** a build, a validation and a leak scan that looks for secrets.
- **A history.** Every change is a commit, and any version can be restored.

## What this does not protect against

Say it plainly, because it is where the risk moves:

- **Your GitHub account.** Whoever controls the account controls the repository, and so the site. Use a strong password and two-factor sign-in, and be careful who you give access to.
- **Your domain registrar.** Whoever controls the domain controls where your address points. Keep the registrar account behind two-factor sign-in too.
- **Your own Claude, and what you ask it.** The checks stop most mistakes, not every one. Read what Claude says it changed.
- **Anything you add.** A form service, analytics or an embedded script brings its own risks and, often, its own cookies.
- **Content you publish.** If it should not be public, do not put it in the repository: a public repository's history keeps it.

If you want a person to watch over the site, a [partner](/next/partners/) can sell you that, at their own price.

## How we work while we build it

Until hand-over, the site is in our account so we can finish the work. Our agents work under written rules: they never send email, post, move money or sign up for anything, and a person approves what matters. Those rules are mostly rules the agents follow, not walls a machine enforces, and our [trust page](https://agenticcells.ai/trust/) says so, with what we cannot yet show. Nobody outside the team has reviewed our security.

[Questions and answers](/next/faq/)
