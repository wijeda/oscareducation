"use strict";

class ScenarioCreation {

    constructor(anchorID, btnPlusID, addElementDivID){
        /*
         * @pre : anchor is the node under where are the differents box to
         *        create element
         */
        this.anchorID = anchorID;
        this.btnPlus = document.getElementById(btnPlusID);
        this.addElementDivID = addElementDivID;

        this.addElementOption = true // at start it is show
        this.showDiffElements()
        //this.btnPlus.addEventListener("click", this.showDiffElements, true);
    }

    showDiffElements(){
        console.log(this.addElementDivID)
        console.log(document.getElementById('addElementDiv'));
        if(this.addElementOption) {
            console.log("off")
            document.getElementById(this.addElementDivID).style.display = "none";
        }else {
            console.log("on")
            document.getElementById(this.addElementDivID).style.display = "block";
        }

        this.addElementOption = !this.addElementOption

        //alert("Work");
    }

    addListener(){
        this.btnPlus.addEventListener("click", this.showDiffElements, true);
    }

}

// initiation
window.onload = function(){
    var btnPlusID = "addElement";
    var anchorID = 'whiteBox';
    var addElementDivID = 'addElementDiv';

    console.log(addElementDiv)
    var a = new ScenarioCreation(anchorID, btnPlusID, addElementDivID);
    a.addListener();
};


function sendForm() {
    let form = document.getElementById("whiteBox");
    form.setAttribute("method", "POST");
    form.setAttribute("action", "save_scenario");

    let listOfIDfield = ["title", "instructions"];
    for(let key in listOfIDfield){
        console.log("key : " + listOfIDfield[key]);
        let elem = document.getElementById(listOfIDfield[key])
        let hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", listOfIDfield[key]);
        console.log(elem.value)
        hiddenField.setAttribute("value", elem.value);
        form.appendChild(hiddenField);
    }


    form.submit();
}
