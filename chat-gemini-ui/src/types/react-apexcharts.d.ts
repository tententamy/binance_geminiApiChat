declare module "react-apexcharts" {
  import { Component } from "react";
  import { ApexOptions } from "apexcharts";

  interface Props {
    options: ApexOptions;
    series: any;
    type:
      | "line"
      | "area"
      | "bar"
      | "histogram"
      | "pie"
      | "donut"
      | "radialBar"
      | "scatter"
      | "bubble"
      | "heatmap"
      | "candlestick"
      | "radar"
      | "polarArea"
      | "rangeBar"
      | "treemap";
    width?: string | number;
    height?: string | number;
  }

  export default class ReactApexChart extends Component<Props> {}
}
