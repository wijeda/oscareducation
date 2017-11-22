"use strict"

function ConfirmDelete(elem){
    if (confirm('Etes vous sur de vouloir supprimer cet objet ?'))
    {
        var id = elem.getAttribute('data');
        //var xmlHttp = new XMLHttpRequest();
        //xmlHttp.open( "GET", "/professor/train/delete_scenario/"+id, false ); // false for synchronous request
        //xmlHttp.send( null );
        //window.location.href = window.location.href + "#listscena";
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/professor/train/delete_scenario/"+id, false);
        xhr.send( null );
        //xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        //xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"))
        var pathArray = window.location.pathname.split( '/' );
        var pk = pathArray[4];
        var new_url = "/professor/lesson/"+pk+"/#listscena";
        xhr.onloadend = function () {
            //location.reload(new_url);
            window.location.href = new_url;
            location.reload(new_url);
        };
        //location.reload(new_url);
    }
    else
    {
        console.log('no');
    }
}
