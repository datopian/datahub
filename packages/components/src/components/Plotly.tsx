import Plot, { PlotParams } from "react-plotly.js";

export const Plotly: React.FC<PlotParams> = (props) => {
  return (
    <div>
      <Plot {...props} />
    </div>
  );
};
