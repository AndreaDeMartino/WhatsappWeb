
$(document).ready(function () {
  
  // General Variables
  var inputBox = $('.input-chat__search');


  // Add element with button
  // $('.app').on('click', '.inputBox', function(){
  //   console.log('ciao');
    
  //   addElement();
  // })

  // Add element with keyboard
  $('.app').on('keyup', '.add-item', function(e){
    
    if (e.which == 13){
      console.log('Premuto Invio su Input');
      addElement();
    }
  })

  
  // Add Element Function
  function addElement() {
    // Clono struttura template li
    var messageRow = $('.template .message-row').clone();
    messageRow.addClass('send-message');
    // Prendo valore da inputbox
    messageText = $('.input-chat__search').val().trim();
    console.log('Valore Input Box Prelevato:', messageText);

    if (messageText == '') {
      alert('Attenzione, non hai inserito un testo valido')
    } else{
      // Aggiungo valore inputbox a clone
      messageRow.find('h3').text(messageText);
      // Inserisco il tutto in lista
      $('.chat-main__wrapper').append(messageRow);
      // Svuoto InputBox
      $('.input-chat__search').val('');
    }
  }

});