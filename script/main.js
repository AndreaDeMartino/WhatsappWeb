/* START DOCUMENT READY */
$(document).ready(function () { 
  
 /**********************
    GENERIC VARIABLES 
  **********************/
  var inputMessage = $('#input-chat__write');
  var messageText = inputMessage.val();
  var inputSearch = $('#input-search');

  // Change Send Icon on inputMessage focus
  inputMessage.focus(function(){
    $('.chat-send i').removeClass('fa-microphone').addClass('fa-paper-plane')
  })

  // Restore Send Icon on inputMessage blur
  inputMessage.blur(function(){
    $('.chat-send i').removeClass('fa-paper-plane').addClass('fa-microphone')
  })

  // Add new message with send Icon (button)
  $('.app').on('click', '.chat-send', function(){
    messageText = inputMessage.val();
    if(messageText == ''){
      alert('Attenzione, hai inserito un testo vuoto')
    } else{
      addMessage('user');
      setTimeout(addMessage, 1000, 'bot');
    }
  })

  // Add a new message by pressing the enter button on the inputMessage
  $('.app').on('keyup', inputMessage, function(e){
    
    if (e.which == 13){
      messageText = inputMessage.val();
      if(messageText == ''){
        alert('Attenzione, hai inserito un testo vuoto')
      } else{
        addMessage('user');
        setTimeout(addMessage, 1000, 'bot');
        }
    }
  })

  // Select users Management
  $('.user-box').click(function(){
    var userData = $(this).attr('data-user');
    var userName = $(this).find('h3').text();
    var lastAccess = 'Ultimo accesso oggi alle '
    
    // Refresh Sidebar
    $('.user-box').removeClass('user-active');
    $(this).addClass('user-active');

    // Refresh Chat Messages
    $('.chat-main__wrapper').removeClass('active');
    $('.chat-main__wrapper[data-user="' + userData + '"]').addClass('active');

    // Refresh Chat Header Avatar
    $('.chat-header__avatar').find('h3').text(userName);
    $('.chat-header .header-img').attr('src','img/' + userData + '.jpg').text(userName);
    $('.chat-header h5').text('Ultimo accesso oggi alle ' + timeStamp() )
    /************************************ N.B ************************************************** 
    ( Ciao Teacher, la riga precedente è un modo alternativo per NON recuperare per intero l'attributo src dall'html, non ha molto senso pratico, ma è soltanto per fare un pò di pratica con la gestione di più elementi e per complicarsi un pò la vita di proposito)
    ************************************ N.B **************************************************/ 
  })

  // Interactions on messages
  
  // Show Menu
  $('.app').on('click', '.message-menu', function(){
    $(this).next('.message-menu-box').toggle();
  })
  // Delete Message
  $('.app').on('click', '.delete-message', function(){
    $(this).parents('.message-row').remove();
  })

   // Emoticon

  //  Show Menu
  var emoticonButton = $('.emoticon-button')

  emoticonButton.click(function(){
    $('.emoticon-list').toggle();
  })

  // Add Emoticon
  $('.emoticon-list span').click(function(){
    var emoticon = $(this).html();
    var text = $('#input-chat__write').val();
    text += emoticon;
    inputMessage.val(text);
  })

  // Detect external click on emoticon and message menu
  $('.app').click(function(e){
    if(!emoticonButton.is(e.target) && emoticonButton.has(e.target).length === 0)
    {
      $('.emoticon-list').hide();
    }
    
    if(!$('.message-menu').is(e.target) && $('.message-menu').has(e.target).length === 0)
    {
      $('.message-menu-box').hide();
    }
  })

  // Search from the inputSearch
  var users = $('.sidebar-users');

  /**************************
    1) NO ARRAY SOLUTION
   **************************/

  inputSearch.keyup(function(){
    var textSearch = $('#input-search').val().toLowerCase().trim();
    users.children().hide();
  
    $('.user-box').each(function() {
      var userName = $(this).find('h3').text().toLowerCase();
    
      if ( userName.includes(textSearch) ){
      $(this).show()
      }
    })

  })

  /**************************
    2) SOLUTION WITH ARRAY
   **************************/

  //  var users = $('.sidebar-users');
  //  var userList = [];

  //  // Creation of array with usernames
  //  for (var i = 0; i < users.children().length; i++){
  //   userList.push( users.children().eq(i).find('h3').text().toLowerCase() );
  // }
  
  // // Search on inputbox keyup
  // inputSearch.keyup(function(){
  //   var textSearch = $('#input-search').val().toLowerCase();
  //   users.children().hide();
    
  //   for (var i = 0; i < userList.length; i++){
  //     if (userList[i].includes(textSearch)){
  //       users.children().eq(i).show();
  //     }
  //   }
  // })
 /**********************
        FUNCTIONS 
  **********************/

  // FUNCTION: ADD MESSAGE
  function addMessage(type) {
    // Get template structure
    var messageRow = $('.template .message-row').clone();

    messageRow.find('h5').text( timeStamp() );

    // Message sent by User
    if (type == 'user') {
      messageRow.find('h3').text(messageText);
      messageRow.addClass('send-message');
      inputMessage.val('');
    }
    // Message sent by Bot
    if (type == 'bot'){
      messageRow.addClass('received-message');
      messageRow.find('h3').text('Ok');
    }

    // Upload of the final version of the clone to the project
    $('.chat-main__wrapper.active').append(messageRow);

    // Scroll on inserting a new message:
    // 1) Get the height of the message chat container
    var pixelScroll = $('.chat-main__wrapper').height();
    // 2) Scroll on the container that has the overflow-Y
    $('.chat-main').scrollTop(pixelScroll);

    // -----> ANIMATION <-------
    // $('.chat-main').animate({
    //   scrollTop: pixelScroll
    // }, 500);
    // -----> ANIMATION <-------

  }

  // FUNCTION: TIME STAMP
  function timeStamp(){
    var date = new Date();
    var time = addZero( date.getHours() );
    var minutes = addZero( date.getMinutes() );
    return finalTime = time + ':' + minutes;
     
  }
  // FUNCTION: ADD FIX TIME
  function addZero(number){
    if (number < 10) {
      number = '0' + number;
    }
    return number;
  }

});
/* END DOCUMENT READY */

