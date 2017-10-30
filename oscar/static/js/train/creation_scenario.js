"use strict";

class ScenarioCreation {

    constructor(anchorID, btnPlusID, addElementDivID, textBlockElemID, textButtonID, videoBlockElemID, videoButtonID, mcqBlockElemID, mcqButtonID){
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

        this.mcqBlockElem = document.getElementById(mcqBlockElemID);
        this.mcqButton = document.getElementById(mcqButtonID);
        document.getElementById(mcqButtonID).addEventListener("click", this.makeBlockElemMcq.bind(this), true);

    }

    makeBlockElemText(){
        let newelem = document.createElement("input");
        newelem.setAttribute("placeholder", "Tapez votre texte");
        newelem.innerHTML = this.textBlockElem.innerHTML;
        this.anchor.appendChild(newelem);
        newelem.style.display = "block";

    }

    makeBlockElemVideo(){
        //TODO : adapter les liens
        let newelem = document.createElement("input");
        newelem.setAttribute("placeholder", "URL de votre vidéo");
        newelem.innerHTML = this.videoBlockElem.innerHTML;
        this.anchor.appendChild(newelem);
        newelem.style.display = "block";
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

// initiation
window.onload = function(){
    let btnPlusID = "addElement"; //document.getElementById("addElement");
    let anchorID = 'whiteBox';
    let addElementDivID = 'addElementDiv';

    let textBlockElemID = "textBlockElem";
    let textButtonID = "addElementTxt"

    let videoBlockElemID = "videoBlockElem";
    let videoButtonID = "addElementVideo"

    let mcqBlockElemID = "mcqBlockElem";
    let mcqButtonID = "addElementMcq"

    new ScenarioCreation(anchorID, btnPlusID, addElementDivID, textBlockElemID, textButtonID, videoBlockElemID, videoButtonID, mcqBlockElemID, mcqButtonID);
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
    if (!emptyfield) {
        form.submit();
    }else {
        console.error("Empty field");
    }

}
