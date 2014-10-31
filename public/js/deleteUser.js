
function deleteUser(customer_id){
	
	//alert("customer_id "+ customer_id);
	var confirmation = confirm('Are you sure you want to delete this User?');

  	
		if (confirmation === true) {
			var ajax_url= '/deleteUser' 
			//$.post(url,{movieId:movieId});
			
			
			var data = {};
            data.customer_id = customer_id;
          
          $.post("/ifCustomerHasRented" , {customer_id:customer_id},function(isRented){
            console.log("isRented " + isRented);
               if(isRented == true){
                  console.log("you can not delete this customer...");
                 alert("you can not delete this customer...");

               } else{
                 $.ajax({
                type: "POST",
                url:ajax_url,
                data: JSON.stringify(data),
                contentType: 'application/json',
                       
                success: function(output_string) 
                {   
                   
                    alert("user  deleted successfully"); 
                    location.href = "/admin_display_customers";

                },
                error: function (error) {
                     
                }
            });
               }
          })
       
			
}
else {

// If they said no to the confirm, do nothing
return false;

}
}