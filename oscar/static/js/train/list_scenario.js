"use strict"

function ConfirmDelete(elem){
    if (confirm('Etes vous sur de vouloir supprimer cet objet ?'))
    {
        var id = elem.getAttribute('data');
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "/professor/train/delete_scenario/"+id, false ); // false for synchronous request
        xmlHttp.send( null );
        window.location.href = window.location.href + "listscena";
        location.reload(window.location.href);
    }
    else
    {
        console.log('no');
    }
}
