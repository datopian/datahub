import{j as d}from"./jsx-runtime-94f6e698.js";import{V as c}from"./VegaLite-30eeb950.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./Vega-d925c94f.js";import"./index-1fc0ca9a.js";function i({data:e=[],fullWidth:n=!1,title:f="",xAxis:x="x",yAxis:g="y"}){var s=e;Array.isArray(e)&&(s=e.map(o=>({x:o[0],y:o[1]})));const v={table:s},r={$schema:"https://vega.github.io/schema/vega-lite/v5.json",title:f,width:"container",height:300,mark:{type:"line",color:"black",strokeWidth:1,tooltip:!0},data:{name:"table"},selection:{grid:{type:"interval",bind:"scales"}},encoding:{x:{field:x,timeUnit:"year",type:"temporal"},y:{field:g,type:"quantitative"}}};return typeof e=="string"?(r.data={url:e},d.jsx(c,{fullWidth:n,spec:r})):d.jsx(c,{fullWidth:n,data:v,spec:r})}try{i.displayName="LineChart",i.__docgenInfo={description:"",displayName:"LineChart",props:{data:{defaultValue:{value:"[]"},description:"",name:"data",required:!1,type:{name:"string | (string | number)[][] | { x: string; y: number; }[]"}},title:{defaultValue:{value:""},description:"",name:"title",required:!1,type:{name:"string"}},xAxis:{defaultValue:{value:"x"},description:"",name:"xAxis",required:!1,type:{name:"string"}},yAxis:{defaultValue:{value:"y"},description:"",name:"yAxis",required:!1,type:{name:"string"}},fullWidth:{defaultValue:{value:"false"},description:"",name:"fullWidth",required:!1,type:{name:"boolean"}}}}}catch{}const w={title:"Components/LineChart",component:i,tags:["autodocs"],argTypes:{data:{description:`Data to be displayed.

 E.g.: [["1990", 1], ["1991", 2]] 

OR

 "https://url.to/data.csv"`},title:{description:"Title to display on the chart. Optional."},xAxis:{description:'Name of the X axis on the data. Required when the "data" parameter is an URL.'},yAxis:{description:'Name of the Y axis on the data. Required when the "data" parameter is an URL.'},fullWidth:{description:"Whether the component should be rendered as full bleed or not"}}},t={name:"Line chart from array of data points",args:{data:[["1850",-.41765878],["1851",-.2333498],["1852",-.22939907],["1853",-.27035445],["1854",-.29163003]]}},a={name:"Line chart from URL",args:{title:"Oil Price x Year",data:"https://raw.githubusercontent.com/datasets/oil-prices/main/data/wti-year.csv",xAxis:"Date",yAxis:"Price"}};var l,p,m;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: 'Line chart from array of data points',
  args: {
    data: [['1850', -0.41765878], ['1851', -0.2333498], ['1852', -0.22939907], ['1853', -0.27035445], ['1854', -0.29163003]]
  }
}`,...(m=(p=t.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var u,h,y;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: 'Line chart from URL',
  args: {
    title: 'Oil Price x Year',
    data: 'https://raw.githubusercontent.com/datasets/oil-prices/main/data/wti-year.csv',
    xAxis: 'Date',
    yAxis: 'Price'
  }
}`,...(y=(h=a.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const U=["FromDataPoints","FromURL"];export{t as FromDataPoints,a as FromURL,U as __namedExportsOrder,w as default};
//# sourceMappingURL=LineChart.stories-de9527a1.js.map
