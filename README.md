# [PRETEND DASHBOARD]( https://achileachile.github.io/Pretend-Dashboard/)

## PURPOSE:
<i>"Pretend Dashboard"</i> is a project work developed in partial fulfilment for the requirements of
the Interactive Frontend Development by the Code Institute, Ireland.

## BRIEF:
####    CREATE A DATA DASHBOARD:
Build a data dashboard that visualizes a dataset of your choice
Your data can be stored locally (e.g., in a js file) or sourced from an API
Visualise your data using D3.js and dc.js

## TECHNOLOGIES AND DEPENDENCIES
The tehnologies used for the design of this app are:
1. html5: 
    +   It provides the markup language used develop core content and structure of this application.
        +   https://www.w3.org/html/

2. css3:
    +   https://www.w3.org/Style/CSS/
        +   Cascading style sheet 3 is used to style and describe the presentation of the html5 markup in this project
    
3. javaScript:
    +   It is the logic used to manipulate review.json to develop the dashboard.
    +   It is the parent language on which the frameworks used to develop this projects are written e.g d3.js, dc.js, queue.js, crossfilter.js.
    +   It provides the window.Onresize() that is used to offsetWidth of the bars to fit into the size of a new widow.
    +   It is used in conjunction with html to render the chart in the browser
    
4. bootstrap
    +   https://getbootstrap.com/
    +   href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css
        +   it is used to apply the rule of third to the styling of row and column with a view to enhance responsive design
   
5.  Data Driven Documents, d3.js
    +  https://d3js.org/
    +  https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js
        +   It makes use of SVG, HTML5, and CSS standard draw charts and graph from the provided review.json data set data set
        +   It provides the background and platform to run dc.js
6.  Dimensional Charting, dc.js
    +   http://bl.ocks.org/jun9/raw/5631952/
    +   https://cdnjs.cloudflare.com/ajax/libs/dc/2.1.8/dc.js
        +   It leverages d3 to render ther rating charts and graphs in CSS-friendly SVG format from the provided review.json data set
7.  Crossfilter.js
    +   http://square.github.io/crossfilter/
    +   https://cdnjs.cloudflare.com/ajax/libs/crossfilter/1.3.12/crossfilter.min.js
        +   Crossfilter is used visualise the dependencies of the data in the charts. It makes them interactive.
8.  Queue.js
    +   http://bl.ocks.org/mapsam/6090056
    +   https://cdnjs.cloudflare.com/ajax/libs/queue-async/1.0.7/queue.min.js
        +   It uses the defer() to load multiple data from review.json in d3.json format before running the rest of the code
9.  JSON
    +   https://www.json.org/
        +   It provides the format for to store, retrieve and parse data in review.json
10.  Cloud9
    +   https://c9.io/ufedo
        +   It provides the IDE for the development of this project

## ADDITIONAL TECHNOLOGY REQUIRED TO USE APP:
None.
This app is tested on chrome 71.0.3578.98, microsoft edge, and fireforx 64.0., firefox developers edition, android,  iOS is 12.1.4, and the desired result was achieved. No additional technology is required

## REQUIREMENTS TO BUILD APP:
+   SUITABLE IDE e.g cloud9, notepad++

## FEATURES AND USER EXPERIENCE: 
Pretend Dashboard is developed from dataset stored in reveiw.json file, it contains information about how a given organization is rated in a customer feedback survey obtained in 2018.
The dataset is subdivided into the following dimensions-
+   date
+   Month
+   week
+   rating

Each of this dimensions is called by dc.js to plot the graph/chart or pie chart as the case maybe. The dataset is literarily defined by the 'week' dimension. The 'week' is subdivided into four categories
which are passed on under which they values of the rating are distributed, and these are:
+   First 
+   Second
+   Third
+   Fourth

The value of 'First' at any point in time represent the rating in the first week of the Month under review. Consider January for instance, 'First', will indicate the rating in the first week of the
'Month'. 'Second' will also imply the rating for the second week of January and ditto for 'Third' and 'Fourth'. Thus, a Month is given by rating in 'First', 'Second', 'Third' and 'Fourth' as the case
maybe.
The Year 2018 is summed up in twelve months from January to December hence a total of twelve multiply by four weeks.
At the top of the User Interface just below the heading there are two drop down boxes for 'week selector-week' and 'week selector-Month'. The 'week selector-week' provides a list of the following possible
selections and information at initial click on:
+   Select All
+   First: 12
+   Second: 12
+   Third: 12
+   Fourth: 12

This information implies that each of the 'week' category (i.e 'First', 'Second', 'Third' and 'Fourth') contains dataset for twelve distinct rating which corresponding to the weeks of the twelve Months in 
the Year. In other words, there are twelve values for each of the 'week' category in twelve months period.
Similary, the 'week selector-Month', displays the value for each of the Month in the Year under review for example Jan: 1, indicating that there is only one value for January in the data set and this 
is the collection of corresponding values for the 'First', 'Second' 'Third' 'Fourth' for the month of January. This applies to the rest of the Month in through to December.
When a particular Month is selected on the Month distribution of the 'week selector', the value on the corresponding week selector on the week distribution will display as follow:
+   First: 1
+   Second: 1
+   Third: 1
+   Fourth: 1

This implies that each selected Month has one dataset corresponding to each of the category of the 'week'. Thus, when Jan: 1 is selected on the Month distirbution for instance, the drop down box will provides
the user with the four options listed above and then the dashboard will display the corresponding value on each of the chart and graph ploted.
Pretend Dashboard is made of blocks of the following charts and graphs:
1.  A stacked chart for each of the 'week' distribution in the twelve months of 2018
2.  A bar chart showing the gross rating(s) for each of the 'week' category in 2018
3.  A bar chart showing the gross rating(s) for each Month of 2018
4.  The average of the gross customer rating for each 'week(s)' category
5.  The average of the gross customer rating fore each 'Month(s)' category
6.  A Doughnut showing customer rating for each 'week' category
7.  Customer rating per Month pie chart
8.  A Derived dimension pie chart
9.  Scatter plot
10. Vertical line graph showing customer rating for each date in the dataset
11. Line graph plucked on the date dimension for each date of the Year 2018
12. Composite line graph for 'week' dimension
13. Composite line graph for 'Month' dimension



## WIFRAMES
![WireFrames](Readmages/wireframes/wireframe_img.jpg)

## TESTING

### Test Images

#####   Mobile Viewport
![Mobile Viewport Snapshot](Readmages/test_img/mobile_viewport.png "ipad-Pro Viewport Sanpshot")

#####   Desktop and Tablets   
![Desktop && iPad-Pro Viewport Snapshot](Readmages/test_img/desktop_ipad_pro.png "ipad-Pro Viewport Sanpshot")


### Browser Testing and Markup Validation
+ This app is tested on chrome 71.0.3578.98, microsoft edge, and fireforx 64.0., Firefox Developers edition, opera and the desired result was achieved.
+ w3c validator: The html and css file are validated by direct input at https://validator.w3.org/#validate_by_input and the necessary corrections were made.

#### w3c Validation
![w3c css validation image](Readmages/test_img/w3c_css_1.PNG)



 
## DEPLOYMENT:
+   This app was deployed to github at this url [link](https://achileachile.github.io/Pretend-Dashboard/) through the following procedures:
    +   Create github account e.g AchileAchile
    +   pretend-dashboard developed on cloud9 as a master repo, is saved, added and commited to github 
    +   Remote repo known as origin is created for pretend-dashboard on github account AchileAchile
    +   The git push command is used on commandline to share the file between master and origin repository
    +   To publish in github settings, the master branch is selected and saved at the github pages
    


## CREDITS:
+ stackoverflow
    +   https://stackoverflow.com/questions/37937984/git-refusing-to-merge-unrelated-histories-on-rebase
    +   https://stackoverflow.com/questions/16862933/how-to-resolve-gits-not-something-we-can-merge-error
    +  https://help.github.com/articles/dealing-with-non-fast-forward-errors/ 

## ACKNOWLEDGEMENTS:
+   Mozilla Firefox
    + https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_Mode
+   Code Institute: Tutor and Mentor
   








Project Purpose 5,
UX design 4, 
Suitability for purpose 3, 
Navigation 3,
Ease of Use 4, 
Information Architecture 4, 
Responsive Design 3, 
Image Presentation 3,
Colour scheme and typography 2, 
Appropriate use of HTML 3, 
Appropriate use of CSS 4, 
Directory Structure and File Naming 4, 
Version Control 2, 
Testing implementation 2, 
Testing write-up 2, Readme file 3, 
Comments 3, 
Deployment implementation 5, 
Deployment write-up 0


