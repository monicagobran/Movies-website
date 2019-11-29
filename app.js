//we have the current session username,start by making addmovies 3ashan yeb2a fe wishlist array
var accountexists=false;
var express = require('express');
var movieIn=false;
//
// const redis = require('redis');
// const redisStore = require('connect-redis')(session);
// const client  = redis.createClient();
var session=require('express-session');

// client.on('connect', function() {
//   console.log('connected');
// });
//
var path = require('path');
var fs = require('fs');
var app = express();

let loadUsers =function(){
  try{
  
   let bufferedData=fs.readFileSync('users.json')//we will create it later (Binary DATA
   let strDATA=bufferedData.toString() //(JSON STRING)--> we want to convert it into object
   let usersArray=JSON.parse(strDATA)
   return usersArray}
   catch(error){
       return [] //di law mal2tsh file esmo task maedinish errror create an empty [] w push f el haga w ba3den ha3mel write f el adding f keda keda hacreate aw y-rewtite 3lih
   }

}

//var currentuser;


// view engine setup
// the following says that all the html/ejs files are in this path (inside views folder)
app.set('views', path.join(__dirname, 'views')); // _dirname: var name for the folder which contains app.js
app.set('view engine', 'ejs');
//


app.use(session({
  secret: 'ssshhhhh',
  // create new redis store.
  //store: new redisStore({ host: 'localhost', port: 3000, client: client,ttl : 260}),
  saveUninitialized: false,
  resave: false,
  sess:""
}));
//


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public'))); //says that public contains all static files

//GENERAL NOTES
//everytime you edit the code: save, ctrl+c , node app.js
//run when directory is myproject (cd myproject)
//to return one folder in directory : cd ..
//res: repond to user
//req: request/ input from user

//**everything above this line does not matter and will not be changed**




app.get('/', function(req, res) { //write for each html file , res=response to user
  res.render('login'); //render a html file
 // sess=req.session;

  //console.log( sess.username);


 
});
//STEP 1




 let addUsers=function(user){//task el ha5do men el user
let Ulist = loadUsers()
for(i=0;i<Ulist.length;i++){
  var obj = Ulist[i];
  if(obj.username==user.username){
    accountexists=true;
    //alert("Username already exists :(");
    
  }

}
if (accountexists==false){
Ulist.push(user)
fs.writeFileSync('users.json',JSON.stringify(Ulist));
 }

}




//

//STEP 2
app.post('/register', function(req, res) { 

  var newUsername = req.body.username ;
  var newUserPassword = req.body.password ;
  var newUserWatchlist=[];
  var newUser = {username: newUsername, password: newUserPassword,UserWatchlist:newUserWatchlist};

  
  if(newUsername==""||newUserPassword==""){
    res.send("No Username or password were entered");
  }
    
  else{

  addUsers(newUser);

  if ((accountexists)==false)
  
  res.send("registration was successful ");
  else
  
 res.send("username already exist :( "); 
  accountexists=false;
}});
//
// app.get('/',function(req,res){
//   sess=req.session;

 
//   console.log( sess.username);
// });


//

app.get('/registration', function(req, res) { 
  res.render('registration');
  users: loadUsers();
});
// app.get('/games', function(req, res) { 
//   res.send("let's play!"); //send a string
// }); 
app.post('/', function(req, res) { 

  var existingUsername = req.body.username ;
  var existingUserPassword = req.body.password ;
  var flag=false;
  let Userslist = loadUsers()
for(i=0;i<Userslist.length;i++){
  var obj = Userslist[i];
  if(obj.username==existingUsername && obj.password==existingUserPassword){
    req.session.sess=req.body.username;
    myVar=req.session.sess;
    res.render('home'); 
    //alert("Username already exists :(");
    flag=true;
  }


}
if(flag==false)
{
res.send("Incorrect username or password");
}

//currentuser =sess.username;

console.log(req.session.sess);///WE NOW HAVE THE CURRENT LOGGED IN USER TO USE TO GET HIS WISHLISHT

 
});

app.get('/horror', function(req, res) { 
  res.render('horror');
});
app.get('/drama', function(req, res) { 
  res.render('drama');
  console.log(req.session.sess);
});
app.get('/action', function(req, res) { 
  res.render('action');
});
app.get('/watchlist', function(req, res) { 
  console.log(req.session.sess)
  app.locals.myVar;
  myVar=req.session.sess
  res.render('watchlist',{
    myUlist:loadUsers()
  });
});

app.get('/scream', function(req, res) { 
  res.render('scream');
});

app.get('/conjuring', function(req, res) { 
  res.render('conjuring');
});
app.get('/darkknight', function(req, res) { 
  res.render('darkknight');
});
app.get('/fightclub', function(req, res) { 
  res.render('fightclub');
});
app.get('/fightclub2', function(req, res) { 
  res.render('fightclub2');
});
app.get('/godfather', function(req, res) { 
  res.render('godfather');
});
app.get('/godfather2', function(req, res) { 
  res.render('godfather2');
});


///ADD MOVIE
// let addmovie=function(){
//   console.log('hello');
//   let Ulist = loadUsers()
//   for(i=0;i<Ulist.length;i++){
//     var obj = Ulist[i];
//     if(obj.username==sess.username){
//       //obj.UserWatchlist.push(movie);
//      // console.log(movie);
//     }


// }
// }
//  <button   id="watchlist" class="btn btn-secondary ml-3"  >Add to Watchlist </button>

app.post('/addingconj', function(req, res) { 
  
  let Ulist = loadUsers()
    for(i=0;i<Ulist.length;i++){
       var obj = Ulist[i];
      // console.log(obj.username);
       console.log(req.session.sess);

      if(obj.username==req.session.sess){
        console.log(obj.UserWatchlist.length)
        for(j=0;j<obj.UserWatchlist.length;j++){
          if(obj.UserWatchlist[j]=="conjuring"){
       
       
       
            movieIn=true;
          }
    
        }
        if(!movieIn){
          obj.UserWatchlist.push("conjuring");
    
          fs.writeFileSync('users.json',JSON.stringify(Ulist));
          
        }
        else{
          res.send("Movie is already in your watchlist");
          movieIn=false;
        }
        


       

  //      // console.log(movie);
       }
  
  
  }


})

app.post('/addingfightclub',function(req,res){
  console.log(req.session.sess);
  let Ulist = loadUsers()
  for(i=0;i<Ulist.length;i++){
     var obj = Ulist[i];
     console.log(obj.username);
     console.log(req.session.sess);

    if(obj.username==req.session.sess){
      console.log('hi ');
      console.log(obj.UserWatchlist.length)
      for(j=0;j<obj.UserWatchlist.length;j++){
        if(obj.UserWatchlist[j]=="fightclub"){
          movieIn=true;
        }
  
      }
      if(!movieIn){
        obj.UserWatchlist.push("fightclub");
  
        fs.writeFileSync('users.json',JSON.stringify(Ulist));
        
      }
      else{
        res.send("Movie is already in your watchlist");
        movieIn=false;
      }
      


     

//      // console.log(movie);
     }


}

})

app.post('/addingdark',function(req,res){
  console.log(req.session.sess);
  let Ulist = loadUsers()
  for(i=0;i<Ulist.length;i++){
     var obj = Ulist[i];
     console.log(obj.username);
     console.log(req.session.sess);

    if(obj.username==req.session.sess){
      console.log('hi ');
      console.log(obj.UserWatchlist.length)
      for(j=0;j<obj.UserWatchlist.length;j++){
        if(obj.UserWatchlist[j]=="darkknight"){
          movieIn=true;
        }
  
      }
      if(!movieIn){
        obj.UserWatchlist.push("darkknight");
  
        fs.writeFileSync('users.json',JSON.stringify(Ulist));
        
      }
      else{
        res.send("Movie is already in your watchlist");
        movieIn=false;
      }
     

//      // console.log(movie);
     }


}

})



app.post('/addinggod1',function(req,res){
  console.log(req.session.sess);
  let Ulist = loadUsers()
  for(i=0;i<Ulist.length;i++){
     var obj = Ulist[i];
     console.log(obj.username);
     console.log(req.session.sess);

    if(obj.username==req.session.sess){
      console.log('hi ');
      console.log(obj.UserWatchlist.length)
      for(j=0;j<obj.UserWatchlist.length;j++){
        if(obj.UserWatchlist[j]=="godfather"){
          movieIn=true;
        }
  
      }
      if(!movieIn){
        obj.UserWatchlist.push("godfather");
  
        fs.writeFileSync('users.json',JSON.stringify(Ulist));
        
      }
      else{
        res.send("Movie is already in your watchlist");
        movieIn=false;
      }
     

//      // console.log(movie);
     }


}

})


app.post('/addinggod2',function(req,res){
  console.log(req.session.sess);
  let Ulist = loadUsers()
  for(i=0;i<Ulist.length;i++){
     var obj = Ulist[i];
     console.log(obj.username);
     console.log(req.session.sess);

    if(obj.username==req.session.sess){
      console.log('hi ');
      console.log(obj.UserWatchlist.length)
      for(j=0;j<obj.UserWatchlist.length;j++){
        if(obj.UserWatchlist[j]=="godfather2"){
          movieIn=true;
        }
  
      }
      if(!movieIn){
        obj.UserWatchlist.push("godfather2");
  
        fs.writeFileSync('users.json',JSON.stringify(Ulist));
        
      }
      else{
        res.send("Movie is already in your watchlist");
        movieIn=false;
      }
     

//      // console.log(movie);
     }


}

})


app.post('/addscream',function(req,res){
  console.log(req.session.sess);
  let Ulist = loadUsers()
  for(i=0;i<Ulist.length;i++){
     var obj = Ulist[i];
     console.log(obj.username);
     console.log(req.session.sess);

    if(obj.username==req.session.sess){
      console.log('hi ');
      console.log(obj.UserWatchlist.length)
      for(j=0;j<obj.UserWatchlist.length;j++){
        if(obj.UserWatchlist[j]=="scream"){
          movieIn=true;
        }
  
      }
      if(!movieIn){
        obj.UserWatchlist.push("scream");
  
        fs.writeFileSync('users.json',JSON.stringify(Ulist));
        
      }
      else{
        res.send("Movie is already in your watchlist");
        movieIn=false;
      }
     

//      // console.log(movie);
     }


}

})














let Substring=function(aword){
  var result=[];
  var movieArray=['conjuring','darkknight','fightclub','godfather','godfather2','scream']
  for(i=0;i<movieArray.length;i++){
    var count=0;
    var mov=movieArray[i];
    for(j=0;j<movieArray[i].length;j++){
      if(mov.charAt(j)==aword.charAt(count) ) {
        count++
      }
      else{
        count=0;
      }
      if(count==aword.length){
        result.push(mov);
         
      }
    }
  }
  console.log(result)
  return result;
}



app.post('/search', function(req, res) { 

  var searchedWord = (req.body.Search).toLowerCase(); 
  var link='';
  
  if(searchedWord==""){
    res.send("No entered text");
  }
    
  else{

  if ((Substring(searchedWord)).length==0){
    res.send("Movie was not found ");
  }
  
  else
  {
    var movieArray=(Substring(searchedWord))
      for(i=0;i<movieArray.length;i++){
        link=link +" "+`<a href=${"/"+movieArray[i]}>${movieArray[i]} </a>`
      
    }
    res.send(link);
  }



}});











//**everything below this line does not matter and will not be changed**

if(process.env.PORT){ //if a process is undefined then it is false
  app.listen(process.env.PORT);
} else{
app.listen(3000);
}

module.exports = app;
