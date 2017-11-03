"use strict";

class ScenarioVisualization{

    //constructor(anchorID, btnPlusID, addElementDivID, textBlockElemID, textButtonID, videoBlockElemID, videoButtonID, imgBlockElemID, imgButtonID, mcqBlockElemID, mcqButtonID){
    constructor(json,anchorID,nextButtonID,previousButtonID, validateButtonID, endButtonID, blockID){
        this.anchor = document.getElementById(anchorID);
        this.nextButton = document.getElementById(nextButtonID);
        this.nextButton.addEventListener("click", this.nextButtonElement.bind(this), true);
        this.previousButton =  document.getElementById(previousButtonID);
        this.previousButton.addEventListener("click", this.previousButtonElement.bind(this), true);
        this.validateButton = document.getElementById(validateButtonID);
        this.validateButton.addEventListener("click", this.validateButtonElement.bind(this), true);
        this.endButton = document.getElementById(endButtonID);
        this.endButton.addEventListener("click", this.endButtonElement.bind(this), true);
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
        if(this.index < this.tabElementObject.length-1){
            this.tabElementObject[this.index].hide();
            this.index++;
            this.tabElementObject[this.index].render();
            this.previousButton.style.display = "inline";
        }
        if(this.index == this.tabElementObject.length-1){
            this.nextButton.style.display = "none";
            this.endButton.style.display = "inline";
        }
    }

    previousButtonElement(){
        if(this.index > 0){
            this.tabElementObject[this.index].hide();
            this.index--;
            this.tabElementObject[this.index].render();
            this.nextButton.style.display = "inline";
            this.endButton.style.display = "none";
        }
        if(this.index == 0){
            this.previousButton.style.display = "none"
        }
    }

    validateButtonElement(){
        this.tabElementObject[this.index].validate();
    }

    endButtonElement(){
        var pathTab = window.location.pathname.split("/");
        var user_type = pathTab[1];
        if(user_type == "student"){
            window.location.href = "/student/train/student_list_scenario/";
        }else{
            window.location.href = "/professor/train/list_scenario/";
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
    let validateButtonID = "validateElement";
    let endButtonID = "endElement";

    let blockID = {"textBlockID":"textBlockElem","imgBlockID":"imgBlockElem","videoBlockID":"videoBlockElem","mcqBlockID":"mcqBlockElem"};
    let json = getJsonData();
    new ScenarioVisualization(json, anchorID, nextButtonID, previousButtonID, validateButtonID, endButtonID, blockID);

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
        document.getElementById("validateElement").style.display = "none";
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
            for(let answer of this.answers){
                let blocanswer = document.createElement("div");
                blocanswer.innerHTML = this.node.getElementsByClassName("blocanswer")[0].innerHTML;
                blocanswer.classList.add('blocanswer');
                blocanswer.getElementsByClassName("answer")[0].innerHTML = answer["answer"];
                //blocanswer.getElementsByClassName("isAnswer")[0].checked = false;
                this.Ul[0].appendChild(blocanswer);
            }
        }
    }

    render(){
        this.anchor.appendChild(this.node);
        document.getElementById("validateElement").style.display = "block";
    }

    validate(){
        let count = 1;
        let error_number = 0;
        for(let answer of this.answers){
            if(answer["solution"] != this.node.getElementsByClassName("blocanswer")[count].getElementsByClassName("isAnswer")[0].checked){
                error_number++;
                if (answer["solution"]){
                    this.node.getElementsByClassName("blocanswer")[count].getElementsByClassName("isFalse")[0].setAttribute("src", "/static/img/icons/correct.png");
                }else{
                    this.node.getElementsByClassName("blocanswer")[count].getElementsByClassName("isFalse")[0].src = "/static/img/icons/delete.png"
                }
                this.node.getElementsByClassName("blocanswer")[count].getElementsByClassName("isFalse")[0].style.display = "inline-block";
            }
            else{
                if (answer["solution"]){
                    this.node.getElementsByClassName("blocanswer")[count].getElementsByClassName("isFalse")[0].style.display = "inline-block";
                    this.node.getElementsByClassName("blocanswer")[count].getElementsByClassName("isFalse")[0].setAttribute("src", "/static/img/icons/correct.png");
                }else {
                    this.node.getElementsByClassName("blocanswer")[count].getElementsByClassName("isFalse")[0].style.display = "none";
                }

            }
            count++;
        }
        if(error_number > 0){
            this.node.getElementsByClassName("succededMCQ")[0].style.display = "none";
            this.node.getElementsByClassName("failedMCQ")[0].style.display = "block";
        }
        else{
            this.node.getElementsByClassName("failedMCQ")[0].style.display = "none";
            this.node.getElementsByClassName("succededMCQ")[0].style.display = "block";
        }
    }
}

function loadVideo(elem, embedURL) {
    elem.setAttribute("src", embedURL)
    elem.style.display = "block"
    elem.style.width = "100%"
}
