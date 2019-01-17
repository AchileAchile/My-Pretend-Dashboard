
/**function type(d){
    d.x = +d.x;
    d.y = +d.y;
    d.x = parseInt(d.x);
    d.y = parseInt(d.y);
    return d;
}
 

d3.csv("/assets/data/reviews.csv", type).get(function(error, data){
    //console.log(data);
    
    var svg = d3.select("#draw-here").append("svg")
                .attr("width", 700)
                .attr("height", 500)
                
        svg.selectAll("rect")
            .data(data)
            .enter()
                .append("rect")
                .attr("width", function (d) { return d.ratings * 10; })
                .attr("height", 48)
                .attr("y", function (d, i) { return i * 50; })
                .attr("fill", "blue")
                
        svg.selectAll("text")
            .data(data)
            .enter()
                .append("text")
                .attr("fill", "white")
                .attr("y", function (d, i) { return i * 50 + 24;})
                .text(function (d) { return d.month; })
})**/


        
/**


var parseDate=D3.timeParse("%m/%d/%Y");

d3.csv("prices.csv")
    .row(fucntion(d){ return { date:parseDate(d.date),price:parseNumber(d.price.trim().slice(1))}; })
    .get(function(error, data){
        console.log(data);
        
    var height = 400;
    var width = 600;
    
    var maxDate = d3.max(data,function(d){ return d.date; });
    var minDate = d3.min(data,function(d){ return d.date; });
    var maxPrice = d3.max(data,function(d){ return d.price; });
    
    console.log(maxDate);
    conosole.log(minDate);
    console.log(maxPrice);
    
    var y = d3.scaleLinear()
            .domain([0,maxPrice])
            .range([height,0]);
            
    var x = d3.scaleTime()
            .domain([minDate,maxDate])
            .range([0,width]);
            
    var yAxis = d3.axisLeft(y);
    var xAxis = d3.axisBottom(x);
    
    var svg = d3.select('body').append('svg')
            .attr('height', '100%')
            .attr('width', '100%');
            
    var chartGroup = svg.append('g')
                    .attr('transform','translate(50,50)');
                    
    var line = d3.line()
                        .x(function(d){ return x(d.date); })
                        .y(function(d){ return y(d.price);});
    chartGroup.append('path').attr('d',line(data));
    chartGroup.append('g').attr('class','x axis').attr('transform','translate(0,+height+)').call(xAxis);
    chartGroup.append('g').attr('class','x axis').call(yAxis);
    });

/**function type(d){
    d.x = parseInt(d.x);
    d.y = parseInt(d.y);
    return d;
}**/
/**
var scale = d3.scale.linear();

scale.domain([0, 1]); //data space
scale.range([0, 120]); //pixel space

/** var scale = d3.scale.linear()
            .domain([0, 1])//setter functions
            .range([0, 120]);//
            
    console.log(scale.domain());//if you call the scale function without any argument, it will return the array that was set before. it acts as a getter function
    console.log(scale.range());
**/
/**
console.log(scale(0));
console.log(scale(0.5));
console.log(scale(1));

var scale = d3.scale.ordinal()//ordered or unique domain.
        .domain(["A", "B", "c"])
        .range(["Apple", "Banana", "Coconut"]);
        
    
        
/**var svg = d3.select("body").append("svg");

svg.attr("width", 250);
svg.attr("height", 250);

var rect = svg.append("rect");

rect.attr("x", 50);
rect.attr("y", 50);
rect.attr("width", 20);
rect.attr("height", 20);**/

/**********sum of d3 pipeline********************//**

var data = [];//data to be visualized

//var scale = d3.scale.ordinal()
var scale = d3.scale.linear()
        .domain([1, 5])// data space
        .range([0, 200]); // pixel space
        
//d3 data binding and it execute for a case where there is no rectangle but there is a data and create them with the arrays
var svg = d3.selectAll("rect")
        .data(data)
    .enter().append("rect")
        .attr("x", function (d) { return scale(d); })
        .attr("y", 50)
        .attr("width", 50)
        .attr("height", 20);
        
/***********************color************************//**

var scale = d3.scale.linear()
        .domain([1, 5])// data space
        .range([0, 200]); // pixel space
        
var svg = d3.select("body").append("svg")
        .attr("width", 250)
        .attr("height", 250);
        
function render(data, color) {
    var rects = svg.selectAll("rect").data(data);
    
//Enter-static properties
    rects.enter().append("rect")
        .attr("y", 50)
        .attr("width", 20)
        .attr("height", 20);
    
 //Update-dynamic properties
    rects
        .attr("x", scale)//same as function(d) { return scale(d); })
        .attr("fill", color);
        
// Exit-removes and throw away dorm elements
    rects.exit().remove();
}
d3.csv("data.csv", type, render);

render([1, 2, 3,], "red");
render([1, 2, 3, 4, 5], "blue");

//min and max value
d3.csv("reviews.csv", type, function (data){
    var min = d3.min(data, function(d){ return d.sepal_length; });
    var min = d3.min(data, function(d){ return d.sepal_length; });
    console.log([min, max]);
});
   
// provides the mini and max value in an array in one function call 
d3.csv("reviews.csv", type, function (data){
    var extent = d3.extent(data, function (d){ return d.sepal_length; });
    console.log(extent);
});

// parsing strings
/** function type(d){
    d.sepal_length = +d.sepal_length;
    d.sepal_width = +d.sepal_width;
    d.petal_length = +d.petal_length;
    d.petal_width = +d.petal_width;
    
}**/

        
     /** EXAMPLE CODE
        var svg = d3.select("body").append("svg")
            .attr("width", 250)
            .attr("height", 250);
            
        var xScale = d3.scale.linear().range([0, 250]);
        var yScale = d3.scale.linear().range([0, 250]);
        
        function render(data){
            
            xScale.domain(d3.extent(data, function (d){ return d.sepal_length; }));
            yScale.domain(d3.extent(data, function (d){ return d.petal_length; }));
            
            var circles = svg.selectAll("circle").data(data);
            circles.enter().append("circle").attr("r", 10);
            circles
                .attr("cx", function (d) { return xScale(d.sepal_length); })
                .attr("cy", function (d) { return yScale(d.petal_length); });
                
            cirlce.exit().remove();
        }
     **/ 
     
     var width = 500;
     var height = 500;
     var padding = 50;
     
     d3.csv("assets/data/reviews.csv", function (data) {
         var map = data.map(function (i) { return parseInt(i.ratings); })
        
        var histogram = d3.layout.histogram()
                            .bins(7)
                            (map)
                            
        var y = d3.scale.linear()
             .domain([0,d3.max(histogram.map(function (i) { return i.length; }))])
             .range([0,height]);
             
        var x = d3.scale.linear()
                    .domain([0,d3.max(map)])
                    .range([0,width])
                    
        var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");
             
        var svg = d3.select("#draw-here").append("svg")
                .attr("width", width)
                .attr("height", height + padding)
                .append("g")
                    .attr("transform", "translate(20,0)");
                
        var group = svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);
                
        var bars = svg.selectAll(".bars")
                    .data(histogram)
                    .enter()
                        .append("g")
                        
        bars.append("rect")
                .attr("x", function (d) { return x(d.x); })
                .attr("y", function (d) { return 500 - y(d.y); })
                .attr("width", function (d) {return x(d.dx); })
                .attr("height", function (d) { return y(d.y);})
                .attr("fill", "steelblue")
                
                
        bars.append("text")
            .attr("x", function (d) { return x(d.x); })
            .attr("y", function (d) {return 500 - y(d.y); })
            .attr("dy", "20px")
            .attr("dx", function (d) { return x(d.dx/2); })
            .attr("fill", "#fff")
            .attr("text-anchor", "middle")
            .text(function (d) { return d.y; })
                    
                    
                    
                    
                    
                    
                    
            console.log(histogram);
        
     })
     
     
        
        
        