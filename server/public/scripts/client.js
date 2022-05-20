$( document ).ready( onReady );

function onReady(){
    console.log( 'jq');
    $( '#addNewTask' ).on( 'click', addTask );
    getList();
}// end onReady

function addTask(){
    console.log( 'in addTask' );
}// end addTask

function getList(){
    console.log( 'in getList' );
    $.ajax({
        method: 'GET',
        url: '/list'
    }).then( function( response ){
        console.log( response );
        let el = $( '#listOut' );
        el.empty();
        for( let i=0; i< response.length; i++){
            el.append(`<li>${ response[i].task}`);
        }
    }).catch( function( err ){
        console.log( err );
        alert( 'error getting list' );
    })
}