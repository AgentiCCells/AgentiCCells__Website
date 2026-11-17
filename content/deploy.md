---
title: Put your site online
description: A website cell is a static site in a GitHub repository, so it runs on any static host. Where to put it, with a link to each host's own instructions. No host is endorsed.
nav: 1.6
---
# Put your site online: it runs anywhere

A website cell hands you a static site in a GitHub repository that you own. Static means plain files: pages, images and styles. Any host that serves static files can serve it. You are not tied to us, and you do not need us to keep it running (the [website cell page](/website-cell/) says what we hand over).

This page points you to each host's own instructions, which we checked on 2026-11-17. Hosts change their menus, so if a step does not match what you see, trust the host's page over ours. We do not endorse any host, we earn nothing from any link here, and none of the links is an affiliate link. Prices and free allowances are the host's to state: read them on the host's own site before you choose.

## Before you start

You need three things:

1. **A GitHub account and a repository.** If you have none, [follow the steps below](#if-you-have-no-github-account-yet).
2. **The site's files in that repository.** If we built it, this is already done at hand-over.
3. **To know which folder holds the finished pages.** It is the folder with the `index.html` file in it. Some hosts ask for it by name. If the files are at the top of the repository, that is the root folder. If you are not sure, ask your own Claude to look: "Which folder in this repository holds index.html?"

## Pick a host

Every host below connects to a GitHub repository and publishes the folder you choose. Each row links to that host's own instructions.

### GitHub Pages

Publishes straight from the repository you already have. In the repository, open **Settings**, then **Pages**. Under "Build and deployment", set **Source** to **Deploy from a branch**, choose the branch and the folder (**/ (root)** or **/docs**), then click **Save**. If your repository already has a publishing workflow, choose **GitHub Actions** as the source instead. Host's instructions: [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

### Netlify

Sign up, choose **Add new project**, then **Import an existing project**, pick GitHub, authorise Netlify for the repository, and check the publish settings. A static site needs no build step, so read the host's page on build settings before you press **Publish**. Host's instructions: [Deploy from a Git repository](https://docs.netlify.com/start/quickstarts/deploy-from-repository/) and [Configure builds](https://docs.netlify.com/build/configure-builds/overview/).

### Cloudflare Pages

In the Cloudflare dashboard go to **Workers & Pages**, select **Create application**, the **Pages** tab, then **Import an existing Git repository**. Choose the repository and select **Begin setup**. Set the production branch, set the build command to the do-nothing command the host's guide gives for a site with no build step, and set the build output directory to the folder that holds `index.html`. The host's guide says that a "page not found" error on your new address usually means there is no `index.html` at the top of that folder. Host's instructions: [Deploy a static HTML site](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/).

### Vercel

Select **New Project** on your dashboard and pick the repository. On the configure page you can name the project, choose a **Framework Preset**, set the root directory and the build output settings, then select **Deploy**. For plain files, read the host's page on build settings to see which preset and output folder to choose. Host's instructions: [Deploying Git repositories with Vercel](https://vercel.com/docs/git) and [Configure a build](https://vercel.com/docs/builds/configure-a-build).

### GitLab Pages

GitLab publishes from a folder named `public` by default, and the repository must be on GitLab, so you would copy or mirror it there first. Add a job to `.gitlab-ci.yml` that puts your site into `public` and set `pages: true` on the job, then commit and push. The site appears on a `gitlab.io` address with HTTPS. Host's instructions: [GitLab Pages](https://docs.gitlab.com/user/project/pages/).

### Any plain web host

If you already pay for web hosting, copy the site's files to the host's web folder with the upload tool or SFTP that the host gives you, so that `index.html` sits at the top of the folder the host serves. Use your host's own help pages for the exact steps. Because the site is only files, nothing else needs installing on the server.

## Your own domain

Every host above lets you attach a domain you own, and each documents how in its own pages. Look for "custom domain" in the host's help. Buying a domain is a separate purchase from your host or a registrar, and is not part of the website cell.

## If you have no GitHub account yet

1. **Create the account.** Go to [github.com/signup](https://github.com/signup), or sign up with Google. Follow the prompts and verify your email address. Turn on two-factor authentication when asked; it protects the site. Host's instructions: [Creating an account on GitHub](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github).
2. **Create a repository.** Click the **+** icon at the top right of any GitHub page, then **New repository**. Choose yourself as owner, type a name (letters, digits, `.`, `-` and `_`), choose public or private, then click **Create repository**. Some hosts publish from private repositories only on a paid plan; check your chosen host. Host's instructions: [Creating a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository).
3. **Add the files.** On the repository's page choose **Add file**, then **Upload files**, drag the site's files in, write a short message and commit. GitHub's page lists limits on file size and number of files for browser uploads. Host's instructions: [Adding a file to a repository](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).

Prefer not to do this alone? Ask your own Claude to walk you through it, or ask a partner or a local web person. We give no support after hand-over (see [partner terms](/partners/)), and we are happy for someone else to charge for it.

## Something not working?

Check, in this order: the branch you chose exists; the folder you chose contains `index.html`; you have not asked the host to run a build the site does not need; the host's deploy log. Then read the host's own troubleshooting page.

This page is itself part of the offer: [the website cell](/website-cell/) is a static site you own, and [how this site was built](/how-this-site-was-built/) shows the method. Questions: [agent@riskmandate.ai](mailto:agent@riskmandate.ai).
