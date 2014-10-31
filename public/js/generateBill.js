function generateBill(customer_id){
    
    /*alert("in the bill");
    alert(customer_id );*/
    $.post('/generatebill', {customer_id : customer_id} ,function(rows) {
    	console.log(rows.length);
		var json = JSON.parse(rows);
		var form = "<table class='table'>"
		for(var i = 0 ; i < json.length ; i++){
		 form += "<tr class='info'><b>Bill </b></tr><tr class='info'><td>Username</td><td>"+json[i].username+"</td></tr>";
		 if(json[i].movie_name == null){
		 	form += "<tr class='info'><td>Currently Rented Movies</td><td>Not Rented Any Movies Yet</td></tr> ";
		 }  else{
		 	form += "<tr class='info'><td>Currently Rented Movies</td><td>"+json[i].movie_name+"</td></tr> ";
		 }
        
        
        
        if(json[i].member_type == '1'){
        	form += "<tr class='info'><td>MemberShip Type</td><td>Premium Customer</td></tr>";
              if(JSON.stringify(json[i].due_date) == null){
                 form += "<tr class='info'><td>Subscription Due Date</td><td>You have not subscibed yet</td></tr> ";
              }else{
                form += "<tr class='info'><td>Subscription Due Date</td><td>"+JSON.stringify(json[i].due_date)+"</td></tr> ";
              }
        	
        	
        }else{
            form += "<tr class='info'><td>MemberShip Type</td><td>Simple Customer</td></tr>";
            form += "<tr class='info'><td>Current Balance</td><td>"+json[i].balance+"</td></tr> "
        }
       
          	
        }
        form += "<tr class='info'><td><input value='Print' type='button' onclick='window.print();' class='btn btn-primary'></td><td>&nbsp;</td></tr>";
       form += "</table>";
       
    //$('#cust_info').hide();
    //$('#cust_info').attr('style', 'display: block;');
    $('#forBill').empty();
   	$('#forBill').append(form);
   	
	});

}


