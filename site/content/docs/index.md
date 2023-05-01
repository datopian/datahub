# Getting Started

Welcome to the PortalJS documentation!

If you have questions about anything related to PortalJS, you're always welcome to ask our community on [GitHub Discussions](https://github.com/datopian/portaljs/discussions) or on [our chat channel on Discord](https://discord.gg/EeyfGrGu4U).

## Setup

### Prerequisites

- Node.js 14.18.0 or newer
- MacOS, Windows (including WSL), and Linux are supported

### Create a PortalJS app

To create a PortalJS app, open your terminal, cd into the directory you’d like to create the app in, and run the following command:

```bash
npx create-next-app my-data-portal --example https://github.com/datopian/portaljs/tree/main/examples/learn-example
```

> [!tip]
> You may have noticed we used the command create-next-app. That’s because PortalJS is built on the awesome NextJS react javascript framework. That’s mean you can do everything you do with NextJS with PortalJS. Check out their docs to learn more.

### Run the development server

You now have a new directory called `my-data-portal`. Let’s cd into it and then run the following command:

```bash
npm run dev
```

This starts the NextJS (and hence PortalJS) "development server" on port 3000.

Let's check it's working and what we have! Open http://localhost:3000 from your browser.

You should see a page like this when you access http://localhost:3000. This is the starter template page which shows the most simple data portal you could have: a simple README plus csv file.

<img src="/assets/examples/basic-example.png" />

### Editing the Page

Let’s try editing the starter page.

- Make sure the development server is still running.
- Open content/index.md with your text editor.
- Find the text that says “My Dataset” and change it to “My Awesome Dataset”.
- Save the file.

As soon as you save the file, the browser automatically updates the page with the new text:

<img src="/assets/docs/editing-the-page-1.png" />

## Displaying data

So far, the PortalJS app we created only has a single page displaying a dataset. Data catalogs and data portals generally showcase many different datasets.

Let's explore how to add and display more datasets to our portal.

### Pages in PortalJS

As you have seen, in this example a dataset page is just a markdown file on disk plus a data file.

To create a new data showcase page we just create a new markdown file in the `content/` folder and a new data file in the `public/` folder. 

Let's do that now. Create a `content/my-incredible-dataset` folder, and inside this new folder create a `index.md` file with the following content:

```markdown
# My Incredible Dataset

This is my incredible dataset.

## Chart 

<LineChart 
    title="US Population By Decade"  
    xAxis="Year"
    yAxis="Population (mi)" 
    data="my-incredible-data.csv"
/>
```

Now, create a file in `public/` named `my-incredible-data.csv` and put the following content inside it:

```bash
Year,Population (mi)
1980,227
1990,249
2000,281
2010,309
2020,331
```

Note that pages are associated with a route based on their pathname, so, to see the new data page, access http://localhost:3000/my-incredible-dataset from the browser. You should see the following:

<img src="/assets/docs/my-incredible-dataset.png" />

> [!tip]
> In this tutorial we opted for storing content as markdown files and data as CSV files in the app, but PortalJS can have metadata, data and content stored anywhere.

### Create an index page

Now, let's create an index page. First, create a new folder `content/my-awesome-dataset/` and move `content/index.md` to it. Then, create a new file `content/index.md` and put the following content inside it:

```markdown
# Welcome to my data portal!

List of available datasets:

- [My Awesome Dataset](/my-awesome-dataset)
- [My Incredible Dataset](/my-incredible-dataset)

```

From the browser, access http://localhost:3000. You should see the following:

<img src="/assets/docs/datasets-index-page.png" />

