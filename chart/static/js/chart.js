/*
    Every function must follow the format chart_nameInCamelCase
    TODO ; il faut gerer qund plusieurs questions sont posee; on peut avoir plusieurs reponses, mais pas plusieurs questions
*/

var bars = [[]];
var AxisX = [];
var AxisY = [];
var boardBarChart = [];
var zeroX = [];
var zeroY = [];
var maxX = [];
var maxY = [];
var points = [[]];
var precisionValue = [];
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
	this.bars = [[]];
}

function chart_setPoints()
{
	this.points = [[]];
}

function chart_addBar(bar,which)
{
	this.bars[which].push(bar);
}

function chart_addPoint(point,which)
{
	this.points[which].push(point);
}
function chart_removeBar(which)
{
	this.bars[which].pop();
}

function chart_removePoint(which)
{
	this.points[which].pop();
}

function chart_setAxis(AxisX,AxisY,which)
{
	this.AxisX[which] = AxisX;
	this.AxisY[which] = AxisY;
}

function chart_setOrigin(zX,zY,mX,mY,which)
{
	this.zeroX[which] = zX;
	this.zeroY[which]= zY;
	this.maxX[which]= mX;
	this.maxY[which] = mY;
}

function chart_createBarChartFromForm()
{
	graphics = document.getElementsByClassName("chartQuestionValidation");
	var element;
	for(var i = 0;i<graphics.length;i++)
    {
  		var type = $(graphics[i]).data( "chart-type" );
        console.log(i+' '+graphics.length+' '+type )
		if(type == "barchart")
        {
            var barGraphX = $(".barGraphX").eq(i).val();
            var barGraphY = $(".barGraphY").eq(i).val();

            var stepX = $(".stepX").eq(i).val();
            var stepY = $(".stepY").eq(i).val();

            var zX = parseInt($(".zeroX").eq(i).val());
            var zY = parseInt($(".zeroY").eq(i).val());
            precisionValue = parseFloat($(".precisionValue").eq(i).val());
            if(precisionValue<=0)precisionValue = 1;

            var mX = parseInt($(".maxX").eq(i).val());
            var mY = parseInt($(".maxY").eq(i).val());
            element = graphics[i];

            console.log("test" +i);

        	if(this.points == undefined && this.bars == undefined)
        	{
        		chart_setPoints(i);
        	}
        	chart_setBars(i);
        	chart_setAxis(barGraphX,barGraphY,i);
        	chart_setOrigin(zX,zY,mX,mY,i);

            element.id = "board"+i;
            let board = JXG.JSXGraph.initBoard(element.id,{ id:"barChartFromForm-"+i,axis:false,showCopyright:false, boundingbox: [this.zeroX[i], this.maxY[i], this.maxX[i], this.zeroY[i]]});
            this.boardBarChart[i] = board;
            console.log(this.boardBarChart.length)
        	xaxis = board.create('axis', [[0,0],[1,0]],
        				{name:this.AxisX[i],
        				withLabel:true,
        				label: {
        					position:'rt',
        					offset:[-15,20]
        					}
        				});
        	yaxis = board.create('axis', [[0,0],[0,1]],
        				{name:this.AxisY[i],
        				withLabel:true,
        				label: {
        					position:'rt',
        					offset:[20,0]
        					}
        				});
        	var temp =[];
            if(this.points[i] == undefined) this.points[i] = [];
            if(this.bars[i] == undefined) this.bars[i] = [];
        	for(var j = 0;j<this.points[i].length;j++)
        	{
        		let p = this.boardBarChart[i].create('point',[j+1,this.points[i][j].Y()],{name:'',size:7,face:'^'});
        		temp.push(p);
        	}
        	this.points[i] = temp;
        	for(var j = 0;j<this.points[i].length;j++)
        	{
                this.bars[i].push(getPointValue(this.points[i],j));
            }
            let chart;
            if(this.bars[i] != undefined)
                if(this.bars[i].length >0)
                     char = board.create('chart', [this.bars[i]],
                                {chartStyle:'bar', width:1, labels:this.bars[i],
                                 colorArray:['#8E1B77','#BE1679','#DC1765','#DA2130','#DB311B','#DF4917','#E36317','#E87F1A','#F1B112','#FCF302','#C1E212'], shadow:false});

        }
	}



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
       	var l = [];
       	var bar = [];
       	p = [];
        for(var i = 0;i<l.length;i++){
        	var point = board.create('point', [i+1,l[i]],{name:'',size:7,face:'^'});
        	p.push(point);
        }

        for(var i = 0;i<p.length;i++){
        	bar.push(getPointValue(p,i));
        }
               //	f = function(){ return p.Value();
        	//let chart = board.create('chart',function(){ return p.Value();}
        /*let chart = board.create('chart', [bar],
                {chartStyle:'bar', width:0.8, labels:bar,
                 colorArray:['#8E1B77','#BE1679','#DC1765','#DA2130','#DB311B','#DF4917','#E36317','#E87F1A','#F1B112','#FCF302','#C1E212'], shadow:true});*/

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
function chart_add(element)
{
    var index = $(".btn-addBar").index(element);
    console.log(index+" "+$(".btn-addBar").length);
	var newBarY = parseInt($(".newBarY").eq(index).val());
	var p = this.boardBarChart[index].create('point',[this.bars[index].length+1,newBarY],{name:'',size:7,face:'^'});
	chart_addBar(newBarY,index);
	chart_addPoint(p,index);
    chart_update();
}


function chart_btnUpdate(element)
{
    var index = $(".btn-updateBar").index(element);
    chart_createBarChartFromForm();

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



function chart_changeScopeQuestions(questions)
{
    var counter = 0;
    for(var i = 0;i<questions.length;i++)
    {
        if(questions[i].type == "chart-barchart")
        {

            for(var j = 0;j<questions[i].answers.length;j++)
            {
                questions[i].answers[j].chart = chart_getJSON(counter);
                counter++;
            }
        }
    }

    console.log(questions)
    return questions;
}


function chart_deleteLast(element)
{
    var index = $(".btn-deleteBar").index(element);
    chart_removeBar(index);
    chart_removePoint(index);
    chart_update();
}

function chart_saveInJson()
{
    console.log(char_getJSON());
    return  char_getJSON();

}
function chart_getJSON(index)
{
    pointValue = [];
    if(bars[index] == undefined)bars[index] = [];
    for(var i = 0;i<bars[index].length;i++)
    {
        pointValue.push(bars[index][i]());
    }
    return JSON.stringify({
        "point":pointValue,
        "AxisX":AxisX[index],
        "AxisY":AxisY[index],
        "zeroX":zeroX[index],
        "zeroY":zeroY[index],
        "maxX":maxX[index],
        "maxY":maxY[index],
        "precisionValue":precisionValue[index]
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
