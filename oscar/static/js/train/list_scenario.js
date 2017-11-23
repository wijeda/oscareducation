"use strict"
window.onload = function(){
    let scenarioList = document.getElementsByClassName("mycontentlist");
    if(scenarioList.length == 0){
        let emptyDiv = document.createElement("div");
        emptyDiv.classList.add("emptyListScenario");
        emptyDiv.innerHTML = "<div>Vous n'avez auncun scénario</div>";
        document.getElementsByClassName("mylist")[0].parentNode.parentNode.appendChild(emptyDiv);
    }

    let otherscenarioList = document.getElementsByClassName("othercontentlist");
    if(otherscenarioList.length == 0){
        let emptyDiv = document.createElement("div");
        emptyDiv.classList.add("emptyListScenario");
        emptyDiv.innerHTML = "<div>Vous n'avez auncun scénario</div>";
        document.getElementsByClassName("otherlist")[0].parentNode.appendChild(emptyDiv);
    }
};

function ConfirmDelete(elem){
    if (confirm('Etes vous sur de vouloir supprimer cet objet ?'))
    {
        let id = elem.getAttribute('data');
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/professor/train/delete_scenario/"+id);
        xhr.send( null );

        let line = elem.parentNode.parentNode;
        let root = line.parentNode;
        root.removeChild(line);
    }
    else
    {
        console.log('no');
    }
}
