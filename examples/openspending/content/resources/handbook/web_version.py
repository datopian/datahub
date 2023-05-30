import json
from lxml import html
from jinja2 import Template, Markup

PREFIX = 'book/'
MANIFEST = 'info.json'

TEMPLATE = """---
title: {{title}}
layout: handbook
---

<div class="row">
    <div class="span4">
        <ul class="nav nav-list span3">
        {% for section in toc %}
            <li class="nav-header">{{ section.title }}</li>
            {% for child in section.children %}
                <li><a href="{{child.url}}">{{child.title}}</a></li>
            {% endfor %}
        {% endfor %}
            <li class="nav-header">Further information</li>
            <li><a href="http://okfn.booktype.pro/spending-data-handbook/">Contribute to the book</a></li>
            <li><a href="spending-data-handbook.pdf"><strong>Download a PDF version</strong></a></li>
            <li><a href="Spending_Data_Handbook.epub">ePub Version (iPad)</a></li>
            <li><a href="Spending_Data_Handbook.mobi">MOBI Version (Amazon Kindle)</a></li>
        </ul>
    </div>
    <div class="span8">
        {{body}}
    </div>
</div>

"""

def rename_tag(doc, src, dst):
    for tag in doc.findall('.//' + src):
        tag.tag = dst


def produce():
    info = json.load(open(PREFIX + MANIFEST, 'rb'))

    for file_name in info["spine"]:
        data = open(PREFIX + file_name + '.html', 'rb').read()
        doc = html.document_fromstring(data.decode('utf-8'))
        body = doc.find('.//body')
        body.tag = 'div'
        title = doc.find('.//h1')
        title = title.text.strip() if title is not None else ''
        print [title]
        rename_tag(doc, 'h4', 'h5')
        rename_tag(doc, 'h3', 'h4')
        rename_tag(doc, 'h2', 'h3')
        rename_tag(doc, 'h1', 'h2')
        tpl = {
            "title": title,
            "body": html.tostring(body),
            "toc": info.get("TOC")
            }
        content = Template(TEMPLATE).render(tpl)
        fh = open(file_name + '.html', 'wb')
        fh.write(content.encode('utf-8'))
        fh.close()


if __name__ == "__main__":
    produce()

