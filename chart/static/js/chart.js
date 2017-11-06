/*
    Every function must follow the format chart_nameInCamelCase
*/

var bars;
var AxisX;
var AxisY;
var boardBarChart;
var zeroX;
var zeroY;
var maxX;
var maxY;
var points;
var precisionValue;
$( document ).ready(function() {
    chart_refresh();
});

function chart_changeInput($scope)
{

    $scope.barGraphX = "abscisses";
    $scope.barGraphY = "ordonnées";
    $scope.stepX = 1;
    $scope.stepY = 1;
    $scope.precisionValue = 1;

    $scope.zeroX = -1;
    $scope.zeroY = -1;
    $scope.maxX = 10;
    $scope.maxY = 10;
}

function chart_refresh()
{
	console.log('refreshed the chart !');
    graphics = document.getElementsByClassName("chartQuestion");  //find all charts on the page
    for(var i = 0;i<graphics.length;i++){
        chart_createChart(graphics[i]);  //create the element founded
    }
    chart_createBarChartFromForm()

}

function chart_setBars()
{
	this.bars = [];
}

function chart_setPoints()
{
	this.points = [];
}

function chart_addBar(bar)
{
	this.bars.push(bar);
}

function chart_addPoint(point)
{
	this.points.push(point);
}
function chart_removeBar()
{
	this.bars.pop();
}

function chart_removePoint()
{
	this.points.pop();
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


	var barGraphX = $("#barGraphX").val();
	var barGraphY = $("#barGraphY").val();

	var stepX = $("#stepX").val();
	var stepY = $("#stepY").val();

	var zX = parseInt($("#zeroX").val());
	var zY = parseInt($("#zeroY").val());
    precisionValue = parseInt($("#precisionValue").val());

	var mX = parseInt($("#maxX").val());
	var mY = parseInt($("#maxY").val());
	if(this.points == undefined && this.bars == undefined)
	{
		chart_setPoints();
	}
	chart_setBars();
	chart_setAxis(barGraphX,barGraphY);
	chart_setOrigin(zX,zY,mX,mY);
	let board = JXG.JSXGraph.initBoard(element.id,{ id:"barChartFromForm",axis:false,showCopyright:false, boundingbox: [this.zeroX, this.maxY, this.maxX, this.zeroY]});
    this.boardBarChart = board;
	xaxis = board.create('axis', [[0,0],[1,0]],
				{name:this.AxisX,
				withLabel:true,
				label: {
					position:'rt',
					offset:[-15,20]
					}
				});
	yaxis = board.create('axis', [[0,0],[0,1]],
				{name:this.AxisY,
				withLabel:true,
				label: {
					position:'rt',
					offset:[20,0]
					}
				});
	var temp =[];
	for(var i = 0;i<this.points.length;i++)
	{
		let p = this.boardBarChart.create('point',[i+1,this.points[i].Y()],{name:'',size:7,face:'^'});
		temp.push(p);
	}
	this.points = temp;
	for(var i = 0;i<this.points.length;i++)
	{
        this.bars.push(getPointValue(this.points,i));
    }
    let chart = board.create('chart', [this.bars],
                {chartStyle:'bar', width:1, labels:this.bars,
                 colorArray:['#8E1B77','#BE1679','#DC1765','#DA2130','#DB311B','#DF4917','#E36317','#E87F1A','#F1B112','#FCF302','#C1E212'], shadow:false});
}

function chart_createChart(element)
{
    console.log('created a chart !');

    var type = $(element).data( "chart-type" );
    var dataArr = $(element).data("chart-percent");
    var board;
    if(type.includes("piechart"))
    {
        board = JXG.JSXGraph.initBoard(element.id, {showNavigation:false, showCopyright:false, boundingbox: [-5, 5, 5, -5]});
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
       	var l = [5,6,9];
       	var bar = [];
       	p = [];
        for(var i = 0;i<l.length;i++){
        	var point = board.createElement('point', [i+1,l[i]],{name:'',size:7,face:'^'});
        	p.push(point);
        }

        for(var i = 0;i<p.length;i++){
        	bar.push(getPointValue(p,i));
        }
               //	f = function(){ return p.Value();
        	//let chart = board.create('chart',function(){ return p.Value();}
        let chart = board.create('chart', [bar],
                {chartStyle:'bar', width:0.8, labels:bar,
                 colorArray:['#8E1B77','#BE1679','#DC1765','#DA2130','#DB311B','#DF4917','#E36317','#E87F1A','#F1B112','#FCF302','#C1E212'], shadow:true});

    }
}

function getPointValue(points,index)
{
	return function(){
		return chart_roundToStep(points[index].Y(),precisionValue);
	}
}
/*

function chart_add()
{
	var newBarY = parseInt($("#newBarY").val());
	var element;
	for(var i = 0;i<graphics.length;i++){
  		var type = $(graphics[i]).data( "chart-type" );
		if(type == "barchart") element = graphics[i];
	}

	var p = this.boardBarChart.create('point',[this.bars.length+1,newBarY],{name:'',size:7,face:'^'});
	chart_addPoint(p);
	chart_addBar(getPointValue(this.points,this.bars.length));

	this.boardBarChart.update();

	this.boardBarChart.suspendUpdate();
    let chart = this.boardBarChart.create('chart', [this.bars],
                {chartStyle:'bar', width:1, labels:this.bars,
                 colorArray:['#8E1B77','#BE1679','#DC1765','#DA2130','#DB311B','#DF4917','#E36317','#E87F1A','#F1B112','#FCF302','#C1E212'], shadow:false});

    this.boardBarChart.unsuspendUpdate();
	console.log('added a bar to the chart !');
}*/
function chart_add()
{
	var newBarY = parseInt($("#newBarY").val());
	var p = this.boardBarChart.create('point',[this.bars.length+1,newBarY],{name:'',size:7,face:'^'});
	chart_addBar(newBarY);
	chart_addPoint(p);
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
    chart_removePoint();
    chart_update();
}

function chart_saveInJson()
{
    return char_getJSON();
}
function char_getJSON()
{
    return JSON.stringify({
        "bars":bars,
        "AxisX":AxisX,
        "AxisY":AxisY,
        "zeroX":zeroX,
        "zeroY":zeroY,
        "maxX":maxX,
        "maxY":maxY,
        "precisionValue":precisionValue
    });
}

function char_loadFromJSON(string )
{
    var object = JSON.parse(string);
    bars = object.bars;
    AxisX = object.AxisX;
    AxisY = object.AxisY;
    zeroX = object.zeroX;
    zeroY = object.zeroY;
    maxX = object.maxX;
    maxY = object.maxY;
    chart_update();
}

function chart_roundToStep(number,step)
{
    var lowest = step * Math.floor(number/step);
    var highest = step * Math.ceil(number/step);
    if(number-lowest > highest-number)return highest;
    return lowest;
}
