"use strict";

class ScenarioVisualization{

    //constructor(anchorID, btnPlusID, addElementDivID, textBlockElemID, textButtonID, videoBlockElemID, videoButtonID, imgBlockElemID, imgButtonID, mcqBlockElemID, mcqButtonID){
    constructor(json,nextButtonID,previousButtonID){
        this.nextButton = document.getElementById(nextButtonID);
        this.nextButton.addEventListener("click", this.nextButtonElement.bind(this), true);
        this.previousButton =  document.getElementById(previousButtonID);
        this.previousButton.addEventListener("click", this.previousButtonElement.bind(this), true);
        this.index = 0;
        this.elements = json.elements;
        this.tabElementObject = [];
        console.log("Check");
        for(let elem of this.elements){
            console.log(elem);
            if(elem.type == "TextElem"){
                let objectElem = new TextElem(elem);
                this.tabElementObject.push(objectElem);
            }
            else if(elem.type == "ImageElem"){
                let objectElem = new ImageElem(elem);
                this.tabElementObject.push(objectElem);
            }
        }
        this.tabElementObject[this.index].render();
    }

    nextButtonElement(){
        console.log("Check next Button");
        // this.tabElementObject[this.index].hide();
        if(this.index < this.tabElementObject.lenght
        this.index++;
        this.tabElementObject[this.index].render();
    }

    previousButtonElement(){
        // this.tabElementObject[this.index].hide();
        if(this.index > 0){
            this.index--;
            this.tabElementObject[this.index].render();
        }
    }
}


// initiation
window.onload = function(){
    let nextButtonID = "nextElement";
    let previousButtonID = "previousElement";

    console.log("Check");
    let json = getForm();
    new ScenarioVisualization(json, nextButtonID, previousButtonID);

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
		if (new.target === AbstractElem) {
			throw new TypeError("Cannot construct Abstract instances directly");
		}
	}

	render() {
		throw new Error('You have to implement the method render');
	}

	delete() {
		throw new Error('You have to implement the method delete');
	}

	hide(){
		throw new Error('You have to implement the method hide');
    }
}

class TextElem extends AbstractElem{
    constructor(elem){
        super();
        if(elem != null)
            console.log(elem);
            console.log(elem["data"]);
            this.data = elem["data"];
            this.title = this.data["title"];
            this.content = this.data["content"];
    }

    render(){
        let newTitle = document.getElementsByTagName("h2");
        console.log(newTitle);
        newTitle[0].innerHTML = this.title;
        // there is too much div, so we take the name "contentBlock" of our block div
        let newContent = document.getElementsByName("contentBlock")[0];
        console.log(newContent);
        newContent.innerHTML = this.content;
    }
}
