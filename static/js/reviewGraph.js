queue()
    .defer(d3.json, "data/review.json")
    .await(pretendGraph);
    
    let minDate, maxDate;
    
    
    var width_stacked_week = document.getElementById('stacked_chart_week').offsetWidth;
    var width_feedback_week = document.getElementById('customer_feedback_per_week').offsetWidth;
    var width_feedback_Month = document.getElementById('customer_feedback_per_month').offsetWidth;
    var width_average_week = document.getElementById('average_rating_week').offsetWidth;
    var width_average_Month = document.getElementById('average_rating_month').offsetWidth;
    var width_scatter = document.getElementById('scatter-plot').offsetWidth;
    var width_date_annual = document.getElementById('date_annual_customers_feedback_chart').offsetWidth;
    var width_date_line = document.getElementById('line_annual_customers_feedback').offsetWidth;
    var width_composite_graph = document.getElementById('composite-chart').offsetWidth;
    var width_composite_Month = document.getElementById('composite-month').offsetWidth;
    
function pretendGraph(error, reviewData){
    
    
    var ndx = crossfilter(reviewData);
    var parseDate = d3.time.format("%d/%m/%Y").parse;
            //var parseRating = 
            reviewData.forEach(function(d){
               d.date = parseDate(d.date);
               d.rating = parseInt(d.rating);
            });
            
            minDate = ndx.dimension(dc.pluck('date')).bottom(1)[0].date;
            maxDate = ndx.dimension(dc.pluck('date')).top(1)[0].date;
    
    week_distribution_selector(ndx);
    Month_distribution_selector(ndx);
    stacked_chart(ndx);
    feedback_week(ndx);
    feedback_Month(ndx);
    average_rating_week(ndx);
    average_average_Month(ndx);
    pie_week(ndx);
    pie_Month(ndx);
    pie_derived(ndx);
    scatter_plot(ndx);
    date_vertical_chart(ndx);
    line_feedback_graph(ndx);
    composite_week_graph(ndx);
    composite_Month_graph(ndx);
    
dc.renderAll();
}

function week_distribution_selector(ndx){
    var week_selector_dim = ndx.dimension(dc.pluck('week'));
    var week_selector_menu = week_selector_dim.group();
    dc.selectMenu("#week_selector")
        .dimension(week_selector_dim)
        .group(week_selector_menu);
}
function Month_distribution_selector(ndx){
    var Month_selector_dim = ndx.dimension(dc.pluck('Month'));
    var Month_selector_menu = Month_selector_dim.group();
    dc.selectMenu("#Month_selector")
        .dimension(Month_selector_dim)
        .group(Month_selector_menu);
}
function stacked_chart(ndx){
     var stacked_Month_dim = ndx.dimension(dc.pluck('Month'));
     var First_week_stacked = stacked_Month_dim.group().reduceSum(function (d){
        if (d.week === 'First'){
             return +d.rating;
        }else{
          return 0;
            }
        });
    var Second_week_stacked = stacked_Month_dim.group().reduceSum(function (d){
        if (d.week === 'Second'){
             return +d.rating;
        }else{
          return 0;
            }
        });
                
    var Third_week_stacked = stacked_Month_dim.group().reduceSum(function (d){
        if (d.week === 'Third'){
            return +d.rating;
        }else{
          return 0;
            }
        });
                
    var Fourth_week_stacked = stacked_Month_dim.group().reduceSum(function (d){
        if (d.week === 'Fourth'){
                return +d.rating;
            }else{
                return 0;
            }
        });
    
    var week_stackedChart = dc.barChart("#stacked_chart_week")
        week_stackedChart
            .width(width_stacked_week)
            .height(250)
            .dimension(stacked_Month_dim)
            .group(First_week_stacked, "1st wks")
            .stack(Second_week_stacked, "2nd wks")
            .stack(Third_week_stacked, "3rd wks")
            .stack(Fourth_week_stacked, "4th wks")
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .legend(dc.legend().x(200).y(0).itemHeight(10).gap(5))
            .margins({top: 10, right: 50, bottom: 30, left: 50});
    week_stackedChart.margins().right = 100;

    window.Onresize = function(event){
        var newWidth = document.getElementById('#stacked_chart_week').offsetWidth;
        newWidth.width(width_stacked_week);
    };
}



     function feedback_week(ndx){
            var total_week_dim = ndx.dimension(dc.pluck('week'));
            var total_rating_per_week = total_week_dim.group().reduceSum(dc.pluck('rating'));
           
            var week_chart = dc.barChart("#customer_feedback_per_week")
                .width(width_feedback_week)
                .height(250)
                .margins({top: 20, right: 50, bottom: 40, left: 50})
                .dimension(total_week_dim)   
                .group(total_rating_per_week)
                .transitionDuration(1000)
                .x(d3.scale.ordinal())
                .xUnits(dc.units.ordinal)
                .xAxisLabel("Rating per Week")
                .yAxis().ticks(5);
        window.Onresize = function(event){
            var newWidth = document.getElementById('#customer_feedback_per_week').offsetWidth;
            newWidth.width(width_feedback_week);
    };
}

function feedback_Month(ndx){
            var gross_Month_dim = ndx.dimension(dc.pluck('Month'));
            var total_rating_per_Month = gross_Month_dim.group().reduceSum(dc.pluck('rating'));
            var Month_stackedChart= dc.barChart("#customer_feedback_per_month")
            Month_stackedChart
                .width(width_feedback_Month)
                .height(250)
                .margins({top: 20, right: 50, bottom: 40, left: 50})
                .dimension(gross_Month_dim)   
                .group(total_rating_per_Month)
                .transitionDuration(1000)
                .x(d3.scale.ordinal())
                .xUnits(dc.units.ordinal)
                .xAxisLabel("Rating Per Month")
                .elasticY(true)
                .yAxisPadding(2)
                .yAxis().ticks(5);
                
        window.Onresize = function(event){
            var newWidth = document.getElementById('#customer_feedback_per_month').offsetWidth;
            Month_stackedChart.width(newWidth);
    };
}


    function average_rating_week(ndx){
        var average_rating_per_week_chart_dim = ndx.dimension(dc.pluck('week'));
            var average_rating_per_week = average_rating_per_week_chart_dim.group().reduce(
            function add_average_rating_per_week(p, v){
                p.count++;
                p.total += v.rating;
                p.average = p.total / p.count;
                return p;
            },
            function remove_average_rating_per_week(p, v){
                p.count--;
                if(p.count == 0){
                    p.total = 0;
                    p.average = 0;
                }else{
                p.total -= v.rating;
                p.average = p.total / p.count;
            }
            return p;
     },
            function initialise(){
                return{count: 0, total: 0, average: 0};
    },
        );
        var aver_rating_per_week = dc.barChart("#average_rating_week");
        aver_rating_per_week        
                .width(width_average_week )
                .height(250)
                .margins({top: 20, right: 50, bottom: 40, left: 50})
                .dimension(average_rating_per_week_chart_dim)
                .group(average_rating_per_week)
                .valueAccessor(function (d){
                    return d.value.average.toFixed(3);
                })
                    .transitionDuration(1000)
                    .x(d3.scale.ordinal())
                    .xUnits(dc.units.ordinal)
                    .xAxisLabel("Average Rating Per Week")
                    .yAxis().ticks(5);
                    
        window.Onresize = function(event){
            var newWidth = document.getElementById('average_rating_week').offsetWidth;
            aver_rating_per_week.width(newWidth);
    };
  }
  
  function  average_average_Month(ndx){
         var average_Month_dim = ndx.dimension(dc.pluck('Month')); 
         var average_rating_Month = average_Month_dim.group().reduce(
            
           function (p, v){
               p.count++;
               p.total += v.rating;
               p.average = p.total / p.count;
               return p;
           },
           
           function (p, v){
               p.count--;
               if (p.count == 0 ){
                   p.total = 0;
                   p.average = 0;
               }else{
                   p.total -= v.rating;
                   p.average = p.total / p.count;
               }
               return p;
           },
            function(){
                return { count: 0, total: 0, average: 0};
            }
            
            );
        var average_total_rating_month = dc.barChart("#average_rating_month");
        average_total_rating_month
                .width( width_average_Month)
                .height(250)
                .transitionDuration(1000)
                .dimension(average_Month_dim)
                .group(average_rating_Month)
                .valueAccessor(function (d){
                    return d.value.average.toFixed(2);
                })
                .x(d3.scale.ordinal())
                .xUnits(dc.units.ordinal);
                
        window.onresize = function(event){
            var newWidth = document.getElementById('average_rating_month').offsetWidth;
            average_total_rating_month.width(newWidth);
    };
}

            /** doughnut**/
    function pie_week(ndx){
         var pie_week_dim = ndx.dimension(dc.pluck('week'));
         var pie_rating_per_week = pie_week_dim.group().reduceSum(dc.pluck('rating'));
         dc.pieChart("#pie_customer_feedback_per_week")
            .height(200)
            .innerRadius(50)
            .transitionDuration(1000)
            .dimension(pie_week_dim)
            .group(pie_rating_per_week);
    }
    function pie_Month(ndx){
         var pie_Month_dim = ndx.dimension(dc.pluck('Month'));
         var total_rating_per_Month = pie_Month_dim.group().reduceSum(dc.pluck('rating'));
         dc.pieChart("#pie_customers_feedback_per_month")
            .height(200)
            .radius(100)
            .transitionDuration(1000)
            .dimension(pie_Month_dim)
            .group(total_rating_per_Month);
    }
    
     function pie_derived(ndx){
        var pie_derived_dim = ndx.dimension(function (d){
                if (d.rating >= 70){
                    return "Excellent";
                }else if
                    (d.rating > 50 && d.rating <= 70){
                        return "Good";
                    }else if 
                        (d.rating > 40 && d.rating < 50)
                        return "Average";
                    else
                        return "Poor";
                }
            );
    
            var pie_derived_group = pie_derived_dim.group();
            console.log(pie_derived_group.all);
            dc.pieChart("#derived")
            .height(200)
            .radius(100)
            .dimension(pie_derived_dim)
            .group(pie_derived_group);
    }
     function scatter_plot(ndx){
        var scatter_date_dim = ndx.dimension(dc.pluck('date'));
        var scatter_rating_dim = ndx.dimension(function (d){
            return [d.date, d.rating, d.week];
        });
        var scatter_rating_group = scatter_rating_dim.group();
        var weekly_colors = d3.scale.ordinal()
                .domain(["First", "Second", "Third", "Fourth"])
                .range(["blue", "yellow", "green", "red"]);
                
        var scatter_rating_chart = dc.scatterPlot("#scatter-plot");
        scatter_rating_chart
            .width(width_scatter)
            .height(400)
            .x(d3.time.scale().domain([minDate, maxDate]))
            .brushOn(false)
            .symbolSize(8)
            .clipPadding(10)
            .yAxisLabel("Rating")
            .title(function (d){
                return d.key[2] + " week rating equals " +d.key[1] + " on " +d.key[0];
            })
            .colorAccessor(function (d){
                return d.key[2];
            })
            .colors(weekly_colors)
            .dimension(scatter_rating_dim)
            .group(scatter_rating_group);
            
                     
        window.Onresize = function(event){
            var newWidth = document.getElementById('scatter-plot').offsetWidth;
            scatter_rating_chart.width(newWidth);
    };
}

function date_vertical_chart(ndx){
        var date_chart_dim = ndx.dimension(dc.pluck('date'));
        var total_period_rating = date_chart_dim.group().reduceSum(dc.pluck('rating'));
        date_feedback = dc.barChart("#date_annual_vertical_chart")
            .width(width_date_annual)
            .height(400)
            .margins({top: 10, right: 50, bottom: 50, left: 50})
            .dimension(date_chart_dim)   
            .group(total_period_rating)
            .transitionDuration(1000)
            .x(d3.time.scale().domain([minDate, maxDate]))
            .xAxisLabel("2018 Annual Vertical Line Chart")
            .brushOn(false)
            .yAxis().ticks(5);
            
                     
        window.Onresize = function(event){
            var newWidth = document.getElementById('date_annual_vertical_chart').offsetWidth;
            date_feedback.width(newWidth);
    };
 }
 
 function line_feedback_graph(ndx){
        var line_date_dim = ndx.dimension(dc.pluck('date'));
        var period_review_per_month = line_date_dim.group().reduceSum(dc.pluck('rating'));
        var line_date = dc.lineChart("#line_annual_customers_feedback")
                .width( width_date_line)
                .height(400)
                .margins({top: 10, right: 50, bottom: 50, left: 50})
                .dimension(line_date_dim)   
                .group(period_review_per_month)
                .transitionDuration(1000)
                .x(d3.time.scale().domain([minDate, maxDate]))
                .xAxisLabel("Month")
                .brushOn(false)
                .yAxis().ticks(5);
                
                         
        window.Onresize = function(event){
            var newWidth = document.getElementById('line_annual_customers_feedback').offsetWidth;
            line_date.width(newWidth);
    };
}



function  composite_week_graph(ndx){
    var composite_week_dim = ndx.dimension(dc.pluck('date'));
    var ratingInFirst = composite_week_dim.group().reduceSum(function(d){
              if (d.week === "First"){
                  return +d.rating;
              }else{
                  return 0;
              }
          });
          
         
         var ratingInSecond = composite_week_dim.group().reduceSum(function(d){
              if (d.week === "Second"){
                  return +d.rating;
              }else{
                  return 0;
              }
          });
          
           var ratingInThird = composite_week_dim.group().reduceSum(function(d){
              if (d.week === "Third"){
                  return +d.rating;
              }else{
                  return 0;
              }
          });
          
           var ratingInFourth = composite_week_dim.group().reduceSum(function(d){
              if (d.week === "Fourth"){
                  return +d.rating;
              }else{
                  return 0;
              }
          });
          
          var compositeChart = dc.compositeChart('#composite-chart');
          compositeChart
                .width(width_composite_graph)
                .height(400)
                .dimension(composite_week_dim)
                .x(d3.time.scale().domain([minDate, maxDate]))
                .yAxisLabel("Rating")
                .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
                .renderHorizontalGridLines(true)
                .compose([
                    dc.lineChart(compositeChart)
                        .colors('blue')
                        .group(ratingInFirst, 'First'),
                    dc.lineChart(compositeChart)
                        .colors('yellow')
                        .group(ratingInSecond, 'Second'),
                    dc.lineChart(compositeChart)
                        .colors('green')
                        .group(ratingInThird, 'Third'),
                    dc.lineChart(compositeChart)
                        .colors('red')
                        .group(ratingInFourth, 'Fourth')
          
          ])
                         .brushOn(false);
                         
            window.Onresize = function(event){
                var newWidth = document.getElementById('line_annual_customers_feedback').offsetWidth;
                compositeChart.width(newWidth);
    };
}

  
         
         function composite_Month_graph(ndx){
            var composite_date_dim = ndx.dimension(dc.pluck('date'));
            var ratingInJan = composite_date_dim.group().reduceSum(function(d){
              if (d.Month === 'Jan'){
                  return +d.rating;
              }else{
                  return 0;
              }
          });
          
          var ratingInFeb = composite_date_dim.group().reduceSum(function(d){
              if (d.Month === "Feb"){
                  return +d.rating;
              }else{
                  return 0;
              }
          });
          
          var ratingInMar = composite_date_dim.group().reduceSum(function(d){
              if (d.Month === "Mar"){
                  return +d.rating;
              }else{
                  return 0;
              }
          });
          
          var ratingInApr = composite_date_dim.group().reduceSum(function(d){
              if (d.Month === "Apr"){
                  return +d.rating;
              }else{
                  return 0;
              }
          });
          
          var ratingInMay = composite_date_dim.group().reduceSum(function(d){
              if (d.Month === "May"){
                  return +d.rating;
              }else{
                  return 0;
              }
          });
          
          var ratingInJun = composite_date_dim.group().reduceSum(function(d){
              if (d.Month === "Jun"){
                  return +d.rating;
              }else{
                  return 0;
              }
          });
          
          var ratingInJul = composite_date_dim.group().reduceSum(function(d){
              if (d.Month === "Jul"){
                  return +d.rating;
              }else{
                  return 0;
              }
          });
          
          var ratingInAug = composite_date_dim.group().reduceSum(function(d){
              if (d.Month === "Aug"){
                  return +d.rating;
              }else{
                  return 0;
              }
          });
          
          var ratingInSept = composite_date_dim.group().reduceSum(function(d){
              if (d.Month === "Sept"){
                  return +d.rating;
              }else{
                  return 0;
              }
          });
          
          var ratingInOct = composite_date_dim.group().reduceSum(function(d){
              if (d.Month === "Oct"){
                  return +d.rating;
              }else{
                  return 0;
              }
          });
          
          var ratingInNov = composite_date_dim.group().reduceSum(function(d){
              if (d.Month === "Nov"){
                  return +d.rating;
              }else{
                  return 0;
              }
          });
          
          var ratingInDec = composite_date_dim.group().reduceSum(function(d){
              if (d.Month === "Dec"){
                  return +d.rating;
              }else{
                  return 0;
              }
          });
          
          
          var compositeChart_Month = dc.compositeChart('#composite-month');
          compositeChart_Month
                .width(width_composite_Month)
                .height(400)
                .dimension(composite_date_dim)
                .x(d3.time.scale().domain([minDate, maxDate]))
                .yAxisLabel("Rating")
                .legend(dc.legend().x(80).y(20).itemHeight(10).gap(5))
                .renderHorizontalGridLines(true)
                .compose([
                dc.lineChart(compositeChart_Month)
                    .colors('green')
                    .group(ratingInJan, 'Jan'),
                dc.lineChart(compositeChart_Month)
                    .colors('gold')
                    .group(ratingInFeb, 'Feb'),
                dc.lineChart(compositeChart_Month)
                    .colors('red')
                    .group(ratingInMar, 'Mar'),
                dc.lineChart(compositeChart_Month)
                    .colors('orange')
                    .group(ratingInApr, 'Apr'),
                dc.lineChart(compositeChart_Month)
                    .colors('white')
                    .group(ratingInMay, 'May'),
                dc.lineChart(compositeChart_Month)
                    .colors('yellow')
                    .group(ratingInJun, 'Jun'),
                dc.lineChart(compositeChart_Month)
                    .colors('black')
                    .group(ratingInJul, 'Jul'),
                dc.lineChart(compositeChart_Month)
                    .colors('blue')
                    .group(ratingInAug, 'Aug'),
                dc.lineChart(compositeChart_Month)
                    .colors('pink')
                    .group(ratingInSept, 'Sept'),
                dc.lineChart(compositeChart_Month)
                    .colors('purple')
                    .group(ratingInOct, 'Oct'),
                dc.lineChart(compositeChart_Month)
                    .colors('tan')
                    .group(ratingInNov, 'Nov'),
                dc.lineChart(compositeChart_Month)
                    .colors('grey')
                    .group(ratingInDec, 'Dec')
                    ])
                    
                    .brushOn(false)
                    .yAxis().ticks(4);
                    
                    
            window.Onresize = function(event){
                var newWidth = document.getElementById('line_annual_customers_feedback').offsetWidth;
                compositeChart_Month.width(newWidth);
    };
         }
          


    