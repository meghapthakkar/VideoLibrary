// Use for Loading Category wise movies on index page.
var movieBoxTitle;

function getMoviesByCategory(categoryId,category){
	console.log(categoryId);
	console.log('Category_____'+category);
	var url = 'moviesByCategory/'+categoryId;
	$.get(url, function(movieList) {
		$('#movieBlock').html(movieList);
		movieBoxTitle = category+' Movies';
		$("#movieBoxTitle").text(movieBoxTitle);
		
	});
}

// Search movie on index

function validateSearch(){
	
	var searchStr = $.trim($('#searchStr').val());
	if(searchStr != null && searchStr != '')
	{	
		console.log(searchStr);
		var url = '/searchMovies/'+searchStr;
		$.get(url, function(movieList) {
			$('#movieBlock').html(movieList);
			movieBoxTitle = 'Search Results for : '+searchStr;
			$("#movieBoxTitle").text(movieBoxTitle);

			
		});
	}
}

// navigateMovieList on index

function navigateMovieList(dir){
	console.log("Direction_______"+dir);
	var url = '/navigateMovieList/'+dir;
	$.get(url, function(movieList) {
		$('#movieBlock').html(movieList);
		$("#movieBoxTitle").text(movieBoxTitle);
		
	});
}

function display_normal_cus(){
	$.get('/display_normal_customer', function(normalCustomers) {
		var json = JSON.parse(normalCustomers);
		
		var form = "<table class='table'><tr class='info'><td>Membership No</td>"+
        "<td>Customer Name</td></tr>";
        for(var i = 0 ; i < json.length ; i++){
        	var link = "'/admin_display_individual_customers?"+json[i].username+"'";
        	
        	form += "<tr class='info'><td>"+json[i].membership_no+"</td> <td class='info'><a href= "+link+">"+ json[i].firstname+"</a></td></tr>";
        	
        }
       form += "</table>";
       
    //$('#cust_info').hide();
    //$('#cust_info').attr('style', 'display: block;');
    $('#cust_info').empty();
   	$('#cust_info').append(form);
   	$('#idtitle').text("Customer Details (Simple)");
	});
}

function display_premium_cust(){
	$.get('/display_premium_customer', function(premiumCustomers) {
		var json = JSON.parse(premiumCustomers);
		
		var form = "<table class='table'><tr class='info'><td>Membership No</td>"+
        "<td>Customer Name</td></tr>";
        for(var i = 0 ; i < json.length ; i++){
        	var link = "/admin_display_individual_customers?"+json[i].username;
        	console.log(link);
        	form += "<tr class='info'><td>"+json[i].membership_no+"</td> <td class='info'><a href= "+link+">"+ json[i].firstname+"</a></td></tr>";
        	console.log(link);
        }
       form += "</table>";
       console.log("for____" +  form);
    //$('#cust_info').hide();
    //$('#cust_info').attr('style', 'display: block;');
    $('#cust_info').empty();
   	$('#cust_info').append(form);
   	$('#idtitle').text("Customer Details (Premium)");
	});
	
}
