
$(document).ready(function () {
  
  // General Variables

  // Add message with button
  $('.app').on('click', '.chat-send', function(){
    console.log('ciao');
    
    addElement();
  })

  // Add message with keyboard
  $('.app').on('keyup', '.input-chat__search', function(e){
    
    if (e.which == 13){
      console.log('Premuto Invio su Input');
      addElement();
    }
  })

  
  // Add message Function
  function addElement() {
    // Clono struttura template
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
      // Inserisco il tutto
      $('.chat-main__wrapper').append(messageRow);
      // Svuoto InputBox
      $('.input-chat__search').val('');
    }
  }

});