---
title: 'Tutorial 2: Edit your PortalJS website locally on your computer'
date: 2023-06-22
authors: ['Ola Rubaj']
filetype: 'blog'
isDraft: true
---

In this tutorial we will walk you through ...

By the end of this tutorial you will:

- ...
- ...

Below is a screenshot of how the final website will look like:

![[live-home-page.png]]

## Prerequisites

- A [GitHub](https://github.com/) account.
- A [Vercel](https://vercel.com/) account. You can set it up using your GitHub account.
- [Obsidian](https://obsidian.md/) installed
- [GitHub Desktop](https://desktop.github.com/) installed
- [[create-a-website-from-scratch|Tutorial 1: Create a website from scratch using Markdown and PortalJS]] - this one is recommended so that you have the same sandbox website we're working on

## Clone the GitHub repository on your computer

Open GitHub Desktop app

Click on "Clone a Repository from the Internet...".
Or click on "File" -> "Clone repository".

![[gh-desktop-starting-screen.png]]

If this is the first time you're using GitHub Desktop, it will prompt you to log in to your GitHub account. Click "Sign In" and follow the prompts.

![[gh-desktop-clone-signin.png]]

Once you're done and you've authorised GitHub Desktop to access your repositories, go back to GitHub Desktop. You should now see a list of all your GitHub repositories. Select the one we created in the last tutorial.

![[gh-desktop-clone.png]]

Then, click on "Choose..." under "Local Path" to select where the repository should be copied to on your computer.

![[gh-desktop-clone-path-select.png]]

Then, click "Clone" and wait for the process to complete. You should now see the following screen:

![[gh-desktop-no-local-changes.png]]

Done! You've successfully cloned your website's repository on your computer! 🎉



---

## Open the content folder in Obsidian

Click on "Open" in "Open folder as vault" section.

![[obsidian-starting.png]]
Done! You're now ready to edit and add multiple Markdown-based pages in your website! 🎉

![[obsidian-content-start.png]]

---

## Edit your site in Obsidian

Let's add some more info about you and your website to the home page.
Click on `index.md` to open it and replace the dummy text with "About Me" section, .e.g.:

```md
## About Me

Hey there! I'm Your Name, a passionate learner and explorer of ideas.
```

![[obsidian-content-index-edit.png]]

Now, let's say for more information about me and my site, I want to link to the about page. We can do so, by creating a wiki-link to it, like so:

```md
[[about]]
```

When you start typing, after adding `[[]]`, Obsidian will suggest all the available pages you can link to, and will create the link automatically for you.

![[obsidian-content-index-add-link.png]]
![[obsidian-content-index-add-link-2.png]]

Now, let's say we want to show people what books you've read and share your reviews and other information of each one. And let's say information on each book should be available at `/books/abc` path on our website. To achieve this, we need to create a folder called `books` in our vault and add all the project-related files in there.

To create new folder in Obsidian, click on the "New folder" icon, and give your folder a name:

![[obsidian-content-add-folder.png]]

![[obsidian-content-add-folder-2.png]]

Now, let's write some book reviews. You can do this by right-clicking on the `/books` folder, and selecting "New note" option. Rename it and add some information to it. Then add some more books.

![[obsidian-content-book.png]]

Ok, now let's make a page that will list all your books reviews so that people can find them! It would be nice to have it available under `/books` path on the website, since each of our books will be available under `/books/abc`. To achieve this, we have to create an index page **inside** our `/books` folder, like so:

![[obsidian-content-book-index.png]]

Then, let's list our book reviews here:

![[obsidian-content-book-index-2.png]]

![[obsidian-content-book-index-3.png]]

Now, let's link to this books index page on our home page, so that it's easy to find.

![[obsidian-content-index-bookshelf-link.png]]

Now, if you want to have your link say something different than the raw `books/index`, you can do this by typing `|` after the path and specifying an alternative name, .e.g:

```md
[[books/index|Bookshelf]]
```

Let's also do this for the about page:

```md
[[about|About me]]
```

![[obsidian-content-index-link-aliases.png]]

Let's maybe add a short info at the bottom, that this site is new and is currently being worked on, in form of an Obsidian callout:

```md
>[!info]
>🚧 This site it pretty new and I'm enhancing it every day. Stay tuned!
```

![[obsidian-content-index-callout.png]]

Great, our updated site is ready to be published!

---

## Save and publish your changes

Navigate to GitHub Desktop app. In the "Changes" tab, you'll see all the changes that have been made to the repository.

![[github-desktop-all-changed-files.png]]

All the new files will have `[+]` sign next to them, and all the edited files will have `[•]`.

Now, to save these changes we need to "commit" them, which is a fancy term for make a checkpoint of the state at which your repository is currently in.

Ok, so let's make this checkpoint. In the bottom left corner there is a "Summary (required)" field, which is the place for a commit message - a concise description of the changes. The "Description" field is optional, and it's only needed if you need to add some more information about your changes that doesn't fit in the commit message.

![[github-desktop-add-commit-message.png]]

Now, hit the "Commit to main" button. Done! Now GitHub Desktop should say there are no local changes again. And that's correct, as all the changes we made have successfully been saved, and no other changes have been made since then.

However, you should see the last commit message under the button:

![[github-desktop-commit-message.png]]

You can also inspect the whole history of past commits in the "History tab".

![[github-desktop-history.png]]

The very fist commit on top is the commit we've just made, but you can also see all the commits to the repository we made in [[create-a-website-from-scratch|tutorial 1]], via GitHub UI.

The commit we've just crated has ↑ sign next to it. It means it hasn't yet been pushed to our remote version of the repository - the changes you made has been saved, but only locally on your computer. In order to push them to the cloud copy of the repository (aka "remote"), click "↑ Push origin (1 ↑)" tab.

When the "push" is complete, the arrow next to the last commit message should disappear, and there should be no `(1 )` indicator next to "Push origin" button.

![[github-desktop-history-after-push.png]]

---

## See updated site live!

Navigate to your [vercel dashboard](https://vercel.com/dashboard).

![[vercel-dashboard.png]]

Click on the project repository to go to the project dashboard.

You may have to wait a bit until the site builds, but once it's ready, you should see the preview with our latest changes.

![[vercel-project-dashboard.png]]

Note that, under "SOURCE" section (next to the preview) there is also our last commit message, indicating that the latest deployment has been triggered by this commit.

Click on the preview to see the updated site live!

![[live-home-page.png]]
![[live-book-home-page.png]]
![[live-book.png]]