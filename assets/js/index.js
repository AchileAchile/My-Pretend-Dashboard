queue()
    .defer(d3.json, "assets/data/reviews.json")
    .await(easyGraphs);
    
  function easyGraphs(error, reviewsData){
    
    var ndx = crossfilter(reviewsData);
    var month_dim = ndx.dimension(dc.pluck('month'));
    var total_rating_month = month_dim.group().reduceSum(dc.pluck('rating'));
    
    dc.barChart(".customers_feedback_per_month")
            .width(300)
            .height(150)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(month_dim)
            .group(total_rating_month)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Month")
            .yAxis().ticks(4);
            
          dc.renderAll();
  }



/**var margin = {top: 20, right: 20, bottom: 30, left: 40};
var width = 700 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
var y = d3.scaleLinear().rangeRound([height, 0]);

var svg = d3.select(".customers-feedback")
              .append("svg")
              .attr("width", width)
              .attr("height", height);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", function(d) {
  d.ratings = +d.ratings;
  return d;
  
}, function(error, data) {
  if (error) throw error;
  
  

  x.domain(data.map(function(d) { return d.months; }));
  y.domain([0, d3.max(data, function(d) { return d.ratings; })]);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.months); })
      .attr("y", function(d) { return y(d.ratings); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.ratings); });
});**/
