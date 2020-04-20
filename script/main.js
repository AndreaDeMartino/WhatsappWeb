
$(document).ready(function () {
  

  // Change Icon on input focus
  $('#input-chat__write').focus(function(){
    $('.chat-send i').removeClass('fa-microphone').addClass('fa-paper-plane')
  })

  // Restore Icon on blur
  $('#input-chat__write').blur(function(){
    $('.chat-send i').removeClass('fa-paper-plane').addClass('fa-microphone')
  })

  
  // Add message with button
  $('.app').on('click', '.chat-send', function(){
    console.log('ciao');
    
    addElement();
  })

  // Add message with keyboard
  $('.app').on('keyup', '#input-chat__write', function(e){
    
    if (e.which == 13){
      console.log('Premuto Invio su Input');
      addElement();

    }
  })

  // Select User to chat
  $('.user-box').click(function(){
    $('.user-box').removeClass('user-active');
    $(this).addClass('user-active');
  })
 
  
  // Add message Function
  function addElement() {
    // Clono struttura template
    var messageRow = $('.template .message-row').clone();
    messageRow.addClass('send-message');
    // Prendo valore da inputbox
    var messageText = $('#input-chat__write').val();

    if (messageText == '') {
      alert('Attenzione, non hai inserito un testo valido')
    } else{
      // Aggiungo valore inputbox a clone
      messageRow.find('h3').text(messageText);
      // Inserisco il tutto
      $('.chat-main__wrapper').append(messageRow);
      // Svuoto InputBox
      $('#input-chat__write').val('');
    }
  }

});