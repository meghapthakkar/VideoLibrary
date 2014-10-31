$(document).ready(function()
{

   //$("#dpnmoviecategory").multiselect();

   /*$("#dpnmoviecategory").blur(function(){
      var x = $(this).val();

      alert(x +"---" +x[0]+"---" + x[1]);
   });*/


   $("#btnaddmovie").click(function () 
              {    
                //$("#msginfo").addClass("alert alert-success"); 
              //$("#msginfo").addClass("alert alert-danger"); 
              //$("#msginfo").text("nirav");  
              var fname =  $("#tbmoviename").val(); 
              fname = $.trim(fname);
              //alert(fname);
              if(fname == null || fname == ""  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("MovieName should not be blank."); 
                $("#tbmoviename").focus();
                return false;
              }


              var lname =  $("#tbbanner").val();
              lname = $.trim(lname);
              if(lname == null || lname == ""  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Banner should not be blank."); 
                $("#tbbanner").focus();
                return false;
              }
              

              var zip =  $("#tbreleaseyear").val();  
              zip = $.trim(zip);
              if(zip == null || zip == ""  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Release year should not be blank."); 
                $("#tbreleaseyear").focus();
                return false;
              }else if(isNaN(zip)  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Release year should be numeric only."); 
                $("#tbreleaseyear").focus();
                return false;
              }else if(zip.length < 4 )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Release year should be of 4 digits."); 
                $("#tbreleaseyear").focus();
                return false;
              }

              var memtype =  $("#dpnmoviecategory").val();  
              /*alert(memtype);
              return false;*/
              if(memtype == null || memtype == "Movie Category"  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Please select a Movie Category"); 
                $("#dpnmoviecategory").focus();
                return false;
              }

              var rent =  $("#tbrent").val();
              rent = $.trim(rent);
              if(rent == null || rent == ""  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Rent should not be blank."); 
                $("#tbrent").focus();
                return false;
              }else if(isNaN(rent)  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Rent should be numeric only."); 
                $("#tbrent").focus();
                return false;
              } 
              
              var copy =  $("#tbcopy").val(); 
              copy = $.trim(copy);
              if(copy == null || copy == ""  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Copies should not be blank."); 
                $("#tbcopy").focus();
                return false;
              }else if(isNaN(copy)  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Copies should be numeric only."); 
                $("#tbcopy").focus();
                return false;
              } else{
                /*$("#msginfo").attr('class',"alert alert-success"); 
                $("#msginfo").text("niravshsh");  
                 $("#msginfo").empty();
                  $("#msginfo").removeClass("alert alert-danger"); 
                return false;*/

                  var data = {};
                  //data.username = $(this).val();
                  data.movid = $("#hdnid").val();
                  data.moviename = $("#tbmoviename").val();
                  data.banner = $("#tbbanner").val();
                  data.mcat = $("#dpnmoviecategory").val();
                  data.rent = $("#tbrent").val();
                  data.mdate = $("#tbreleaseyear").val();
                  data.copy = $("#tbcopy").val();

                  var ajax_url = "/InsertMovie";   
                  $.ajax({
                      type: "POST",
                      url:ajax_url,
                      data: JSON.stringify(data),
                      contentType: 'application/json',
                             
                      success: function(output_string) 
                      {   
                          /*location.reload();*/
                          $("#msginfo").attr('class',"alert alert-success"); 
                          $("#msginfo").text("Movie data added successfully"); 
                          clear();

                      },
                      error: function (error) {
                          $("#msginfo").attr('class',"alert alert-danger"); 
                          $("#msginfo").text("Some error occured during inserting movie"); 
                      }
                  }); 

              }
           
    });

    
  function clear(){
     $("#hdnid").val("");
     $("#tbmoviename").val("");
     $("#tbbanner").val("");
     $("#dpnmoviecategory").val("");
     $("#tbrent").val("");
     $("#tbreleaseyear").val("");
     $("#tbcopy").val("");
  }

    $("#btnupdatemovie").click(function () 
              {    
                //$("#msginfo").addClass("alert alert-success"); 
              //$("#msginfo").addClass("alert alert-danger"); 
              //$("#msginfo").text("nirav");  
              var fname =  $("#tbmoviename").val(); 
              fname = $.trim(fname);
              //alert(fname);
              if(fname == null || fname == ""  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("MovieName should not be blank."); 
                $("#tbmoviename").focus();
                return false;
              }


              var lname =  $("#tbbanner").val();
              lname = $.trim(lname);
              if(lname == null || lname == ""  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Banner should not be blank."); 
                $("#tbbanner").focus();
                return false;
              }
              

              var zip =  $("#tbreleaseyear").val();  
              zip = $.trim(zip);
              if(zip == null || zip == ""  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Release year should not be blank."); 
                $("#tbreleaseyear").focus();
                return false;
              }else if(isNaN(zip)  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Release year should be numeric only."); 
                $("#tbreleaseyear").focus();
                return false;
              }else if(zip.length < 4 )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Release year should be of 4 digits."); 
                $("#tbreleaseyear").focus();
                return false;
              }

              var memtype =  $("#dpnmoviecategory").val();  
              if(memtype == null || memtype == "Movie Category"  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Please select a Movie Category"); 
                $("#dpnmoviecategory").focus();
                return false;
              }

              var rent =  $("#tbrent").val();
              rent = $.trim(rent);
              if(rent == null || rent == ""  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Rent should not be blank."); 
                $("#tbrent").focus();
                return false;
              }else if(isNaN(rent)  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Rent should be numeric only."); 
                $("#tbrent").focus();
                return false;
              } 
              
              var copy =  $("#tbcopy").val(); 
              copy = $.trim(copy);
              if(copy == null || copy == ""  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Copies should not be blank."); 
                $("#tbcopy").focus();
                return false;
              }else if(isNaN(copy)  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Copies should be numeric only."); 
                $("#tbcopy").focus();
                return false;
              } else{
                /*$("#msginfo").attr('class',"alert alert-success"); 
                $("#msginfo").text("niravshsh");  
                 $("#msginfo").empty();
                  $("#msginfo").removeClass("alert alert-danger"); 
                return false;*/
            	  var movid = $("#hdnid").val();
                  var data = {};
                  data.username = $(this).val();
                  data.movid = $("#hdnid").val();
                  data.moviename = $("#tbmoviename").val();;
                  data.banner = $("#tbbanner").val();;
                  data.mcat = $("#dpnmoviecategory").val();;
                  data.rent = $("#tbrent").val();;
                  data.mdate = $("#tbreleaseyear").val();;
                  data.copy = $("#tbcopy").val();;

                  var ajax_url = "/UpdateMovie";   
                  $.ajax({
                      type: "POST",
                      url:ajax_url,
                      data: JSON.stringify(data),
                      contentType: 'application/json',
                             
                      success: function(output_string) 
                      {   
                         // location.reload();
                         // $("#msginfo").attr('class',"alert alert-success"); 
                          //$("#msginfo").text("Movie data updates successfully");
                          alert("Movie data updates successfully"); 
                          location.href = "/admin_individual_movies?"+movid;

                      },
                      error: function (error) {
                          $("#msginfo").attr('class',"alert alert-danger"); 
                          $("#msginfo").text("Some error occured during updating movie"); 
                      }
                  }); 
              }
           
    });
    

    $("#tbmoviename,#tbbanner").keydown(function (e) {
          //alert(e.which);
          //!(/^[A-z&#209;&#241;0-9]*$/i).test(f.value)?f.value = f.value.replace(/[^A-z&#209;&#241;0-9]/ig,''):null;
          if (e.which == 8 || e.which == 32 || e.which == 37 || e.which == 39 ||
             (e.which > 64 && e.which < 91) || (e.which > 47 && e.which < 58) ||
             (e.which > 96 && e.which < 123) ||
              e.which == 9) {
                return;      
          }else{
            e.preventDefault();
            
          }
    });

    

    $("#tbcopy,#tbrent").keydown(function (e) {
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


    $("#tbreleaseyear").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
       // alert(e.which);
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.keycode== 190 || e.keyCode == 16 || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $("#tbmoviename").blur(function() {
     // alert("called onblur");
          var data = {};
          data.moviename = $(this).val();
                 
          var ajax_url = "/IsMovienameavailable";      
                  
          var mvname = $(this).val();
          var hdnmvname = $("#hdnmvname").val();
          //alert(mvname);
         // alert(hdnmvname);


          if(mvname != hdnmvname){
             // alert("in if ");
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
                      $("#msginfo").text("Movie already exists. Please try again."); 
                      $("#tbmoviename").focus();
                      return false;

                    }else{
                      //alert("vishal");
                      $("#msginfo").empty();
                      $("#msginfo").removeClass("alert alert-danger"); 
                      $("#tbbanner").focus();

                    }
                              
                    
                  },
                  error: function (error) {
                      alert('Error');
                  }
              }); 
          }

          
    });


function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


});

