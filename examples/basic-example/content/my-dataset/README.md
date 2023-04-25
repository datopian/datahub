# Data

This is the README.md this project.

## Table 

<Table url="data_1.csv" />
 
## Vega Lite Line Chart from URL 

<VegaLite spec={ { "$schema": "https://vega.github.io/schema/vega-lite/v5.json", "data": {"url": "data_2.csv"}, "width": 600, "height": 250, "mark": "line", "encoding": { "x": {"field": "Time", "type": "temporal"}, "y": {"field": "Anomaly (deg C)", "type": "quantitative"}, "tooltip": {"field": "Anomaly (deg C)", "type": "quantitative"} } } } />
