/*
    Every function must follow the format graph_nameInCamelCase

*/

$( document ).ready(function() {
    graph_refresh();
});

function graph_refresh()
{
    graphics = document.getElementsByClassName("graphQuestion");  //find all graphs on the page
    for(var i = 0;i<graphics.length;i++){
        graph_createChart(graphics[i]);  //create the element founded
    }

}

function graph_createChart(element)
{
    console.log('created a graph !');

}
