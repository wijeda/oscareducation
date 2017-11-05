/*
    Every function must follow the format chart_nameInCamelCase

*/

var bars= [];
var AxisX;
var AxisY;
var boardBarChart;
var zeroX;
var zeroY;
var maxX;
var maxY;
$( document ).ready(function() {
    chart_refresh();
});

function chart_refresh()
{
	console.log('refreshed the chart !');
    graphics = document.getElementsByClassName("chartQuestion");  //find all charts on the page
    for(var i = 0;i<graphics.length;i++){
        chart_createChart(graphics[i]);  //create the element founded
    }

}

function chart_setBars()
{
}


function chart_addBar(bar)
{
	this.bars.push(bar);
}

function chart_removeBar(bar)
{
	this.bars.pop();
}

function chart_setAxis(AxisX,AxisY)
{
	this.AxisX = AxisX;
	this.AxisY = AxisY;
}

function chart_setOrigin(zX,zY,mX,mY)
{
	this.zeroX = zX;
	this.zeroY = zY;
	this.maxX = mX;
	this.maxY = mY;
}

function chart_createBarChartFromForm()
{
	graphics = document.getElementsByClassName("chartQuestion");
	var element;
	for(var i = 0;i<graphics.length;i++){
  		var type = $(graphics[i]).data( "chart-type" );
		if(type == "barchart") element = graphics[i];
	}

    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

	var barGraphX = $("#barGraphX").val();
	var barGraphY = $("#barGraphY").val();

	var stepX = $("#stepX").val();
	var stepY = $("#stepY").val();

	var zX = $("#zeroX").val();
	var zY = $("#zeroY").val();

	var mX = $("#maxX").val();
	var mY = $("#maxY").val();
	chart_setBars();
	chart_setAxis(barGraphX,barGraphY);
	chart_setOrigin(zX,zY,mX,mY);
	let board = JXG.JSXGraph.initBoard(element.id,{ id:"barChartFromForm",axis:false,showCopyright:false, boundingbox: [this.zeroX, this.maxY, this.maxX, this.zeroY]});
    this.boardBarChart = board;
	xaxis = board.create('axis', [[0,0],[1,0]],
				{name:AxisX,
				withLabel:true,
				label: {
					position:'rt',
					offset:[-15,20]
					}
				});
	yaxis = board.create('axis', [[0,0],[0,1]],
				{name:AxisY,
				withLabel:true,
				label: {
					position:'rt',
					offset:[20,0]
					}
				});
    let chart = board.create('chart', this.bars,
                {chartStyle:'bar', width:1, labels:this.bars,
                 colorArray:['#8E1B77','#BE1679','#DC1765','#DA2130','#DB311B','#DF4917','#E36317','#E87F1A','#F1B112','#FCF302','#C1E212'], shadow:false});
}

function chart_createChart(element)
{
    console.log('created a chart !');

    var type = $(element).data( "chart-type" );
    var dataArr = $(element).data("chart-percent");

    if(type == "piechart")
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
    if(type == "barchart")
    {

        let board = JXG.JSXGraph.initBoard(element.id, { axis:true,showCopyright:false, boundingbox: [-1, 5, 5, -1]});
        let chart = board.create('chart', [12,23],
                {chartStyle:'bar', width:0.8, labels:[12,23],
                 colorArray:['#8E1B77','#BE1679','#DC1765','#DA2130','#DB311B','#DF4917','#E36317','#E87F1A','#F1B112','#FCF302','#C1E212'], shadow:true});

    }
}
function chart_add()
{
	var newBarY = parseInt($("#newBarY").val());
	chart_addBar(newBarY);
    chart_update();
}

function chart_update()
{
/*
    var element;
    for(var i = 0;i<graphics.length;i++){
        var type = $(graphics[i]).data( "chart-type" );
        if(type == "barchart") element = graphics[i];
    }
	this.boardBarChart.update();

	this.boardBarChart.suspendUpdate();
    let chart = this.boardBarChart.create('chart', this.bars,
                {chartStyle:'bar', width:1, labels:this.bars,
                 colorArray:['#8E1B77','#BE1679','#DC1765','#DA2130','#DB311B','#DF4917','#E36317','#E87F1A','#F1B112','#FCF302','#C1E212'], shadow:false});
    this.boardBarChart.unsuspendUpdate();
	console.log('added a bar to the chart !');*/
    chart_createBarChartFromForm();

}
function chart_deleteLast()
{
    chart_removeBar();
    chart_update();
}
