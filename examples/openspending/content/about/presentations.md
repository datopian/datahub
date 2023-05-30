---
title: Presentations
section: about
---

{% for presentation in site.pages %}{% if presentation.presentation %}
[{{ presentation.title }}]({{ presentation.url }})
{% if presentation.authors %}
<div class="author">Written by
<ul>
{% for author in presentation.authors %}
<li>{{ author }}</li>
{% endfor %}
</ul>
</div>
{% endif %}
{% endif %}{% endfor %}
