var http = require('http');

exports.validatesignup = function(req,res){
	//res.end("Inside Server side validatesignup ");
	console.log("Inside Server side validatesignup ");
              var alert = "";
              var fname =  req.param('tbfirstname').trim();
              var lname =  req.param('tblastName').trim();
              var add1 =  req.param('tbadd1').trim();
              var city =  req.param('tbcity').trim();
              var state =  req.param('dpnstate');
              var zip =  req.param('tbzipcode').trim();
              var addon =  req.param('tbaddon').trim();
              var memtype =  req.param('tbmemtype');
              var username =  req.param('tbusername').trim();
              var password =  req.param('tbpassword').trim();
              var stateArray = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KS","KY","ME","MD",
              "MA","MI","MN","MS","MO","MT","NE","NV","NJ","NM","NY","NC","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

              console.log("state : "+state);
              console.log("firstname---" + fname);
              //alert(fname);
              if(fname == null || fname == ""  )
              {
                console.log("inside is fname");
                alert += "Firstname should not be blank.\n"; 
                
              }

              if(lname == null || lname == ""  )
              {
               
               alert += "lastname should not be blank.\n"; 
               
              }

              
              
              if(add1 == null || add1 == ""  )
              {
                alert += "Addressline1 should not be blank.\n"; 
                
              } 


              if(city == null || city == ""  )
              {
                alert += "City should not be blank.\n"; 
               
              }
              
              
              /*if(state== 'undefined' || state == null || state == "State"  )
              {
                res.end("Please select a State"); 
                
              }else*/ 
              console.log(stateArray.indexOf(state));
              var x = stateArray.indexOf(state);
              if(x < 0){
                alert += "Please select proper State\n";
              }

              
              if(zip == null || zip == ""  )
              {
                alert +="Zipcode should not be blank.\n"; 
                
              }else if(isNaN(zip)  )
              {
                alert +="Zipcode should be NUMERIC ONLY.\n"; 
                
              }else if(zip.length < 5 )
              {
                alert +="Zipcode should be of 5 digits.\n"; 
                
              }

              
              if(addon == null || addon == ""  )
              {
                
              }else {
                if(isNaN(addon)  )
                {
                  alert +="Add-ons should be numeric only.\n"; 
                  
                }else if(addon.length < 4 )
                {
                  alert +="Add-ons should be of 4 digits.\n"; 
                  
                }
              }

              

              
              if(memtype == 'undefined' || memtype == null || memtype == "Membership Type"  )
              {
                alert +="Please select a Membership Type.\n"; 
                
              }

              
              if(username == null || username == ""  )
              {
                alert += "Username should not be blank.\n"; 
              }
              
              
              if(password == null || password == ""  )
              {
                alert += "password should not be blank.\n"; 
                
              }else if(password.length < 6 )
                {
                  alert +="Password should contain minimum 6 character.\n"; 
                  
                } 

                if(alert != ""){
                  res.end(alert);
                }
                else{
                	return true;
                
              }
           
   



   

}

/*module.exports = validateServerSignup;*/