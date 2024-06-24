<script>
  export let data;
  import * as d3 from "d3";
  import { onMount } from "svelte";

  let el;

  let xScale = d3.scaleTime();
  let yScale = d3.scaleLinear().domain([0, 20]);
  let width;
  let height;

  const margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 30,
  };

  onMount(() => {
    redraw();
    // window.addEventListener("resize", redraw)
  });

  function redraw() {
    // empty el div
    d3.select("#el");
    // determine width & height of parent element and subtract the margin
    width =
      d3.select(el).node().getBoundingClientRect().width -
      margin.left -
      margin.right;
    height =
      d3.select(el).node().getBoundingClientRect().height -
      margin.top -
      margin.bottom;

    // init scales according to new width & height
    xScale.range([0, width]);
    yScale.range([height, 0]);
    // Construct line
    const line = d3.line();

    // create svg and create a group inside that is moved by means of margin
    const svg = d3
      .select(el)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${[margin.left, margin.top]})`);

    // draw x and y axes
    svg
      .append("g")
      .attr("transform", `translate(${[0, height]})`)
      .call(d3.axisBottom(xScale));
    svg.append("g").call(d3.axisLeft(yScale));

    // draw data points
    svg
      .append("g")
      .selectAll("circle")
      .data(data[0].data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        console.log(d.data);
        return xScale(new Date(d.date));
      })
      .attr("cy", function (d) {
        return yScale(d.data);
      })
      .attr("d", line(7))
      .style("fill", "#ff3e00")
      .style("fill-opacity", "0.5")
      .style("stroke", "#ff3e00");
  }
  console.log(data[0].data);
</script>

<div>
  <h1>CHART</h1>
  <div bind:this={el} class="chart" id="el" />
</div>

<style>
  div {
    height: 100%;
  }
  #el {
    width: 100%;
    height: 100%;
  }
</style>
