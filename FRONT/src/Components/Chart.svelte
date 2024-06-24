<script>
  export let data
  import {
    line,
    curveStep,
    timeParse,
    scaleLinear,
    extent,
    scaleTime,
  } from "d3"

  let el

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  let width = 800
  let height = 300
  let margin = { top: 20, bottom: 20, left: 20, right: 20 }

  let allData = data[0].data

  // scales
  let extentX = extent(allData, (d) => d.date)
  let xScale = scaleLinear()
    .domain(extentX)
    .range([margin.left, width - margin.right])

  let extentY = extent(allData, (d) => d.data)
  let yScale = scaleLinear()
    .domain(extentY)
    .range([height - margin.bottom, margin.top])

  let path = line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.data))
    .curve(curveStep)

  console.log(path)
  // ticks for x axis - first day of each month found in the data
  let xTicks = []
  allData.forEach((d) => {
    // d.date = Date.parse(d.date)
    // d.date = timeParse("%Y%m%dT%H:%M:%S")(d.date)
    // if (d.date.getDate() == 1) {
    //   xTicks.push(d.date)
    // }
    xTicks.push(d.date)
  })

  // x axis labels string formatting
  // let xLabel = (x) => {
  //   console.log(x)
  //   monthNames[x.getMonth()] +
  //     " 20" +
  //     x.getYear().toString().substring(x.getYear(), 1)
  // }

  // y ticks count to label by 5's
  let yTicks = []
  allData.forEach((d) => {
    yTicks.push(d.data)
  })

  // d's for axis paths
  let xPath = `M${margin.left + 0.5},6V0H${width - margin.right + 1}V6`
  let yPath = `M-6,${height + 0.5}H0.5V0.5H-6`
</script>

<div>
  <h1>CHART</h1>
  <svg bind:this={el} transform="translate({margin.left}, {margin.top})">
    <g>
      <!-- line -->
      <path d={path(allData)} fill="none" stroke="blue" />
    </g>

    <!-- y axis -->
    <g transform="translate({margin.left}, 0)">
      <path stroke="currentColor" d={yPath} fill="none" />

      {#each yTicks as y}
        <g class="tick" opacity="1" transform="translate(0,100)">
          <line stroke="currentColor" x2="-5" />
          <text dy="0.32em" fill="currentColor" x="-{margin.left}">
            {y}
          </text>
        </g>
      {/each}
    </g>

    <!-- x axis -->
    <g transform="translate(0, {height})">
      <path stroke="currentColor" d={xPath} fill="none" />

      {#each xTicks as x}
        <g class="tick" opacity="1" transform="translate(100,0)">
          <line stroke="currentColor" y2="6" />
          <text fill="currentColor" y="9" dy="0.71em" x="-{margin.left}">
            <!-- {xLabel(x)} -->
          </text>
        </g>
      {/each}
    </g>
  </svg>
</div>

<style>
  div {
    height: 100%;
  }
  svg {
    width: 100%;
    height: 100%;
  }
</style>
