/**
 * New node file
 */
function addbalancePage(username){
	var amount = $('#amount').val();
	//alert(amount);
	if(!(amount == "" || amount == null)){
		//alert("lollzz");
		$.post("/addBalance" , {username:username , amount:amount},function(){
			
			location.reload();
            alert("balance added");
		});
	}else if(amount == ""){
		
	}else{
		$.post("/addBalance" , {username:username , amount:10000},function(){
			
			location.reload();
			alert("subscription renewed");
		});
	}
	
	
}