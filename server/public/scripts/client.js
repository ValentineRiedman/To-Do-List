$( document ).ready( onReady );

function onReady(){
    console.log( 'jq');
    getList();
    $( '#addNewTask' ).on( 'click', addTask );
    $( '#outputDiv').on( 'click', '.completeButton', completeTask );
}// end onReady

function addTask(){
    console.log( 'in addTask' );
    let newTask ={
        task: $( '#newTask' ).val()
    }
    console.log( 'sending:', newTask );
    $.ajax({
        method: 'POST',
        url: '/list',
        data: newTask
    }).then( function( response ){
        console.log( 'back from POST:', response );
        getList();
    }).catch( function( err){
        console.log( err );
        alert( 'error adding new task');
    })
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
            let completedStart = '';
            let completedEnd = '';
            if( response[i].completed ){
                completedStart = '<strong>';
                completedEnd = '</strong>';
                el.append(`<li>${ completedStart }${ response[i].task }${ completedEnd }</li>`);
            }
            else{
                el.append(`<li>${ response[i].task} <button class="completeButton" data-id="${ response[i].id }">Complete</button></li`);

            } 
        }
    }).catch( function( err ){
        console.log( err );
        alert( 'error getting list' );
    })
}

function completeTask(){
    console.log( 'in completeTask ', $( this ).data( 'id' ) );
    $.ajax({
        method: 'PUT',
        url: '/list?id=' + $( this ).data( 'id' )
    }).then( function( response ){
        console.log( response );
        getList();
    }).catch( function( err ){
        alert( 'error completing task ');
    })
}// end completeTask