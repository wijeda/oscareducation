"use strict";

class ScenarioVisualization{

    //constructor(anchorID, btnPlusID, addElementDivID, textBlockElemID, textButtonID, videoBlockElemID, videoButtonID, imgBlockElemID, imgButtonID, mcqBlockElemID, mcqButtonID){
    constructor(json,nextButtonID,previousButtonID){
        this.nextButton = document.getElementById(nextButtonID);
        this.nextButton.addEventListener("click", this.nextBlockElement.bind(this), true);
        this.previousButton =  document.getElementById(previousButtonID);
        this.previousButton.addEventListener("click", this.previousBlockElement.bind(this), true);
        this.index = 0;
        this.elements = json.elements;
        this.tabElementObject = [];
        for(let elem of this.elements){
            if(elem.type == TextElem)
        }
    }

    nextButton(){
        this.tabElementObject[this.index].hide();
        this.index++;
        this.tabElementObject[this.index].show();
    }

    previousButton(){
        this.tabElementObject[this.index].hide();
        this.index--;
        this.tabElementObject[this.index].show();
    }

// initiation
window.onload = function(){
    let nextButtonID = "nextElem";
    let previousButtonID = "previousElem"

    let param = {
        "nextButtonID":"nextElem"
        "previousButtonID":"previousElem"
    }
    let json = getForm()
    new ScenarioVisualization(json, nextButtonID, previousButtonID)

};

function getCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        var c_start = document.cookie.indexOf(c_name + "=");
        var c_end;
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
 }

 function getForm() {
     let data = {'creator': 'super_creator',
                 "titre": "super_titre",
                 "skill": "super_skill",
                 "topic": "super_topic",
                 "grade_level": "super grade",
                 "instructions": "super_instructions",
                 "public": "False",
                 "elements":[{"type": "TextElem", "data":{"title": "JHKNLJHKNL", "content": "my content"}},
                             {"type": "TextElem", "data":{"title": "PPPPPPPPPPPPPP", "content": "my content"}}],
         };
     return data;
    //  let data = {}
    //  let listOfParamIDfield = ["creator", "title", "skill", "topic", "grade_level", "instructions", "public"];
     //
    //  for(let id of listOfParamIDfield){
    //      let elem = document.getElementById(id);
    //      data[id] = elem.value;
    //  }
     //
    //  console.log(data);
     //
     //
    //  let data3 = {"creator": "super_creator",
    //              "titre": "super_titre",
    //              "skill": "super_skill",
    //              "topic": "super_topic",
    //              "grade_level": "super grade",
    //              "instructions": "super_instructions",
    //              "public": "False",
    //              "elements":[{"type": "TextElem", "data":{"title": "JHKNLJHKNL", "content": "my content"}},
    //                          {"type": "TextElem", "data":{"title": "PPPPPPPPPPPPPP", "content": "my content"}}],
    //      }
    //      // construct an HTTP request
    //  let xhr = new XMLHttpRequest();
     //
    //  xhr.open("POST", "/professor/train/save_scenario", true);
    //  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    //  xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"))
    //  // send the collected data as JSON
    //  //xhr.send(JSON.stringify(data));
     //
    //  xhr.onloadend = function () {
    //      // done
    //      console.log(data);
    //      console.log("done");
    //  };

 }

function editForm(){
    var pathTab = window.location.pathname.split("/")
    var id = pathTab[pathTab.length - 1]
    console.log("hello")
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "/professor/train/delete_scenario/"+id, false ); // false for synchronous request
    xmlHttp.send( null );
    //return xmlHttp.responseText;
    console.log("hello")
    sendForm();
}

class AbstractElem{
	constructor() {
		if (new.target === Abstract) {
			throw new TypeError("Cannot construct Abstract instances directly");
		}
	}

	render() {
		throw new Error('You have to implement the method render');
	}

	delete() {
		throw new Error('You have to implement the method delete');
	}

	hide()
}
