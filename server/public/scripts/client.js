$( document ).ready( onReady );

function onReady(){
    console.log( 'jq');
    getList();
    $( '#addNewTask' ).on( 'click', addTask );
    $( '#outputDiv').on( 'click', '.completeButton', completeTask );
    $( '#outputDiv').on( 'click', '.deleteButton', deleteTask );
    $( '#darkButton').on( 'click', darkMode );
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
        // empty input fields
        $('#newTask').val('');
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
            let uncompletedStart = '';
            let uncompletedEnd = '';
            if( response[i].completed ){
                completedStart = '<strong>';
                completedEnd = '</strong>';
                el.append(`<tr><td>${ completedStart } ${ response[i].task } ${ completedEnd }</td>
                <td><button class="completedTask">Complete</button> </td>
                <td><button class="deleteButton" data-id="${ response[i].id }">Delete</button></td></tr>`);
            }
            else{
                uncompletedStart = '<em>';
                uncompletedEnd = '</em>';
                el.append(`<tr><td>${ uncompletedStart }${ response[i].task }${ uncompletedEnd }</td> <td> <button class="completeButton" data-id="${ response[i].id }">Complete</button> </td>
                 <td> <button class="deleteButton" data-id="${ response[i].id }">Delete</button></td></tr>`);
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
        $(".patOnTheBack").text("Well Done!").fadeIn();
        $(".patOnTheBack").delay( 2000 ).fadeOut();
        //alert( 'Look at you go!')
    }).catch( function( err ){
        alert( 'error completing task ');
    })
}// end completeTask

function  deleteTask(){
    console.log( 'in deleteTask' );
    $.ajax({
        method: 'DELETE',
        url: `/list?id=${ $( this ).data( 'id' )}`
    }).then( function( response ){
        console.log( response );
        getList();
    }).catch( function( err ){
        console.log( err );
        alert( 'error deleting list item' );
    })
}// end deleteTask


//thought this would be easier than it is.
function darkMode() {
    var element = document.body;
    element.classList.toggle( "dark-mode" );
  }// end darkMode