
$(document).ready(function () {
  
 /**********************
    GENERIC VARIABLES 
  **********************/
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

  // User Search
  var inputSearch = $('#input-search');
  var users = $('.sidebar-users');
  var userList = [];

  /**************************
    1) SOLUTION WITH ARRAY
  **************************/

  // Creation of array with usernames
  for (var i = 0; i < users.children().length; i++){
    userList.push( users.children().eq(i).find('h3').text().toLowerCase() );
  }
  
  // Search on inputbox keyup
  inputSearch.keyup(function(){
    var textSearch = $('#input-search').val().toLowerCase();
    users.children().hide();
    
    for (var i = 0; i < usernames.length; i++){
      if (userList[i].includes(textSearch)){
        users.children().eq(i).show();
      }
    }
  })

  /**************************
    2) SOLUTION NO ARRAY
  **************************/

  // inputSearch.keyup(function(){
  //   var textSearch = $('#input-search').val().toLowerCase();
  //   userBox.hide();

  //   if ('michele'.includes(textSearch)) {
  //     users.children().eq(0).show();
  //   }

  //   if ('fabio'.includes(textSearch)) {
  //     users.children().eq(1).show();
  //   }

  //   if ('samuele'.includes(textSearch)) {
  //     users.children().eq(2).show();
  //   }

  //   if ('alessandro b.'.includes(textSearch)) {
  //     users.children().eq(3).show();
  //   }

  //   if ('alessandro l.'.includes(textSearch)) {
  //     users.children().eq(4).show();
  //   }

  //   if ('claudia'.includes(textSearch)) {
  //     users.children().eq(5).show();
  //   }

  //   if ('davide'.includes(textSearch)) {
  //     users.children().eq(6).show();
  //   }

  //   if ('federico'.includes(textSearch)) {
  //     users.children().eq(7).show();
  //   }

  // })


 /**********************
        FUNCTIONS 
  **********************/

  // FUNCTION: ADD MESSAGE
  function addElement(type) {
    // Get template structure
    var messageRow = $('.template .message-row').clone();

    // Fix time with a function
    var date = new Date();
    var time = addZero( date.getHours() );
    var minutes = addZero( date.getMinutes() );
    var finalTime = time + ':' + minutes;
    messageRow.find('h5').text(finalTime);
    // Message sent by User
    if (type == 'user') {
      messageRow.find('h3').text(messageText);
      messageRow.addClass('send-message');
    }
    // Message sent by Bot
    if (type == 'bot'){
      messageRow.addClass('received-message');
      messageRow.find('h3').text('Ok');
      inputMessage.val('');
    }
    // Append complete clone structure on project
    $('.chat-main__wrapper').append(messageRow);
  }

  // FUNCTION: ADD FIX TIME
  function addZero(number){
    if (number < 10) {
      number = '0' + number;
    }
    return number;
  }

});