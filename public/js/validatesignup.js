$(document).ready(function()
{
   $("#btnsignup,#btnedit").click(function () 
              {    
                //$("#msginfo").addClass("alert alert-success"); 
              //$("#msginfo").addClass("alert alert-danger"); 
              //$("#msginfo").text("nirav");  
              var fname =  $("#tbfirstname").val(); 
              fname = $.trim(fname);
              //alert(fname);
              if(fname == null || fname == ""  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Firstname should not be blank."); 
                $("#tbfirstname").focus();
                return false;
              }


              var lname =  $("#tblastName").val();
              lname = $.trim(lname);
              if(lname == null || lname == ""  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("lastname should not be blank."); 
                $("#tblastName").focus();
                return false;
              }
              var add1 =  $("#tbadd1").val();
              add1 = $.trim(add1);
              if(add1 == null || add1 == ""  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Addressline1 should not be blank."); 
                $("#tbadd1").focus();
                return false;
              } 
              var city =  $("#tbcity").val(); 
              city = $.trim(city);
              if(city == null || city == ""  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("City should not be blank."); 
                $("#tbcity").focus();
                return false;
              }
              var state =  $("#dpnstate").val();
              
              if(state == null || state == "State"  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Please select a State"); 
                $("#dpnstate").focus();
                return false;
              } 

              var zip =  $("#tbzipcode").val();  
              zip = $.trim(zip);
              if(zip == null || zip == ""  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Zipcode should not be blank."); 
                $("#tbzipcode").focus();
                return false;
              }else if(isNaN(zip)  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Zipcode should be NUMERIC ONLY."); 
                $("#tbzipcode").focus();
                return false;
              }else if(zip.length < 5 )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Zipcode should be of 5 digits."); 
                $("#tbzipcode").focus();
                return false;
              }

              var addon =  $("#tbaddon").val();  
              addon = $.trim(addon);
              if(addon == null || addon == ""  )
              {
                /*$("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Add-ons should not be blank."); 
                $("#tbaddon").focus();
                return false;*/
              }else {
                if(isNaN(addon)  )
                {
                  $("#msginfo").addClass("alert alert-danger"); 
                  $("#msginfo").text("Add-ons should be numeric only."); 
                  $("#tbaddon").focus();
                  return false;
                }else if(addon.length < 4 )
                {
                  $("#msginfo").addClass("alert alert-danger"); 
                  $("#msginfo").text("Add-ons should be of 4 digits."); 
                  $("#tbaddon").focus();
                  return false;
                }
              }

              

              var memtype =  $("#tbmemtype").val();  
              //alert($(this).attr("id"));
              if($(this).attr("id") != 'btnedit'){
                  if(memtype == null || memtype == "Membership Type"  )
                  {
                    $("#msginfo").addClass("alert alert-danger"); 
                    $("#msginfo").text("Please select a Membership Type"); 
                    $("#tbmemtype").focus();
                    return false;
                  }
                  var username =  $("#tbusername").val();
                    username = $.trim(username);
                    if(username == null || username == ""  )
                    {
                      $("#msginfo").addClass("alert alert-danger"); 
                      $("#msginfo").text("Username should not be blank."); 
                      $("#tbusername").focus();
                      return false;
                    }else{
                     
                        var pattern = new RegExp(/[~"`!#$%\^&*+=\-\[\]\\';,/{}|\\:<>\?]/); 
                        if (pattern.test(username)) {
                         $("#msginfo").addClass("alert alert-danger"); 
                         $("#msginfo").text("Please only use standard alphanumerics, underscore and dot.");
                          return false;
                       }
                    
                  } 

                  var password =  $("#tbpassword").val(); 
                  password = $.trim(password);
                  if(password == null || password == ""  )
                  {
                    $("#msginfo").addClass("alert alert-danger"); 
                    $("#msginfo").text("password should not be blank."); 
                    $("#tbpassword").focus();
                    return false;
                  }else if(password.length < 6 )
                    {
                      $("#msginfo").addClass("alert alert-danger"); 
                      $("#msginfo").text("Password should contain minimum 6 character."); 
                      $("#password").focus();
                      return false;
                    } else{
                    /*$("#msginfo").attr('class',"alert alert-success"); 
                    $("#msginfo").text("niravshsh");  */
                     $("#msginfo").empty();
                      $("#msginfo").removeClass("alert alert-danger"); 
                    return true;
                  }
              }
    });

    
    $("#tbfirstname,#tblastName,#tbcity").keydown(function (e) {
          //alert("helo");
          //!(/^[A-z&#209;&#241;0-9]*$/i).test(f.value)?f.value = f.value.replace(/[^A-z&#209;&#241;0-9]/ig,''):null;
          //if( /[^a-zA-Z]/.test( e ) ) {
          if (e.which == 8 || e.which == 32 || e.which == 37 || e.which == 39 ||
             (e.which > 64 && e.which < 91) || 
             (e.which > 96 && e.which < 123) ||
              e.which == 9) {
                return;      
          }else{
            e.preventDefault();
            
          }
    });

    $("#tbusername").keydown(function (e) {
      
       // alert(e.which);
          //!(/^[A-z&#209;&#241;0-9]*$/i).test(f.value)?f.value = f.value.replace(/[^A-z&#209;&#241;0-9]/ig,''):null;
          if (e.which == 8 || e.which == 95 || e.which == 190 ||  e.which == 16 || e.which == 189 ||
            (e.which > 47 && e.which < 58) ||
             (e.which > 64 && e.which < 91) || 
             (e.which > 96 && e.which < 123) ||
              e.which == 9) {
                return;      
          }else{
            e.preventDefault();
            
          }
    });

    $("#tbpassword").keydown(function (e) {
          //alert("helo");
          //!(/^[A-z&#209;&#241;0-9]*$/i).test(f.value)?f.value = f.value.replace(/[^A-z&#209;&#241;0-9]/ig,''):null;
          if (e.which == 32) {
            e.preventDefault();
                     
          }else{
            return; 
            
          }
    });

    $("#tbzipcode,#tbaddon").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $("#tbusername").blur(function() {
     // alert("called onblur");
          var data = {};
          data.username = $(this).val();
                 
          var ajax_url = "/IsUsernameavailable";      
                  
            
          $.ajax({
              type: "POST",
              url:ajax_url,
              data: JSON.stringify(data),
              contentType: 'application/json',
                     
              success: function(output_string) 
              {   
              //alert("output"+output_string[0].username);    
                if(!jQuery.isEmptyObject(output_string)){
                 // alert("output"+output_string[0].username);  
                   $("#msginfo").addClass("alert alert-danger"); 
                  $("#msginfo").text("Username already exist. Please try again."); 
                  $("#tbusername").focus();
                  return false;

                }else{
                  
                  $("#msginfo").empty();
                  $("#msginfo").removeClass("alert alert-danger"); 
                  $("#tbpassword").focus();

                }
                          
                
              },
              error: function (error) {
                  alert('Error');
              }
          }); 
    });

});