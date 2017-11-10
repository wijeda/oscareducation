"use strict";

class ScenarioCreation {

    //constructor(anchorID, btnPlusID, addElementDivID, textBlockElemID, textButtonID, videoBlockElemID, videoButtonID, imgBlockElemID, imgButtonID, mcqBlockElemID, mcqButtonID){
    constructor(param){
        this.data = this.getJsonData();

        this.anchor = document.getElementById(param.anchorID);
        this.btnPlus = document.getElementById(param.btnPlusID);
        this.addElementDiv = document.getElementById(param.addElementDivID);
        this.DiffElem = document.getElementById(param.DiffElem);
        this.addElementOption = false; // at start it is not shown
        this.DiffElem.addEventListener("mouseover", this.showDiffElements.bind(this));
        this.DiffElem.addEventListener("mouseout", this.hideDiffElements.bind(this));


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

        this.pdfBlockElem = document.getElementById(param.pdfBlockElemID);
        this.pdfButton = document.getElementById(param.pdfButtonID);
        this.pdfButton.addEventListener("click", this.makeBlockElemPDF.bind(this), true);

        this.saveScenarioButton = document.getElementById(param.saveScenarioButtonID);
        this.saveScenarioButton.addEventListener("click", this.sendForm.bind(this), true);

        this.sideNavBar = document.getElementById(param.sideNavBar) ;
        this.textBlockNav = document.getElementById(param.idTextElemNav);
        this.videoBlockNav = document.getElementById(param.idVideoElemNav);
        this.mcqBlockNav = document.getElementById(param.idMCQElemNav);
        this.imgBlockNav = document.getElementById(param.idImgElemNav);

        this.fillPage();
    }

    makeBlockElemText(){
        let newelem = document.createElement("div");
        newelem.classList.add('textBlockElem');
        newelem.innerHTML = this.textBlockElem.innerHTML;
        this.anchor.appendChild(newelem);

        let newNavElem = document.createElement("div");
        newNavElem.classList.add('divElemNav');
        newNavElem.innerHTML = this.textBlockNav.innerHTML;

        let newOrangeLine = document.createElement("div");
        newOrangeLine.classList.add('ligneorangefine');
        this.sideNavBar.appendChild(newOrangeLine);
        this.sideNavBar.appendChild(newNavElem);
    }

    makeBlockElemImg(){
        let newelem = document.createElement("div")
        newelem.classList.add('imgBlockElem');
        newelem.innerHTML = this.imgBlockElem.innerHTML;
        this.anchor.appendChild(newelem);

        let newNavElem = document.createElement("div");
        newNavElem.classList.add('divElemNav');
        newNavElem.innerHTML = this.imgBlockNav.innerHTML;

        let newOrangeLine = document.createElement("div");
        newOrangeLine.classList.add('ligneorangefine');
        this.sideNavBar.appendChild(newOrangeLine);
        this.sideNavBar.appendChild(newNavElem);
    }

    makeBlockElemVideo(){
        let newelem = document.createElement("div");
        newelem.classList.add('videoBlockElem');
        newelem.innerHTML = this.videoBlockElem.innerHTML;
        this.anchor.appendChild(newelem);

        let newNavElem = document.createElement("div");
        newNavElem.classList.add('divElemNav');
        newNavElem.innerHTML = this.videoBlockNav.innerHTML;

        let newOrangeLine = document.createElement("div");
        newOrangeLine.classList.add('ligneorangefine');
        this.sideNavBar.appendChild(newOrangeLine);
        this.sideNavBar.appendChild(newNavElem);
    }

    makeBlockElemPDF(){
        let newelem = document.createElement("div");
        newelem.classList.add('pdfBlockElem');
        newelem.innerHTML = this.pdfBlockElem.innerHTML;
        this.anchor.appendChild(newelem);
    }

    makeBlockElemMcq(){
        //TODO remplacer par QCM
        let newelem = document.createElement("div");
        newelem.classList.add('mcqBlockElem');
        newelem.innerHTML = this.mcqBlockElem.innerHTML;
        this.anchor.appendChild(newelem);
        newelem.style.display = "block";

        let newNavElem = document.createElement("div");
        newNavElem.classList.add('divElemNav');
        newNavElem.innerHTML = this.mcqBlockNav.innerHTML;

        let newOrangeLine = document.createElement("div");
        newOrangeLine.classList.add('ligneorangefine');
        this.sideNavBar.appendChild(newOrangeLine);
        this.sideNavBar.appendChild(newNavElem);
    }

    showDiffElements(){
        this.addElementDiv.style.display = "block";
    }

    hideDiffElements(){
        this.addElementDiv.style.display = "none";
    }

    getElemInputBlockText(elemText){
        // let title = elemText.childNodes[1].childNodes[3].value;
        // let content = elemText.childNodes[1].childNodes[6].value;
        // console.log(elemText.getElementsByClassName('titre_text_Elem'));
        let title = elemText.getElementsByClassName('titre_text_Elem')[0].value;
        let content = elemText.getElementsByClassName('desc_text_Elem')[0].value;
        return {"type":"TextElem", "data":{"title": title, "content": content}}
    }

    getElemInputBlockImage(elemImage){
        // let title = elemImage.childNodes[1].childNodes[3].value;
        // let url = elemImage.childNodes[1].childNodes[9].value;
        // let description = elemImage.childNodes[1].childNodes[11].value;
        let title = elemImage.getElementsByClassName('title_img')[0].value;
        let url = elemImage.getElementsByClassName('url_img_Elem')[0].value;
        let description = elemImage.getElementsByClassName('desc_img_Elem')[0].value;
        return {"type":"ImgElem", "data":{"title": title, "url": url, "description" : description}}
    }

    getElemInputBlockVideo(elemVideo){
        // let title = elemVideo.childNodes[1].childNodes[3].value;
        // let url = elemVideo.childNodes[1].childNodes[9].childNodes[7].value
        // let description = elemVideo.getElementsByClassName('description')[0].value
        let title = elemVideo.getElementsByClassName('titre_vid_Elem')[0].value;
        let url = elemVideo.getElementsByClassName('url_vid_Elem')[0].value;
        let description = elemVideo.getElementsByClassName('desc_vid_Elem')[0].value;
        return {"type":"VidElem", "data":{"title": title, "url": url, "description" : description}}
    }

    getElemInputBlockPDF(elemPDF){
        // let title = elemPDF.childNodes[1].childNodes[3].value;
        // let url = elemPDF.childNodes[1].childNodes[9].childNodes[7].value
        // let description = elemPDF.getElementsByClassName('description')[0].value
        let title = elemPDF.getElementsByClassName('titre_pdf_Elem')[0].value;
        let url = elemPDF.getElementsByClassName('url_pdf_Elem')[0].value;
        let description = elemPDF.getElementsByClassName('desc_pdf_Elem')[0].value;
        return {"type":"PDFElem", "data":{"title": title, "url": url, "description" : description}}
    }

    getElemInputBlockMCQ(elemMCQ){

        let title = elemMCQ.getElementsByClassName('titre_MCQ_Elem')[0].value;
        let instruction = elemMCQ.getElementsByClassName('instruction_MCQ_Elem')[0].value;
        let question = elemMCQ.getElementsByClassName('question_MCQ_Elem')[0].value;
        let answers = [];
        // for (let elem of elemMCQ.childNodes[1].childNodes[21].childNodes){
        //      if(elem.className == "repLine"){
        //             let reponse = elem.childNodes[3].value;
        //             let checked = elem.childNodes[5].checked;
        //             answers.push({"answer": reponse, "solution": checked});
        //      }
        // }

        for (let elem of elemMCQ.getElementsByClassName('list_answers')){
             if(elem.className == "repLine"){
                    let reponse = elem.childNodes[3].value;
                    let checked = elem.childNodes[5].checked;
                    answers.push({"answer": reponse, "solution": checked});
             }
        }
        return {"type":"MCQElem", "data":{"title": title, "instruction": instruction, "question": question, "answers" : answers}}

    }

    // get the JSON data when editing in order to retrieve the elements
    getJsonData(){

        var pathTab = window.location.pathname.split("/")
        var id = pathTab[pathTab.length - 1]

        let xhr = new XMLHttpRequest();

        xhr.open("GET", "/professor/train/data/"+id, false);

        xhr.send(null);
        // done
        if (xhr.readyState == 4 && xhr.status == 200) {
            var myArr = JSON.parse(xhr.responseText);

            return myArr;
        }
    }

    // make a filled element
    makeFilledText(index){
        let newelem = document.createElement("div");
        newelem.classList.add('textBlockElem');
        newelem.innerHTML = this.textBlockElem.innerHTML;
        newelem.getElementsByClassName('titre_text_Elem')[0].value = this.data["elements"][index]["data"]["title"]
        newelem.getElementsByClassName('desc_text_Elem')[0].value = this.data["elements"][index]["data"]["content"]
        this.anchor.appendChild(newelem);
    }

    makeFilledImg(index){
        let newelem = document.createElement("div")
        newelem.classList.add('imgBlockElem');
        newelem.innerHTML = this.imgBlockElem.innerHTML;
        newelem.getElementsByClassName('title_img')[0].value = this.data["elements"][index]["data"]["title"]
        newelem.getElementsByClassName('url_img_Elem')[0].value = this.data["elements"][index]["data"]["url"]
        newelem.getElementsByClassName('desc_img_Elem')[0].value = this.data["elements"][index]["data"]["description"]
        newelem.getElementsByClassName('imgprev')[0].setAttribute("src", this.data["elements"][index]["data"]["url"]);
        this.anchor.appendChild(newelem);
    }

    makeFilledVid(index){
        let newelem = document.createElement("div");
        newelem.classList.add('videoBlockElem');
        newelem.innerHTML = this.videoBlockElem.innerHTML;
        newelem.getElementsByClassName('titre_vid_Elem')[0].value = this.data["elements"][index]["data"]["title"]
        newelem.getElementsByClassName('url_vid_Elem')[0].value = this.data["elements"][index]["data"]["url"]
        newelem.getElementsByClassName('desc_vid_Elem')[0].value = this.data["elements"][index]["data"]["description"]
        loadVideo(newelem.getElementsByClassName('addVid')[0])
        this.anchor.appendChild(newelem);
    }

    makeFilledPDF(index){
        let newelem = document.createElement("div");
        newelem.classList.add('pdfBlockElem');
        newelem.innerHTML = this.pdfBlockElem.innerHTML;
        newelem.getElementsByClassName('titre_pdf_Elem')[0].value = this.data["elements"][index]["data"]["title"]
        newelem.getElementsByClassName('url_pdf_Elem')[0].value = this.data["elements"][index]["data"]["url"]
        newelem.getElementsByClassName('desc_pdf_Elem')[0].value = this.data["elements"][index]["data"]["description"]
        newelem.getElementsByClassName('pdfprev')[0].setAttribute("src", this.data["elements"][index]["data"]["url"]);
        this.anchor.appendChild(newelem);
    }

    makeFilledMcq(index){
        let newelem = document.createElement("div");
        newelem.classList.add('mcqBlockElem');
        newelem.innerHTML = this.mcqBlockElem.innerHTML;
        // filling the instructions and the question
        newelem.getElementsByClassName('titre_MCQ_Elem')[0].value = this.data["elements"][index]["data"]["title"]
        newelem.getElementsByClassName('instruction_MCQ_Elem')[0].value = this.data["elements"][index]["data"]["instruction"]
        newelem.getElementsByClassName('question_MCQ_Elem')[0].value = this.data["elements"][index]["data"]["question"]

        // filling the first and the second answer of the mcq (because they are mandatory)
        newelem.getElementsByClassName('answer1')[0].value = this.data["elements"][index]["data"]["answers"][0]["answer"]
        newelem.getElementsByClassName('answer1isvalid')[0].checked = this.data["elements"][index]["data"]["answers"][0]["solution"]

        newelem.getElementsByClassName('answer2')[0].value = this.data["elements"][index]["data"]["answers"][1]["answer"]
        newelem.getElementsByClassName('answer2isvalid')[0].checked = this.data["elements"][index]["data"]["answers"][1]["solution"]

        // optionally filling the other answers
        for(let i = 2;i<this.data["elements"][index]["data"]["answers"].length;i++)
        {
            addReponseFilled(newelem.getElementsByClassName('panel-body')[0], this.data["elements"][index]["data"]["answers"][i]);
        }

        // this.anchor.getElementsByClassName("list_answers")[0].appendChild(newelem);

        this.anchor.appendChild(newelem);
        newelem.style.display = "block";
    }

    fillPage()
    {
        if(this.data){
            for(let i = 0;i<this.data["elements"].length;i++)
            {
                if(this.data["elements"][i]["type"] == "TextElem")
                {
                    this.makeFilledText(i);
                }
                else if(this.data["elements"][i]["type"] == "ImgElem")
                {
                    this.makeFilledImg(i);
                }
                else if(this.data["elements"][i]["type"] == "VidElem")
                {
                    this.makeFilledVid(i);
                }
                else if(this.data["elements"][i]["type"] == "PDFElem")
                {
                    this.makeFilledPDF(i);
                }
                else if(this.data["elements"][i]["type"] == "MCQElem")
                {
                    this.makeFilledMcq(i);
                }
            }
        }
    }


    sendForm() {

        let data = {};
        let listOfParamIDfield = ["title", "skill", "topic", "grade_level", "instructions", "public"];

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
            else if(classElem =="pdfBlockElem")
            {
                data["elements"].push(this.getElemInputBlockPDF(this.anchor.childNodes[i]));
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
    root[1].setAttribute("src", root[5].value);
    return false;
}

function loadPDF(elem){
    var root = elem.parentNode.childNodes;
    var ID = root[5].value;
    console.log(ID);
    var embedURL = "http://docs.google.com/gview?url=" + ID + "&embedded=true";
    console.log(embedURL);
    root[1].setAttribute("src", embedURL);
    root[1].setAttribute("type", "application/pdf");
    root[1].style.display = "block";
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

function addReponseFilled(root, answer){
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
        // TODO: virer ces childnodes
        let txt = repLineElem.childNodes[1].innerHTML;
        newelem.childNodes[1].innerHTML = txt.substring(0,txt.length -2) + (count +1);
        newelem.childNodes[7].style.display = "inline";
        newelem.getElementsByClassName('answer1')[0].value = answer["answer"]
        newelem.getElementsByClassName('answer1isvalid')[0].checked = answer["solution"]
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
    // let loadVidID = "loadVideo";
    // let loadVidButtonID = "addVid";

    let mcqBlockElemID = "mcqBlockElem";
    let mcqButtonID = "addElementMcq";

    let imgBlockElemID = "imgBlockElem";
    let imgButtonID = "addElementImg";

    let loadImgID = "loadImage";
    let loadImgButtonID = "addImg";

    let removeImageID = "removeImage";

    let pdfBlockElemID = "pdfBlockElem";
    let pdfButtonID = "addElementPDF";

    let saveScenarioButtonID = "saveScenario";

    let param = {
        "btnPlusID":"addElement",
        "anchorID":"whiteBox",
        "addElementDivID": "addElementDiv",
        "DiffElem": "DiffElem",
        "textBlockElemID": "textBlockElem",
        "textButtonID": "addElementTxt",
        "idTextElemNav": "idTextElemNav",
        "idImgElemNav": "idImgElemNav",
        "idVideoElemNav": "idVideoElemNav",
        "idMCQElemNav": "idMCQElemNav",
        "sideNavBar" : "navFixed",

        "videoBlockElemID": "videoBlockElem",
        "videoButtonID": "addElementVideo",
        /*"loadVidID": "loadVideo",
        "loadVidButtonID": "addVid",*/

        "mcqBlockElemID": "mcqBlockElem",
        "mcqButtonID": "addElementMcq",

        "imgBlockElemID": "imgBlockElem",
        "imgButtonID": "addElementImg",

        "pdfBlockElemID": "pdfBlockElem",
        "pdfButtonID": "addElementPDF",
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
