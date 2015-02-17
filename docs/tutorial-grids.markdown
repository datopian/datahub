---
layout: container
title: Grids - Advanced use of grids in Recline - Tutorial
recline-deps: true
root: ../
---

<div class="page-header">
  <h1>
    Doing More with Grids
    <br />
    <small>This tutorial goes beyond the <a href="tutorial-views.html">basic
    views tutorial</a> and shows you how to do more with grids</small>
  </h1>
</div>

### How much can I do with a simple grid view

### Benefits of SlickGrid
What does Recline give you out of the box, what does SlickGrid have built in and how to use it (reference to stuff below).

### Preparing your page

See the instructions in the [basic views tutorial](tutorial-views.html).

### Creating a Dataset

Just like in the main tutorial, here's some example data We are going to work with:

{% highlight javascript %}
{% include data.js %}
var dataset = new recline.Model.Dataset({
  records: data
});
{% endhighlight %}

<script type="text/javascript">
{% include data.js %}
var dataset = new recline.Model.Dataset({
  records: data
});
</script>

### Accessing SlickGrid features
Show how we can customize SlickGrid grid "normally" - i.e. you can get access to underlying grid and tweak it as you want.

Suggest we demonstrate using this example: https://github.com/mleibman/SlickGrid/blob/gh-pages/examples/example-plugin-headermenu.html

Idea here is: we don't want to mimic all that slickgrid can do through recline interface - just let people do it directly themselves ...



