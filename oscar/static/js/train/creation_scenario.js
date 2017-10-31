"use strict";

class ScenarioCreation {

    constructor(anchorID, btnPlusID, addElementDivID, textBlockElemID, textButtonID, videoBlockElemID, videoButtonID, imgBlockElemID, imgButtonID, deleteImgButtonId, mcqBlockElemID, mcqButtonID){
        this.anchor = document.getElementById(anchorID);
        this.btnPlus = document.getElementById(btnPlusID);
        this.addElementDiv = document.getElementById(addElementDivID);
        this.addElementOption = false; // at start it is not shown
        document.getElementById(btnPlusID).addEventListener("click", this.showDiffElements.bind(this), true);

        this.textBlockElem = document.getElementById(textBlockElemID);
        this.textButton = document.getElementById(textButtonID);
        document.getElementById(textButtonID).addEventListener("click", this.makeBlockElemText.bind(this), true);

        this.videoBlockElem = document.getElementById(videoBlockElemID);
        this.videoButton = document.getElementById(videoButtonID);
        document.getElementById(videoButtonID).addEventListener("click", this.makeBlockElemVideo.bind(this), true);

        this.imgBlockElem = document.getElementById(imgBlockElemID);
        this.imgButton = document.getElementById(imgButtonID);
        document.getElementById(imgButtonID).addEventListener("click", this.makeBlockElemImg.bind(this), true);
        this.deleteImgButtonId = document.getElementById(deleteImgButtonId);
        document.getElementById(deleteImgButtonId).addEventListener("click", this.deleteBlockElemImg.bind(this), true);
        // this.loadImage = document.getElementById(loadImgID);
        // this.loadImgButton = document.getElementById(loadImgButtonID);
        // document.getElementById(loadImgButtonID).addEventListener("click", this.loadImage.bind(this), true);

        this.mcqBlockElem = document.getElementById(mcqBlockElemID);
        this.mcqButton = document.getElementById(mcqButtonID);
        document.getElementById(mcqButtonID).addEventListener("click", this.makeBlockElemMcq.bind(this), true);


    }

    loadImage(){
        let newelem = document.createElement("image");
        newelem.setAttribute("url", this.value);
        this.anchor.appendChild(newelem);
    }

    makeBlockElemText(){
        let newelem = document.createElement("div");
        // newelem.value=''
        // newelem.setAttribute("placeholder", "Tapez votre texte");
        newelem.innerHTML = this.textBlockElem.innerHTML;
        this.anchor.appendChild(newelem);
        newelem.style.display = "block";
        newelem.style.width = "100%";
        newelem.style.height = "150px";
    }

    makeBlockElemImg(){
        let newelem = document.createElement("div")
        newelem.innerHTML = this.imgBlockElem.innerHTML;
        this.anchor.appendChild(newelem);
        newelem.style.display = "block";
        newelem.style.width = "100%";
    }

    deleteBlockElemImg(){
        this.anchor.removeChild(document.getElementById(deleteImgButtonId));
    }

    makeBlockElemVideo(){
        let newelem = document.createElement("div");
        newelem.innerHTML = this.videoBlockElem.innerHTML;
        this.anchor.appendChild(newelem);
        newelem.style.display = "block";
        newelem.style.width = "100%";

    }

    makeBlockElemMcq(){
        //TODO remplacer par QCM
        let newelem = document.createElement("input");
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
    return false;
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
    let deleteImgButtonId = "deleteElementImg";

    let loadImgID = "loadImage";
    let loadImgButtonID = "addImg";

    new ScenarioCreation(anchorID,
                        btnPlusID,
                        addElementDivID,
                        textBlockElemID,
                        textButtonID,

                        videoBlockElemID,
                        videoButtonID,
                        loadVidID,
                        loadVidButtonID,

                        imgBlockElemID,
                        imgButtonID,
                        deleteImgButtonId,
                        loadImgID,
                        loadImgButtonID,

                        mcqBlockElemID,
                        mcqButtonID);
};


function sendForm() {
    let emptyfield = false
    let form = document.getElementById("whiteBox");
    form.setAttribute("method", "POST");
    form.setAttribute("action", "/professor/train/save_scenario");

     let listOfIDfield = ["creator", "title", "skill", "topic", "grade_level", "instructions", "public"];
     for(let key in listOfIDfield){
         console.log("key : " + listOfIDfield[key]);
         let elem = document.getElementById(listOfIDfield[key])
         if(elem){

             let hiddenField = document.createElement("input");
             hiddenField.setAttribute("type", "hidden");
             hiddenField.setAttribute("name", listOfIDfield[key]);

             if (elem.type == "checkbox"){
               //hiddenField.setAttribute("type", "checkbox");
               //hiddenField.setAttribute("checked", elem.checked);
               //hiddenField.setAttribute("value", (elem.checked?"True":"False"));
               hiddenField.setAttribute("value", "True");
               //hiddenField.setAttribute("required", false);
               console.log(elem.checked)
             }else{
               console.log(elem.value)
               hiddenField.setAttribute("value", elem.value);
             }

             if(!elem.value || elem.value == ""){
                 emptyfield = true
             }

             form.appendChild(hiddenField);
         }
     }
     if (!emptyfield) {
         form.submit();
     }else {
         console.error("Empty field");
     }*/


     var data = {"creator": "super_creator",
                 "titre": "super_titre",
                 "skill": "super_skill",
                 "topic": "super_topic",
                 "grade_level": "super grade",
                 "instructions": "super_instructions",
                 "public": "False",
                 "elements":[{"type": "TextElem", "data":{"title": "JHKNLJHKNL", "content": "my content"}},
                             {"type": "TextElem", "data":{"title": "PPPPPPPPPPPPPP", "content": "my content"}}],
         }
         // construct an HTTP request
     var xhr = new XMLHttpRequest();

     xhr.open("POST", "/professor/train/save_scenario", true);
     xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
     xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"))
     // send the collected data as JSON
     xhr.send(JSON.stringify(data));

     xhr.onloadend = function () {
         // done
         console.log(data);
         console.log("done");
     };

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
