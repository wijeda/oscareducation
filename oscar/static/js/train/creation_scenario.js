"use strict";

class ScenarioCreation {

    //constructor(anchorID, btnPlusID, addElementDivID, textBlockElemID, textButtonID, videoBlockElemID, videoButtonID, imgBlockElemID, imgButtonID, mcqBlockElemID, mcqButtonID){
    constructor(param){
        this.anchor = document.getElementById(param.anchorID);
        this.btnPlus = document.getElementById(param.btnPlusID);
        this.addElementDiv = document.getElementById(param.addElementDivID);
        this.addElementOption = false; // at start it is not shown
        this.btnPlus.addEventListener("click", this.showDiffElements.bind(this), true);

        this.textBlockElem = document.getElementById(param.textBlockElemID);
        this.textButton = document.getElementById(param.textButtonID);
        this.textButton.addEventListener("click", this.makeBlockElemText.bind(this), true);

        this.videoBlockElem = document.getElementById(param.videoBlockElemID);
        this.videoButton = document.getElementById(param.videoButtonID);
        this.videoButton.addEventListener("click", this.makeBlockElemVideo.bind(this), true);

        this.imgBlockElem = document.getElementById(param.imgBlockElemID);
        this.imgButton = document.getElementById(param.imgButtonID);
        this.imgButton.addEventListener("click", this.makeBlockElemImg.bind(this), true);


        this.mcqBlockElem = document.getElementById(param.mcqBlockElemID);
        this.mcqButton = document.getElementById(param.mcqButtonID);
        this.mcqButton.addEventListener("click", this.makeBlockElemMcq.bind(this), true);

        this.saveScenarioButton = document.getElementById(param.saveScenarioButtonID);
        this.saveScenarioButton.addEventListener("click", this.sendForm.bind(this), true);
    }

    makeBlockElemText(){
        let newelem = document.createElement("div");
        newelem.classList.add('textBlockElem');
        newelem.innerHTML = this.textBlockElem.innerHTML;
        this.anchor.appendChild(newelem);
    }

    makeBlockElemImg(){
        let newelem = document.createElement("div")
        newelem.classList.add('imgBlockElem');
        newelem.innerHTML = this.imgBlockElem.innerHTML;
        this.anchor.appendChild(newelem);
    }

    makeBlockElemVideo(){
        let newelem = document.createElement("div");
        newelem.classList.add('videoBlockElem');
        newelem.innerHTML = this.videoBlockElem.innerHTML;
        this.anchor.appendChild(newelem);
    }

    makeBlockElemMcq(){
        //TODO remplacer par QCM
        let newelem = document.createElement("div");
        newelem.classList.add('mcqBlockElem');
        newelem.innerHTML = this.mcqBlockElem.innerHTML;
        this.anchor.appendChild(newelem);
        newelem.style.display = "block";
    }

    showDiffElements(){
        if(this.addElementOption) {
            this.addElementDiv.style.display = "none";
        }else {
            this.addElementDiv.style.display = "block";
        }

        this.addElementOption = !this.addElementOption

    }

    getElemInputBlockText(elemText){
        let title = elemText.childNodes[1].childNodes[3].value;
        let content = elemText.childNodes[1].childNodes[9].value;
        return {"type":"TextElem", "data":{"title": title, "content": content}}
    }

    getElemInputBlockImage(elemImage){
        let title = elemImage.childNodes[1].childNodes[3].value;
        let url = elemImage.childNodes[1].childNodes[9].childNodes[7].value
        let description = elemImage.childNodes[1].childNodes[11].childNodes[3].value;
        return {"type":"ImgElem", "data":{"title": title, "url": url, "description" : description}}
    }

    getElemInputBlockVideo(elemVideo){
        let title = elemVideo.childNodes[1].childNodes[3].value;
        let url = elemVideo.childNodes[1].childNodes[9].childNodes[7].value
        let description = elemVideo.getElementsByClassName('description')[0].value
        return {"type":"VidElem", "data":{"title": title, "url": url, "description" : description}}
    }
    getElemInputBlockMCQ(elemMCQ){

        let title = elemMCQ.getElementsByClassName('titre_MCQ_Elem')[0].value;
        let instruction = elemMCQ.getElementsByClassName('instruction_MCQ_Elem')[0].value;
        let question = elemMCQ.getElementsByClassName('question_MCQ_Elem')[0].value;
        let answers = [];
        for (let elem of elemMCQ.childNodes[1].childNodes[21].childNodes){
             if(elem.className == "repLine"){
                    let reponse = elem.childNodes[3].value;
                    let checked = elem.childNodes[5].checked;
                    answers.push({"answer": reponse, "solution": checked});
             }
        }
        return {"type":"MCQElem", "data":{"title": title, "instruction": instruction, "question": question, "answers" : answers}}

    }


    sendForm() {

        let data = {};
        let listOfParamIDfield = ["creator", "title", "skill", "topic", "grade_level", "instructions", "public"];

        for(let id of listOfParamIDfield){
            let elem = document.getElementById(id);
            data[id] = elem.value;
        }

        data["elements"] = []

        for(let i = 5; i < this.anchor.childNodes.length; i++)
        {

            let classElem = this.anchor.childNodes[i].className

            if(classElem == "textBlockElem")
            {
                data["elements"].push(this.getElemInputBlockText(this.anchor.childNodes[i]));
            }
            else if(classElem == "videoBlockElem")
            {
                data["elements"].push(this.getElemInputBlockVideo(this.anchor.childNodes[i]));
            }
            else if(classElem == "imgBlockElem")
            {
                data["elements"].push(this.getElemInputBlockImage(this.anchor.childNodes[i]));
            }
            else if(classElem =="mcqBlockElem")
            {
                data["elements"].push(this.getElemInputBlockMCQ(this.anchor.childNodes[i]));
            }



        }

        // construct an HTTP request

        let xhr = new XMLHttpRequest();

        xhr.open("POST", "/professor/train/save_scenario", true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"))
        // send the collected data as JSON
        xhr.send(JSON.stringify(data));

        xhr.onloadend = function () {
            window.location.href = "http://127.0.0.1:8000/professor/train/list_scenario/";
        };

    }


}

function loadImage(elem){
    var root = elem.parentNode.childNodes;
    root[1].setAttribute("src", root[7].value);
    return false;
}

function loadVideo(elem){
    var root = elem.parentNode.childNodes;
    var ID = getVideoId(root[7].value);
    var embedURL = "//www.youtube.com/embed/" + ID
    root[1].setAttribute("src", embedURL);
    root[1].style.display = "block"
    return false;
}

// Transforms the video URL into its embed version for better hosting support
function getVideoId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}

function addReponse(elem){
    var root = elem.parentNode.parentNode;
    let count = 0;
    let repLineElem = null;
    for(let subElem of root.getElementsByClassName('list_answers')[0].childNodes){
        if (subElem.className == "repLine"){
            count++;
            if(repLineElem == null){
                repLineElem = subElem;
            }
        }
    }
    if (count < 4) {
        let newelem = document.createElement("div");
        newelem.classList.add('repLine');
        newelem.innerHTML = repLineElem.innerHTML;
        let txt = repLineElem.getElementsByClassName('labelanswer')[0].innerHTML;
        newelem.getElementsByClassName('labelanswer')[0].innerHTML = txt.substring(0,txt.length -2) + (count +1) +':';
        newelem.getElementsByClassName('removeReponse')[0].style.display = "inline";
        root.getElementsByClassName('list_answers')[0].appendChild(newelem);
    }

    //root.parentNode.removeChild(root);
    return false;
}

function removeElem(elem){
    var root = elem.parentNode.parentNode;
    root.parentNode.removeChild(root);
    return false;
}
function removeReponse(elem){
    var root = elem.parentNode;
    root.parentNode.removeChild(root);
    return false;
}

// initiation
window.onload = function(){
    let btnPlusID = "addElement"; //document.getElementById("addElement");
    let anchorID = 'whiteBox';
    let addElementDivID = 'addElementDiv';

    let textBlockElemID = "textBlockElem";
    let textButtonID = "addElementTxt";

    let videoBlockElemID = "videoBlockElem";
    let videoButtonID = "addElementVideo";
    let loadVidID = "loadVideo";
    let loadVidButtonID = "addVid";

    let mcqBlockElemID = "mcqBlockElem";
    let mcqButtonID = "addElementMcq";

    let imgBlockElemID = "imgBlockElem";
    let imgButtonID = "addElementImg";

    let loadImgID = "loadImage";
    let loadImgButtonID = "addImg";

    let removeImageID = "removeImage";

    let saveScenarioButtonID = "saveScenario";

    let param = {
        "btnPlusID":"addElement",
        "anchorID":"whiteBox",
        "addElementDivID": "addElementDiv",
        "textBlockElemID": "textBlockElem",
        "textButtonID": "addElementTxt",

        "videoBlockElemID": "videoBlockElem",
        "videoButtonID": "addElementVideo",
        /*"loadVidID": "loadVideo",
        "loadVidButtonID": "addVid",*/

        "mcqBlockElemID": "mcqBlockElem",
        "mcqButtonID": "addElementMcq",

        "imgBlockElemID": "imgBlockElem",
        "imgButtonID": "addElementImg",
        "saveScenarioButtonID": "saveScenario"

        /*"loadImgID": "loadImage",
        "loadImgButtonID": "addImg",

        "removeImageID": "removeImage",*/
    }

    /*new ScenarioCreation(anchorID,
                        btnPlusID,
                        addElementDivID,
                        textBlockElemID,
                        textButtonID,
                        videoBlockElemID,
                        videoButtonID,
                        imgBlockElemID,
                        imgButtonID,
                        mcqBlockElemID,
                        mcqButtonID);*/
    new ScenarioCreation(param)

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
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "/professor/train/delete_scenario/"+id, false ); // false for synchronous request
    xmlHttp.send( null );
    //return xmlHttp.responseText;
    sendForm();
}
