"use strict";

class ScenarioCreation {

    constructor(anchor, btnPlus){
        /*
         * @pre : anchor is the node under where are the differents box to
         *        create element
         */
        this.anchor = anchor;
        this.btnPlus = btnPlus;
        btnPlus.addEventListener("click", this.showDiffElements, true);
    }

    showDiffElements(){
        console.log("work")
        alert("Work");
    }

}

// initiation
window.onload = function(){
    var btnPlus = document.getElementById("addElement");
    var anchor = document.getElementById('whiteBox');

    new ScenarioCreation(anchor, btnPlus);
};
