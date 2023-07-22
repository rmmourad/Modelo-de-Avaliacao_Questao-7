function main() {
  let svg = d3.select('svg'),
    margin = 200,
    width = svg.attr('width') - margin,
    height = svg.attr('height') - margin

  let xScale = d3.scaleBand().range([0, width]).padding(0.4),
    yScale = d3.scaleLinear().range([height, 0])

  var g = svg
    .append('g')
    .attr('transform', 'translate(' + 100 + ',' + 100 + ')')

  // Your data (replace this with your actual data)
  var data = d3.csv('clothingmodel_category.csv').then(data => {
    // Set the domains for x and y scales
    xScale.domain(
      data.map(function (d) {
        return d.mainCategory
      })
    )

    yScale.domain([
      0,
      d3.max(data, function (d) {
        return d['page 2 (clothing model)']
      })
    ])

    // Add the x-axis to the visualization
    g.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale))
      .append('text')
      .attr('y', height - 250)
      .attr('x', width - 100)
      .attr('text-anchor', 'end')
      .attr('stroke', 'black')
      .text('Categories')

    // Add the y-axis to the visualization
    g.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 10)
      .attr('dy', '-5em')
      .attr('text-anchor', 'end')
      .attr('stroke', 'black')
      .text('Values')

    // Add the bars to the visualization
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', function (d) {
        return xScale(d.mainCategory)
      })
      .attr('y', function (d) {
        return yScale(d['page 2 (clothing model)'])
      })
      .attr('width', xScale.bandwidth())
      .attr('height', function (d) {
        return height - yScale(d['page 2 (clothing model)'])
      })
  })
}
