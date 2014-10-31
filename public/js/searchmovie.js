$(document).ready(function()
{

   $("#btnserachmovie").click(function () 
   {
   		  var mvname = $("#tbsearchmovie").val();
   		  mvname = $.trim(mvname);
   		  if(mvname == 'undefined' || mvname == null || mvname == ""){
   		  		$("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Search Movie should not be blank."); 
                $("#tbsearchmovie").focus();
                return false;
   		  }else{
   		  		$("#msginfo").empty();
   		  		$("#msginfo").removeClass("alert alert-danger");
   		  		return true;
   		  }
   });

   $("#finduser").click(function () 
   {

        var inp = $("#customerInfo").val();;
          
         
           //var inp = String.fromCharCode(event.keyCode);
           if (/[a-zA-Z0-9_]/.test(inp)){
              
           }else{
              alert("input must be a letter, number, underscore"); 
           }
   });
   
   $("#btnserachuser").click(function () 
   {
        var mvname = $("#tbsearchuser").val();
        mvname = $.trim(mvname);
        if(mvname == 'undefined' || mvname == null || mvname == ""){
            $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Search Movie should not be blank."); 
                $("#tbsearchuser").focus();
                return false;
        }else{
            $("#msginfo").empty();
            $("#msginfo").removeClass("alert alert-danger");
            return true;
        }
   });
   
});