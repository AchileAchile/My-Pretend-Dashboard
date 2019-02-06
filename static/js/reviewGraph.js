queue()
    .defer(d3.json, "data/review.json")
    .await(pretendGraph);
    
    var minDate, maxDate;
    var width = document.getElementById('stacked_chart_week').offsetWidth;
    var width = document.getElementById('customer_feedback_per_week').offsetWidth;
    var width = document.getElementById('customer_feedback_per_month').offsetWidth;
    var width = document.getElementById('average_rating_week').offsetWidth;
    var width = document.getElementById('average_rating_month').offsetWidth;
    var width = document.getElementById('scatter-plot').offsetWidth;
    var width = document.getElementById('date_annual_customers_feedback_chart').offsetWidth;
    var width = document.getElementById('line_annual_customers_feedback').offsetWidth;
    var width = document.getElementById('composite-chart').offsetWidth;
    var width = document.getElementById('composite-month').offsetWidth;
    
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
//    feedback_Month(ndx);
 //   average_rating_week(ndx);
 //   average_average_Month(ndx);
 //   pie_week(ndx);
  //  pie_Month(ndx);
  //  pie_derived(ndx);
   // scatter_plot(ndx);
   // date_feedback_chart(ndx);
  //  line_feedback_graph(ndx);
  //  composite_week_graph(ndx);
   // composite_Month_graph(ndx);
    
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
            .width(width)
            .height(250)
            .dimension(stacked_Month_dim)
            .group(First_week_stacked, "First Wks")
            .stack(Second_week_stacked, "Sec Wks")
            .stack(Third_week_stacked, "Third Wks")
            .stack(Fourth_week_stacked, "Fourth Wks")
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .legend(dc.legend().x(420).y(0).itemHeight(15).gap(5))
            .margins({top: 10, right: 100, bottom: 30, left: 30});
    week_stackedChart.margins().right = 100;
    
    
    window.onresize = function(event){
        var newWidth = document.getElementById('#stacked_chart_week').offsetWidth;
        week_stackedChart.width(newWidth);
    };
}
