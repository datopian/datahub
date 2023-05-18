# How to have data rich documents with charts and tables?


## Tables 

- You can use the table component
![](https://hackmd.io/_uploads/HyrtR_mS2.png)

- It can be used with raw data
```
<Table
  cols={[
    {
      key: 'id',
      name: 'ID'
    },
    {
      key: 'firstName',
      name: 'First name'
    },
    {
      key: 'lastName',
      name: 'Last name'
    },
    {
      key: 'age',
      name: 'Age'
    }
  ]}
  data={[
    {
      age: 35,
      firstName: 'Jon',
      id: 1,
      lastName: 'Snow'
    },
    {
      age: 42,
      firstName: 'Cersei',
      id: 2,
      lastName: 'Lannister'
    }
  ]}
/>
```
- It can be used with a raw csv string
![](https://hackmd.io/_uploads/SJglXtQrh.png)
```
<Table
  csv="
    Year,Temp Anomaly
    1850,-0.418
    2020,0.923
    "
 />
```
- It can be used with a URL string
![](https://hackmd.io/_uploads/S19GXYXBn.png)
```
<Table url="https://raw.githubusercontent.com/datasets/finance-vix/main/data/vix-daily.csv" />
```

## Charts

### Linecharts

- You can add LineCharts passing in a array of data
![](https://hackmd.io/_uploads/S1TBXYXH3.png)
```
<LineChart
  data={[
    [
      '1850',
      -0.41765878
    ],
    [
      '1851',
      -0.2333498
    ],
    [
      '1852',
      -0.22939907
    ],
    [
      '1853',
      -0.27035445
    ],
    [
      '1854',
      -0.29163003
    ]
  ]}
 />
```
- You can pass a URL
![](https://hackmd.io/_uploads/SkHd7KXS3.png)
```
<LineChart
  data="https://raw.githubusercontent.com/datasets/oil-prices/main/data/wti-year.csv"
  title="Oil Price x Year"
  xAxis="Date"
  yAxis="Price"
/>
```

### Vega Charts

You can add Vega charts with the `<Vega />` component like this, it supports all the Vega specification:
![](https://hackmd.io/_uploads/ryN5mYmSh.png)
```

<Vega
  data={{
    table: [
      {
        x: 1850,
        y: -0.418
      },
      {
        x: 2020,
        y: 0.923
      }
    ]
  }}
  spec={{
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    data: {
      name: 'table'
    },
    encoding: {
      x: {
        field: 'x',
        type: 'ordinal'
      },
      y: {
        field: 'y',
        type: 'quantitative'
      }
    },
    mark: 'bar'
  }}
/>
```

### VegaLite Charts

- You can add VegaLite charts with the `<VegaLite />` component like this, it supports all the VegaLite specification:
![](https://hackmd.io/_uploads/rJ2nQt7B3.png)
```
<VegaLite
  data={{
    table: [
      {
        x: 1850,
        y: -0.418
      },
      {
        x: 2020,
        y: 0.923
      }
    ]
  }}
  spec={{
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    data: {
      name: 'table'
    },
    encoding: {
      x: {
        field: 'x',
        type: 'ordinal'
      },
      y: {
        field: 'y',
        type: 'quantitative'
      }
    },
    mark: 'bar'
  }}
/>
```
