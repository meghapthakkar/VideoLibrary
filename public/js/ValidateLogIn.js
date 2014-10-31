//USed to validate login page
$(document).ready(function()
{

   $("#btnlogin").click(function () 
              {    
                //$("#msginfo").addClass("alert alert-success"); 
              //$("#msginfo").addClass("alert alert-danger"); 
              //$("#msginfo").text("nirav");  
            //  alert("btnlogin");
              var username =  $("#userName").val();  
              if(username == null || username == ""  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Username should not be blank."); 
                $("#userName").focus();
                return false;
              }
               var password =  $("#tbpassword").val();  
              if(password == null || password == ""  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("password should not be blank."); 
                $("#tbpassword").focus();
                return false;
              } else{
                /*$("#msginfo").attr('class',"alert alert-success"); 
                $("#msginfo").text("niravshsh");  */
                 $("#msginfo").empty();
                  $("#msginfo").removeClass("alert alert-danger"); 
                return true;
              }
            
    });

    

    

});