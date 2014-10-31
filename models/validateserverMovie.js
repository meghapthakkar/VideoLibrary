var http = require('http');

exports.validateMovie = function(req,res){

            var fname  = req.body.moviename.trim();
            var lname  = req.body.banner.trim();
            var memtype  = req.body.mcat;
            var rent  = req.body.rent.trim();
            var zip  = req.body.mdate.trim();
            var copy  = req.body.copy.trim();


              
              if(fname == null || fname == ""  )
              {
                res.send("MovieName should not be blank."); 
                
              }


              
              if(lname == null || lname == ""  )
              {
                res.send("Banner should not be blank."); 
                
              }
              
              if(zip == null || zip == ""  )
              {
                res.send("Release year should not be blank."); 
                
              }else if(isNaN(zip)  )
              {
                res.send("Release year should be numeric only."); 
                
              }else if(zip.length < 4 )
              {
                res.send("Release year should be of 4 digits."); 
                
              }

              
              if(memtype == null || memtype == "Movie Category"  )
              {
                res.send("Please select a Movie Category"); 
                
              }

              
              if(rent == null || rent == ""  )
              {
                res.send("Rent should not be blank."); 
                
              }else if(isNaN(rent)  )
              {
                res.send("Rent should be numeric only."); 
                
              } 
              
              
              if(copy == null || copy == ""  )
              {
                res.send("Copies should not be blank."); 
                
              }else if(isNaN(copy)  )
              {
                res.send("Copies should be numeric only."); 
                
              } else{
                
                return true;
              }
             
 }