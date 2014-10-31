// Delete Item
		function deleteItem(movieId)
		{
		
  		//alert("movie id " + movieId);
		var confirmation = confirm('Are you sure you want to delete this item?');

  	
  		if (confirmation === true) {
  			var ajax_url= '/deleteMovie_redis' 
  			//$.post(url,{movieId:movieId});
  			
  			
  			var data = {};
            data.movid = movieId;
              
            $.ajax({
                type: "POST",
                url:ajax_url,
                data: JSON.stringify(data),
                contentType: 'application/json',
                       
                success: function(output_string) 
                {   
                	//alert(output_string);
                    /*if(output_string != "movie is rented...can not delete");
                    {*/
                    	 //alert("Movie data deleted successfully"); 
                       //alert("This movie is rented by a customer. You can not delete this movie");
                       
                         location.href = "/display_all_movies";

                    /*}else{
                    	
                    }*/
                         

                },
                error: function (error) {
                     alert("error occured while deleting movie");
                }
            });
  			
	}
  else {

    // If they said no to the confirm, do nothing
    return false;

  }

};