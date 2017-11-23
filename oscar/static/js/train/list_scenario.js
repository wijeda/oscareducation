"use strict"

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
