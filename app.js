let express = require('express');
let app =express();
let path =require('path');
let session = require('express-session');
let cookie = require('cookie-parser')
let flash = require('connect-flash');

app.use(express.static(path.join(__dirname,'public')))

app.use(express.json());
app.use(express.urlencoded({extended:false}))

//setting cookie parser, sessions and flash
app.use(cookie('secretCookieMade'))
app.use(session({
    secret:'somethingSecret',
    cookie:{ maxAge:6000 },
    resave:true,
    saveUninitialized:false
}))
app.use(flash());

//setting the view engine
app.set('view engine','ejs');

// To get the login page
app.get('/',(req,res)=>{
    let name = req.flash('user')
   res.render('login',{name});
})
//to post the login page
app.post('/',(req,res)=>{
    let {name} = req.body;
   req.flash('user',name)
    res.redirect('/')
})


app.listen(3000,()=>console.log('http://localhost:3000'))