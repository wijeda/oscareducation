"use strict";

class ScenarioVisualization{

    //constructor(anchorID, btnPlusID, addElementDivID, textBlockElemID, textButtonID, videoBlockElemID, videoButtonID, imgBlockElemID, imgButtonID, mcqBlockElemID, mcqButtonID){
    constructor(json,anchorID,nextButtonID,previousButtonID, blockID){
        this.anchor = document.getElementById(anchorID);
        this.nextButton = document.getElementById(nextButtonID);
        this.nextButton.addEventListener("click", this.nextButtonElement.bind(this), true);
        this.previousButton =  document.getElementById(previousButtonID);
        this.previousButton.addEventListener("click", this.previousButtonElement.bind(this), true);
        this.blockText = document.getElementById(blockID["textBlockID"]);
        this.blockImage = document.getElementById(blockID["imgBlockID"]);
        this.blockVideo = document.getElementById(blockID["videoBlockID"]);
        this.blockMCQ = document.getElementById(blockID["mcqBlockID"]);
        this.index = 0;
        this.elements = json.elements;
        this.tabElementObject = [];
        for(let elem of this.elements){
            if(elem.type == "TextElem"){
                let objectElem = new TextElem(elem, this.blockText, this.anchor);
                this.tabElementObject.push(objectElem);
            }
            else if(elem.type == "ImgElem"){
                let objectElem = new ImageElem(elem, this.blockImage, this.anchor);
                this.tabElementObject.push(objectElem);
            }
            else if(elem.type == "VidElem"){
                let objectElem = new VideoElem(elem, this.blockVideo, this.anchor);
                this.tabElementObject.push(objectElem);
            }
            else if(elem.type == "MCQElem"){
                let objectElem = new MCQElem(elem, this.blockMCQ, this.anchor);
                this.tabElementObject.push(objectElem);
            }
        }
        this.tabElementObject[this.index].render();
    }

    nextButtonElement(){
        if(this.index < this.tabElementObject.length){
            this.tabElementObject[this.index].hide();
            this.index++;
            this.tabElementObject[this.index].render();
        }
    }

    previousButtonElement(){
        if(this.index > 0){
            this.tabElementObject[this.index].hide();
            this.index--;
            this.tabElementObject[this.index].render();
        }
    }
}

function getJsonData(){

    var pathTab = window.location.pathname.split("/")
    var id = pathTab[pathTab.length - 1]

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "/professor/train/data/"+id, false);

    xhr.send(null);
    // done
    if (xhr.readyState == 4 && xhr.status == 200) {
        var myArr = JSON.parse(xhr.responseText);
        console.log(myArr);

        return myArr;
    }
}

// initiation
window.onload = function(){
    let anchorID = "anchor";
    let nextButtonID = "nextElement";
    let previousButtonID = "previousElement";

    let blockID = {"textBlockID":"textBlockElem","imgBlockID":"imgBlockElem","videoBlockID":"videoBlockElem","mcqBlockID":"mcqBlockElem"};
    let json = getJsonData();
    new ScenarioVisualization(json, anchorID, nextButtonID, previousButtonID, blockID);

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
    //  let data = {'creator': 'super_creator',
    //              "titre": "super_titre",
    //              "skill": "super_skill",
    //              "topic": "super_topic",
    //              "grade_level": "super grade",
    //              "instructions": "super_instructions",
    //              "public": "False",
    //              "elements":[{"type": "TextElem", "data":{"title": "JHKNLJHKNL", "content": "my content"}},
    //                          {"type": "TextElem", "data":{"title": "PPPPPPPPPPPPPP", "content": "my new content"}}],
    //      };

     let data_mcq = {"elements": [{"type": "MCQElem", "data":{"title": "MCQ_test_title", "instruction": "MCQ_test_instruction",
                                                            "question": "MCQ_test_question", "answers":[{"answer":"MCQ_test_answer_1"},
                                                                                                        {"answer":"MCQ_test_answer_2"},
                                                                                                        {"answer":"MCQ_test_answer_3"}
                                                                                                        ]
                                                            }
                                }]
                    };
     return data_mcq;

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

function getVideoId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        console.log("ERROR with video URL !")
        return 'error';
    }
}

class AbstractElem{
	constructor(anchor) {
        this.node = document.createElement("div");
        this.node.style.display = "block";
        this.anchor = anchor
		if (new.target === AbstractElem) {
			throw new TypeError("Cannot construct Abstract instances directly");
		}
	}

    render(){
        this.anchor.appendChild(this.node);
    }

    hide(){
        this.anchor.removeChild(this.node);
    }

	delete() {
		throw new Error('You have to implement the method delete');
	}
}

class TextElem extends AbstractElem{
    constructor(elem, skull, anchor){
        // elem is the data to render
        // skull is the node element that is used as a base of this element
        super(anchor);
        if(elem != null)
            this.data = elem["data"];
            this.title = this.data["title"];
            this.content = this.data["content"];
            this.node.innerHTML = skull.innerHTML;
            this.node.getElementsByClassName("titre")[0].innerHTML = this.title;
            this.node.getElementsByClassName("content")[0].innerHTML = this.content;
    }
}

class ImageElem extends AbstractElem{
    constructor(elem, skull, anchor){
        super(anchor);
        if(elem != null){
            this.data = elem["data"];
            this.title = this.data["title"];
            this.content = this.data["url"];
            this.description = this.data["description"];
            this.node.innerHTML = skull.innerHTML;
            this.node.getElementsByClassName("titre")[0].innerHTML = this.title;
            this.node.getElementsByClassName("content")[0].setAttribute("src", this.content);
            this.node.getElementsByClassName("description")[0].innerHTML = this.description;
        }
    }
}

class VideoElem extends AbstractElem{
    constructor(elem, skull, anchor){
        super(anchor);
        if(elem != null){
            this.data = elem["data"];
            this.title = this.data["title"];
            this.content = this.data["url"];
            this.description = this.data["description"];
            this.node.innerHTML = skull.innerHTML;
            this.node.getElementsByClassName("titre")[0].innerHTML = this.title;
            let ID = getVideoId(this.content);
            this.embedURL = "//www.youtube.com/embed/" + ID;
            this.node.getElementsByClassName("content")[0].setAttribute("src", this.embedURL);
            this.node.getElementsByClassName("description")[0].innerHTML = this.description;
        }
    }
}

class MCQElem extends AbstractElem{
    constructor(elem, skull, anchor){
        super(anchor);
        if(elem != null){
            this.data = elem["data"];
            this.title = this.data["title"];
            this.instruction = this.data["instruction"];
            this.question = this.data["question"];
            this.answers = this.data["answers"];
            this.node.innerHTML = skull.innerHTML;
            this.node.getElementsByClassName("titre")[0].innerHTML = this.title;
            this.node.getElementsByClassName("instruction")[0].innerHTML = this.instruction;
            this.node.getElementsByClassName("question")[0].innerHTML = this.question;
            this.Ul = this.node.getElementsByClassName("answers");
            console.log(this.answers[0]);
            for(let answer in this.answers){
                let blocanswer = document.createElement("div");
                blocanswer.innerHTML = this.node.getElementsByClassName("blocanswer")[0].innerHTML;
                console.log(answer[0]);
                blocanswer.getElementsByClassName("answer").innerHTML = answer["answer"];
                blocanswer.getElementsByClassName("isAnswer").checked = false;
                console.log(this.Ul);
                this.Ul[0].appendChild(blocanswer);
            }
        }
    }
}

function loadVideo(elem, embedURL) {
    elem.setAttribute("src", embedURL)
    elem.style.display = "block"
    elem.style.width = "100%"
}
