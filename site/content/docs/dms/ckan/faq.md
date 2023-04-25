---
sidebar: auto
---

# FAQ

This page provides answers to some frequently asked questions.

## How to create an extension template in my local machine

You can use the `paster` command in the same way as a source install. To create an extension execute the following command:

```
docker-compose -f docker-compose.dev.yml exec ckan-dev /bin/bash -c "paster --plugin=ckan create -t ckanext ckanext-myext -o /srv/app/src_extensions"
```

This will create an extension template inside the container's folder `/srv/app/src_extensions` which is mapped to your local `src/` folder.

Now you can navigate to your local folder `src/` and see the extension created by the previous command and open the project in your favorite IDE.


## How to separate that extension in a new git repository so I can have the independence to install it in other instances

Crucial thing is to understand that extensions get their repositories on GitHub (or elsewhere). You can first create a repository for extension and later clone in `src/` or do opposite as following:

* Create the Extension, for example: `ckanext-myext`.
```
docker-compose -f docker-compose.dev.yml exec ckan-dev /bin/bash -c "paster --plugin=ckan create -t ckanext ckanext-myext -o /srv/app/src_extensions"
```

* Init your new git repository into the extension folder `src/ckanext-myext`
```
cd src/ckanext-myext
git init
```
* Configure remote/origin
```
git remote add origin <remote_repository_url>
```
* Add your files and push the first commit
```
git add .
git commit -m 'Initial Commit'
git push
```

**Note:** The `src/` folder is gitignored in `okfn/docker-ckan` repository, so initializing new git repositories inside is ok.

## How to quickly refresh the changes in my extension into the dockerized environment so I can have quick feedback of my changes

This docker-compose setup for dev environment is already configured so that it sets `debug=True` inside configuration file and auto reloads on python and templates related changes. You do not have to reload when making changes to HTML, javascript or configuration files - you just need to refresh the page in the browser.

See the CKAN images section of the [repository documentation](https://github.com/okfn/docker-ckan#ckan-images) for more detail

## How to run tests for my extension in the dockerized environment so I can have a quick test-development cycle

We write and store unit tests inside the `ckanext/myext/tests` directory. To run unit tests you need to be running the `ckan-dev` service of this docker-compose setup.

* Once running, in another terminal window run the test command:
```
docker-compose -f docker-compose.dev.yml exec ckan-dev nosetests --ckan-dev --nologcapture --reset-db -s -v --with-pylons=/srv/app/src_extensions/ckanext-myext/test.ini /srv/app/src_extensions/ckanext-myext/
```

You can also pass nosetest arguments to debug
```
--ipdb --ipdb-failure
```

**Note:** Right now all tests will be run, it is not possible to choose a specific file or test.

## How to debug my methods in the dockerized environment so I can have a better understanding of whats going on with my logic

To run a container and be able to add a breakpoint with `pdb`, run the `ckan-dev` container with the `--service-ports` option:

```
docker-compose -f docker-compose.dev.yml run --service-ports ckan-dev
```

This will start a new container, displaying the standard output in your terminal. If you add a breakpoint in a source file in the `src` folder (`import pdb; pdb.set_trace()`) you will be able to inspect it in this terminal next time the code is executed.

## How to debug core CKAN code

Currently, this docker-compose setup doesn't allow us to debug core CKAN code since it lives inside the container. However, we can do some hacks so the container uses a local clone of the CKAN core hosted in our machine. To do it:

- Create a new folder called `ckan_src` in this `docker-ckan` folder at the same level of the `src/`
- Clone ckan and checkout the version you want to debug/edit

```
git https://github.com/ckan/ckan/ ckan_src
cd ckan_src
git checkout ckan-2.8.3
```

- Edit `docker-compose.dev.yml` and add an entry to ckan-dev's and ckan-worker-dev's volumes. This will allow the docker container to access the CKAN code hosted in our machine.

```
   - ./ckan_src:/srv/app/ckan_src
```

- Create a script in `ckan/docker-entrypoint.d/z_install_ckan.sh` to install CKAN inside the container from the cloned repository (instead of the one installed in the Dockerfile)

```
#!/bin/bash
echo "*********************************************"
echo "overriding with ckan installation with ckan_src"
pip install -e /srv/app/ckan_src
echo "*********************************************"
```

That's it. This will install CKAN inside the container in development mode, from the shared folder. Now you can open the `ckan_src/` folder from your favorite IDE and start working on CKAN.
