/*
    Every function must follow the format chart_nameInCamelCase

*/

$( document ).ready(function() {
    chart_refresh();
});

function chart_refresh()
{
    graphics = document.getElementsByClassName("chartQuestion");  //find all charts on the page
    for(var i = 0;i<graphics.length;i++){
        chart_createChart(graphics[i]);  //create the element founded
    }

}

function chart_saveInJson(questions)
{
    for(var i = 0; i<questions.length;i++){
        //alert(JSON.stringify(questions[i], null, 4));
        if(questions[i].startsWith('chart')){

        }
    }
}

function chart_createChart(element)
{
    console.log('created a chart !');

    var type = $(element).data( "chart-type" );
    var dataArr = $(element).data("chart-percent");

    if(type.includes("piechart"))
    {
        let board = JXG.JSXGraph.initBoard(element.id, {showNavigation:false, showCopyright:false, boundingbox: [-5, 5, 5, -5]});
        board.containerObj.style.backgroundColor = 'white';
        board.options.label.strokeColor = 'black';
        board.suspendUpdate();
        let a = board.create('chart', dataArr,
            {chartStyle:'pie',
             colors:['#0F408D','#6F1B75','#CA147A','#DA2228','#E8801B','#FCF302','#8DC922','#15993C','#87CCEE','#0092CE'],
             fillOpacity:0.8, center:[0,0], strokeColor:'black', highlightStrokeColor:'black', strokeWidth:1,
             labels:$(element).data("chart-label"),
             highlightColors:['#E46F6A','#F9DF82','#F7FA7B','#B0D990','#69BF8E','#BDDDE4','#92C2DF','#637CB0','#AB91BC','#EB8EBF'],
             highlightOnSector:true,
             highlightBySize:true
            }
        );
        board.unsuspendUpdate();
    }
    if(type.includes("barchart"))
    {

        let board = JXG.JSXGraph.initBoard(element.id, { axis:true,showCopyright:false, boundingbox: [-1, 5, 5, -1]});
        let chart = board.create('chart', [12,23],
                {chartStyle:'bar', width:0.8, labels:[12,23],
                 colorArray:['#8E1B77','#BE1679','#DC1765','#DA2130','#DB311B','#DF4917','#E36317','#E87F1A','#F1B112','#FCF302','#C1E212'], shadow:true});


    }
}
