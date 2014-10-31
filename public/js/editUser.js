/**
 * New node file
 */
function edituser(){
	//console.log("edit username");
	//alert(username);
	//$(document).find("#EditUser").show();//css("visibility","visible");
	var uid=$("#uid").val();
	var username=$("#username").val();
	var firstname=$("#firstname").val();
	var lastname=$("#lastname").val();
	var addressline1=$("#addressline1").val();
	var addressline2=$("#addressline2").val();
	var city=$("#city").val();
	var state=$("#state").val();
	var zipcode=$("#zipcode").val();
	$('#displayData').empty();
	//$('#').empty();
	data=" <form method='post' action='/updateUserDetails'>"+
        "<b>FirstName:</b><br/><input type='text' value='"+firstname+"' name='FirstName'> <br/>"+
        "<b>LastName:</b> <br/><input type='text' value='"+lastname+"' name='LastName'>  <br/>"+
        "<b>Address Line 1:</b><br/> <input type='text' value='"+addressline1+"' name='Address1'> <br/>"+
        "<b>Address Line 2:</b><br/><input type='text' value='"+addressline2+"' name='Address2'><br/>"+
        "<b>city: </b><br/><input type='text' value='"+city+"' name='city'> <br/>"+
        "<b>state:</b> <br/><input type='text' value='"+state+"' name='state'> <br/>"+
        "<b>zipcode: </b><br/><input type='text' value='"+zipcode+"' name='zipcode'> <br/>"+
        "<input type='submit' name='button' id='btnsignup' value='Edit'>"+
        "<input type='hidden' name='uid' value="+uid+">"+
        "</form>";
       
	$('#displayData').append(data);
	//$.get("/../../views/EditUserForm.ejs", function (data) {
      // $("#displayData").append(data);
    //});
	//$('#displayData').append
	
	//$('#EditUserForm').style.visibility='visible';
}
