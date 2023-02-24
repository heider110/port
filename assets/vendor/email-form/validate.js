$( document ).ready(function() {
 $('#myForm').submit(function(e) {
  e.preventDefault(); // prevent page reload on form submit
  $.ajax({
    type: 'POST',
    url: '/send',
    data: $('#myForm').serialize(), // serialize the form data
    success: function(data) {
      
      // handle successful response from server
      
        console.log('Success:', data);
        if (data ) {
          $('div.sent-message').addClass("d-block");
           setTimeout(function(){
            $('div.sent-message').fadeOut("3000", function() {
    $(this).removeClass("d-block");
});  
},3000);
         

$('#myForm').trigger("reset");

       
       
      }
      
      
    },
    error: function(xhr, status, error) {
      console.log('Error:', error);
      // handle error response from server

    }
  });
});
});
  
