
$(document).ready(function () {
  
var inputMessage = $('#input-chat__write');
var messageText = inputMessage.val();

  // Change Icon on input focus
  inputMessage.focus(function(){
    $('.chat-send i').removeClass('fa-microphone').addClass('fa-paper-plane')
  })

  // Restore Icon on blur
  inputMessage.blur(function(){
    $('.chat-send i').removeClass('fa-paper-plane').addClass('fa-microphone')
  })

  
  // Add message with button
  $('.app').on('click', '.chat-send', function(){
    messageText = inputMessage.val();
    if(messageText == ''){
      alert('Attenzione, non hai inserito un testo valido')
    } else{
      addElement('user');
      setTimeout(addElement, 1000, 'bot');
    }
  })

  // Add message with keyboard
  $('.app').on('keyup', inputMessage, function(e){
    
    if (e.which == 13){
      messageText = inputMessage.val();
      if(messageText == ''){
        alert('Attenzione, non hai inserito un testo valido')
      } else{
        addElement('user');
        setTimeout(addElement, 1000, 'bot');
      }
    }
  })

  // Select User to chat
  $('.user-box').click(function(){
    $('.user-box').removeClass('user-active');
    $(this).addClass('user-active');
  })
  
  
  // Add message Function
  function addElement(type) {
    // Clono struttura template
    var messageRow = $('.template .message-row').clone();

    // Calcolo orario con funzione AddZero e aggiorno il clone
    var date = new Date();
    var time = addZero( date.getHours() );
    var minutes = addZero( date.getMinutes() );
    var finalTime = time + ':' + minutes;

    messageRow.find('h5').text(finalTime);

    // Messaggio Inviato da utente
    if (type == 'user') {
      // Prendo valore da inputbox
      messageRow.find('h3').text(messageText);
      messageRow.addClass('send-message');
      
    }

    // Messaggio Inviato da bot
    if (type == 'bot'){
      messageRow.addClass('received-message');
      messageRow.find('h3').text('Ok');
      // Svuoto InputBox
      inputMessage.val('');
    }


    // Inserisco il clone su chat reale
    $('.chat-main__wrapper').append(messageRow);
    
  }

    // Funzione per aggiungere 0 ad orario se min/ora < 10
    function addZero(number){
      if (number < 10) {
        number = '0' + number;
      }
      return number;
    }


});