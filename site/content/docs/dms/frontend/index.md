# Frontend

The (read) frontend component covers all of the traditional "read" frontend functionality of a data portal: front page, searching datasets, viewing datasets etc.

>[!tip]Announcing Portal.js📣 
>Portal.js 🌀 is a javascript framework for building rich data portal frontends fast using a modern frontend approach (JavaScript, React, SSR).
>
>https://github.com/datopian/portal.js


## Features

* **Home Page** When visiting the data portal's home page, I want to see an overview of the portal (e.g. datasets) so that I understand if it's relevant for me.
* **Search/Browse the Catalog** When looking for dataset, I want to search for specific strings (keywords, topics etc.) so that I can find it quickly, if available.  
* **Dataset Showcase** When exploring a dataset I want to see a description and key information (title etc) and (if possible) data preview and download options so that I understand what it contains and decide if I want to use it or download it.
* **Organization and User Profiles**: I want to see the data published by a particular team, organization or user so that I can find the data I want or understand what a particular group are doing
* **Groups/Topics/Collections**: I want to browse datasets by topic so that I can find the data I want or find unexpected results
* **Custom additional pages**
* **Permissions**: I want to restrict access to some of the above based on a user's role and memberships so that I can share data with only the appropriate people

Developer Experience

* **Theme** (simple): When developing a new portal, I want to theme it quickly and easily so that it's look and feel aligned to the client's needs.
  * **Customize Home Page**: When building a data portal home page I want to be able to customize it completely, integrating different widgets so that I have a great landing experience for users
  * **i18n**: I want to be able to i18n content and enable the client to do this so that we have a site in the client's locale
* **Rich customization** (new routes, major page changes)
  * When working on a data portal, I want to add frontend functionality to existing templates so that I can build upon past work and still extend the project to my own needs.
  * When building up a new frontend I want to quickly add standard pages and components (and tweak them) so that I have a basic functional site quickly
* **Use common languages and tooling**: When working on a data portal, I want to build it using Javascript so that I can rely on the latest frontend technologies (frameworks/libraries).
* **Deploy quickly**: When delivering a data portal, I want to quickly and easily deploy changes to my frontend so that I can reduce the feedback loop.

## CKAN v2

The Frontend is implemented in the core app spread across various controllers, templates etc. For extending/theming a template, you have to write an extension (`ckanext-mysite`), and either override or inherit from the default files.

* Home page. The CKAN default template shows: Site title, Search element, The latest organizations, The latest groups. In order to change this, we need to create a CKAN extension and modify templates etc.
* Search/Browse the Catalog Already available in CKAN Classic (v2) with ability to search by facets etc., see an example here - https://demo.ckan.org/dataset
* Dataset Showcase. It is already available by default, for example:
  * Dataset page - https://demo.ckan.org/dataset/dataset_389383 - a summary of resources and package level metadata such as package title, description, license etc.
    * Package controller - https://github.com/ckan/ckan/blob/master/ckan/controllers/package.py
    * Package view module - https://github.com/ckan/ckan/blob/master/ckan/views/dataset.py
  * Resource page - https://demo.ckan.org/dataset/dataset_389383/resource/331f57d1-74fc-46ad-9885-50eb26dde13a - showcase of individual resource including views etc.
    * Resource view module - https://github.com/ckan/ckan/blob/master/ckan/views/resource.py
    * Package and resource templates - https://github.com/ckan/ckan/tree/master/ckan/templates/package

### Developer Experience (DX)

Docs - https://docs.ckan.org/en/2.8/theming/index.html

* You need to do it in a new CKAN extension and follow recommended standards. There are no easy ways of reusing code from other projects, since most often they are not written in the required languages/frameworks/libraries.
* Nowdays, the best to do it is to create an extension for each of the components.
* There's no easy documented path for achieving this.
* The easier way is to deploy a complete CKAN v2 stack using Docker Compose.

- Theming - https://docs.ckan.org/en/2.8/theming/index.html
- Create new helper functions https://docs.ckan.org/en/2.8/theming/templates.html#template-helper-functions

### Theming

Theming is done via CKAN Classic extensions. See https://docs.ckan.org/en/2.8/theming/index.html

### Extending (Plugins)

In CKAN Classic you extend the frontend e.g. adding new pages or altering existing ones by a) overriding templates b) creating an extension using specific plugin points (e.g. IController): https://docs.ckan.org/en/2.8/extensions/index.html

### Limitations

There are two main issues:

* There is no standard, satisfactory way to create data portals that integrates data and content. Current methods for integrating CMS content into CKAN are clunky and limited.
* Theming and frontend work is slow, painful and difficult for standard frontend ddvs because a) it requires installing and interacting with the full (complex) CKAN b) you use very specific frontend stack (python etc rather than javascript) c) template spaghetti (the curse of a million "slots") (did inheritance rather tha composition)
* There is too much coupling of frontend and backend e.g. logic layer doing dictize. Poor separation of concerns.

In more detail:

* Theming - styling, templating:
  * It uses Bootstrap 3 (out-dated). An upgrade takes significant amount of effort because all the existing themes rely, or may rely, on it.
  * No documented way of switching Bootstrap off and replace it for another framework.
  * Although the documentation only mentions pure CSS, CKAN also uses LESS. It's not clear how a theme could be written in LESS, if recommended or possible.
  * For changing or adding a better overview, one needs to create a CKAN extension, with its own challenges.
  * It needs to happen in Python/Jinja, overriding the exting actions and templates.
  * The main challenge is general theming in CKAN Classic, e.g., you have to follow the CKAN Classic way using inheritance model of templates.
* Javascript:
  * No viable way of extending it in other languages such as Javascript.
  * It's not simple to achieve the common task of adding Javascript to the frontend.
    * You must understand CKAN and a large portion of its architecture.
    * You must run CKAN in its entirety.
    * The document is far from short – https://github.com/ckan/ckan/blob/2.8/doc/theming/javascript.rst
    * Not (easily, at least) possible to develop a Single Page Application while still relying on CKAN for all the backend.

* Other:
  * It's not easy to make configuration changes to how the existing feature works.
  * The dataset URL follows a nested RESTFul format, with non-human readable IDs.
  * Not good for SEO.
  * It may be a reasonable default, but hardly works in practice as stakeholders have their own preferences.

## CKAN v3

>[!tip]Announcing Portal.js📣 
>Portal.js 🌀 is a javascript framework for building rich data portal frontends fast using a modern frontend approach (JavaScript, React, SSR).
>
>https://github.com/datopian/portal.js

Previous (stable) version is `frontend-v2`: https://github.com/datopian/frontend-v2. It is written in NodeJS using ExpressJS. For templating it uses [Nunjucks][].

[Nunjucks]: https://mozilla.github.io/nunjucks/templating.html

>[!note]It is easy to write your own Next Gen frontend in any language or framework you like -- much like the frontend of a headless CMS site. And obviously you can still reuse the patterns (and even code if you are using JS) from the default approach presented here.


## RFC

Background and motivation in the RFC https://github.com/ckan/ideas/blob/master/rfcs/0005-decoupled-frontend.md
