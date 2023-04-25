# Views

Producers and consumers of data want to have data presented in tables and graphs -- "views" on the data. They want this for a range of reasons, from simple eyeballing to drawing out key insights.

```mermaid
graph LR
  data[Your Data] --> table[Table]
  data --> grap[Graph]
  data --> geo[Map]
```

To achieve this we need to provide:

* A tool-chain to create these views from the data.
* A descriptive language for specifying views such as tables, graphs, map.

These requirements are addressed through the introduction of Data Package "Views" and associated tooling.

```mermaid
graph LR

  subgraph Data Package
    resource[Resource]
    view[View]
    resource -.-> view
  end

  view --> toolchain
  toolchain --> svg["Rendered Graph (SVG)"]
  toolchain --> table[Table]
  toolchain --> map[Map]
```

This section describes the details of how we support [Data Package Views][views] in the DataHub.

It consists of two parts, the first describes the general tool chain we have. The second part describes how we use that to generate graphs in the showcase page.

**Quick Links**

* [Data Package Views introduction and spec][views]
* [datapackage-render-js][] - this is the library that implements conversion from the data package views spec to vega/plotly and then svg or png

[views]: /docs/dms/publishers/views
[datapackage-render-js]: https://github.com/frictionlessdata/datapackage-render-js
[dpr-js]: https://github.com/frictionlessdata/dpr-js

## The Tool Chain

***Figure 1: From Data Package View Spec to Rendered output***

```mermaid
graph TD
  pre[Pre-cursor views e.g. Recline] --bespoke conversions--> dpv[Data Package Views]
  dpv --"normalize (correct any variations and ensure key fields are present)"--> dpvn["Data Package Views<br />(Normalized)"]
  dpvn --"compile in resource & data ([future] do transforms)"--> dpvnd["Self-Contained View<br />(All data and schema inline)"]
  dpvnd --compile to native spec--> plotly[Plotly Spec]
  dpvnd --compile to native spec--> vega[Vega Spec]
  plotly --render--> html[svg/png/etc]
  vega --render--> html
```

**IMPORTANT**: an important "convention" we adopt for the "compiling-in" of data is that resource data should be inlined into an `_values` attribute. If the data is tabular this attribute should be an array of *arrays* (not objects).

### Graphs

***Figure 2: Conversion paths***

```mermaid
graph LR
  inplotly["Plotly DP Spec"] --> plotly[Plotly JSON]
  simple[Simple Spec] --> plotly
  simple .-> vega[Vega JSON]
  invega[Vega DP Spec] --> vega
  vegalite[Vega Lite DP Spec] --> vega
  recline[Recline] .-> simple
  plotly --plotly lib--> svg[SVG / PNG]
  vega --vega lib--> svg
  
  classDef implemented fill:lightblue,stroke:#333,stroke-width:4px;
  class recline,simple,plotly,svg,inplotly,invega,vega implemented;
```

Notes:

* Implemented paths are shown in lightblue - code for this is in [datapackage-render-js][]
* Left-most column (Recline): pre-specs that we can convert to our standard specs
* Second-from-left column: DP View spec types.
* Second-from-right column: the graphing libraries we can use (which all output to SVG)

### Geo support

**Note**: support for customizing map is limited to JS atm - there is no real map "spec" in JSON yet beyond the trivial version.

**Note**: vega has some geo support but geo here means full geojson style mapping.

```mermaid
graph LR

  geo[Geo Resource] --> map
  map[Map Spec] --> leaflet[Leaflet]
  
  classDef implemented fill:lightblue,stroke:#333,stroke-width:4px;
  class geo,map,leaflet implemented;
```

### Table support

```mermaid
graph LR
  resource[Tabular Resource] --> table
  table[Table Spec] --> handsontable[HandsOnTable]
  table --> html[Simple HTML Table]
  
  classDef implemented fill:lightblue,stroke:#333,stroke-width:4px;
  class resource,table,handsontable implemented;
```

### Summary

***Figure 3: From Data Package View to Rendered output flow (richer version of diagram 1)***

<img src="https://docs.google.com/drawings/d/1M_6Vcal4PPSHpuKpzJQGvRUbPb5yeaAdRHomIIbfnlY/pub?w=790&h=1402" />


## Views in the Showcase

To render Data Packages in browsers we use DataHub views written in JavaScript. The module implemented in ReactJS framework and it can render tables, maps and various graphs using third-party libraries.

Implementing code can be found in:

* [dpr-js repo][dpr-js] - which in turn depends on [datapackage-render-js][]

```mermaid
  graph TD

  url["metadata URL passed from back-end"]
  dp-js[datapackage-js]
  dprender[datapackage-render-js]
  table["table view"]
  chart["graph view"]
  hot[HandsOnTable]
  map[LeafletMap]
  vega[Vega]
  plotly[Plotly]
  browser[Browser]

  url --> dp-js
  dp-js --fetched dp--> dprender
  dprender --spec--> table
  table --1..n--> hot
  dprender --geojson--> map
  dprender --spec--> chart
  chart --0..n--> vega
  chart --0..n--> plotly
  hot --table--> browser
  map --map--> browser
  vega --graph--> browser
  plotly --graph--> browser
```

Notice that DataHub views render a table view per tabular resource. If GeoJSON resource is given, it renders a map. Graph views should be specified in `views` property of a Data Package.

## Appendix

There is a separate page with [additional research material regarding views specification and tooling][views-research].

[views-research]: /docs/dms/datahub/developers/views-research

