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

    var type = $(element).data( "graph-type" );

    if(type == "pie chart")
    {
        var dataArr = [30,16,14,10,10,8,6,6];
        var board = JXG.JSXGraph.initBoard(element.id, {showNavigation:false, showCopyright:false, boundingbox: [-5, 5, 5, -5]});
        board.containerObj.style.backgroundColor = 'white';
        board.options.label.strokeColor = 'black';
        board.suspendUpdate();
        var a = board.createElement('chart', dataArr,
            {chartStyle:'pie',
             colors:['#0F408D','#6F1B75','#CA147A','#DA2228','#E8801B','#FCF302','#8DC922','#15993C','#87CCEE','#0092CE'],
             fillOpacity:0.8, center:[0,0], strokeColor:'black', highlightStrokeColor:'black', strokeWidth:1,
             labels:['War games','Sport games', 'Old games','Strategy games', '3D games', 'Puzzle games','Board games', 'I do not play games'],
             highlightColors:['#E46F6A','#F9DF82','#F7FA7B','#B0D990','#69BF8E','#BDDDE4','#92C2DF','#637CB0','#AB91BC','#EB8EBF'],
             highlightOnSector:true,
             highlightBySize:true
            }
        );
        board.unsuspendUpdate();
    }
}
