---
sidebar: auto
---

# Introduction
A CKAN extension is a Python package that modifies or extends CKAN. Each extension contains one or more plugins that must be added to your CKAN config file to activate the extension’s features.

## Creating and Installing extensions
1. Boot up your docker compose
```
docker-compose -f docker-compose.dev.yml up
```


2. To create an extension template using this docker composition execute:

```
docker-compose -f docker-compose.dev.yml exec ckan-dev /bin/bash -c "paster --plugin=ckan create -t ckanext ckanext-example_extension -o /srv/app/src_extensions"
```

This command will create an extension template in your local `./src` folder that is mounted inside the containers in the `/srv/app/src_extension` directory. Any extension cloned on the `src` folder will be installed in the CKAN container when booting up Docker Compose (`docker-compose up`). This includes installing any requirements listed in a `requirements.txt` (or `pip-requirements.txt`) file and running `python setup.py develop`.


3. Add the plugin to the `CKAN__PLUGINS` setting in your `.env` file.

```
CKAN__PLUGINS=stats text_view recline_view example_extension
```


4. Restart your docker-compose:

```
# Shut down your instance with crtl+c and then run it again with:
docker-compose -f docker-compose.dev.yml up
```
> [!tip]CKAN will be started running on the paster development server with the '--reload' option to watch changes in the extension files.

You should see the following output in the console:

```
...
ckan-dev_1    | Installed /srv/app/src_extensions/ckanext-example_extension
...
```

## Edit the extension

Let's edit a template to change the way CKAN is displayed to the user!

1. First you will need write permissions to the extension folder since it was created by the user running docker. Replace `your_username` and execute the following command:

> [!tip]You can find out your current username by typing 'echo $USER' in the terminal.

```
sudo chown -R <your_username>:<your_username> src/ckanext-example_extension
```

2. The previous comamand creates all the files and folder structure needed for our extension. Open `src/ckanext-example_extension/ckanext/example_extension/plugin.py` to see the main file of our extension that we will edit to add custom functionality:

```python
import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit


class Example_ExtensionPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)

    # IConfigurer

    def update_config(self, config_):
        toolkit.add_template_directory(config_, 'templates')
        toolkit.add_public_directory(config_, 'public')
        toolkit.add_resource('fanstatic', 'example_theme')
```

3. We will create a custom Flask Blueprint to extend our CKAN instance with more endpoints. In order to create a new blueprint and add an endpoint we need to:
 - Import Blueprint and render_template from the flask module.
 - Create the functions that will be used as endpoints
 - Implement the IBlueprint interface in our plugin and add the new endpoint.

4. From flask import Blueprint and render_template,

```python
import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit

from flask import Blueprint, render_template

class Example_ExtensionPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)

    # IConfigurer

    def update_config(self, config_):
        toolkit.add_template_directory(config_, 'templates')
        toolkit.add_public_directory(config_, 'public')
        toolkit.add_resource('fanstatic', 'example_extension')
```

5. Create a new function: hello_plugin
```python
import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit

from flask import Blueprint, render_template

def hello_plugin():
    u'''A simple view function'''
    return u'Hello World, this is served from an extension'

class Example_ExtensionPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)

    # IConfigurer

    def update_config(self, config_):
        toolkit.add_template_directory(config_, 'templates')
        toolkit.add_public_directory(config_, 'public')
        toolkit.add_resource('fanstatic', 'example_extension')
```
6. Implement the IBlueprint interface in our plugin and add the new endpoint.

```python
import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit

from flask import Blueprint, render_template

def hello_plugin():
    u'''A simple view function'''
    return u'Hello World, this is served from an extension'

class Example_ExtensionPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.IBlueprint)

    # IConfigurer

    def update_config(self, config_):
        toolkit.add_template_directory(config_, 'templates')
        toolkit.add_public_directory(config_, 'public')
        toolkit.add_resource('fanstatic', 'example_extension')

    # IBlueprint

    def get_blueprint(self):
        u'''Return a Flask Blueprint object to be registered by the app.'''
        # Create Blueprint for plugin
        blueprint = Blueprint(self.name, self.__module__)
        blueprint.template_folder = u'templates'
        # Add plugin url rules to Blueprint object
        blueprint.add_url_rule('/hello_plugin', '/hello_plugin', hello_plugin)
        return blueprint

```

6. Go back to the browser and navigate to http://ckan:5000/hello_plugin. You should see the value returned by our view!

![New Blueprint output](https://i.imgur.com/AZjTDbN.png)

Now that you have added a new view and endpoint to your plugin you are ready for the next step of the tutorial! You can also check the complete code of this plugin in the [ckan repository](https://github.com/ckan/ckan/tree/master/ckanext/example_flask_iblueprint).
