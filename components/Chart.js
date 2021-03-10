import React, { useState, useEffect } from 'react';
import createPlotlyComponent from "react-plotly.js/factory";

let Plot;

const Chart = (props) => {
    const [plotCreated, setPlotCreated] = useState(0) //0: false, 1: true

    useEffect(() => {
        import(`plotly.js-basic-dist`).then(Plotly => { //import Plotly dist when Page has been generated
            Plot = createPlotlyComponent(Plotly);
            setPlotCreated(1)
        });
    }, [])

    if (!plotCreated) {
        return (<div>Loading...</div>)
    }

    return (
        <div data-testid="plotlyChart">
            <Plot {...props.spec}
                layout={{ autosize: true }}
                style={{ width: "100%", height: "100%" }}
                useResizeHandler={true}
            />
        </div>
    )
}

export default Chart 