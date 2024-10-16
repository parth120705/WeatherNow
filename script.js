const express=require('express');
const app=express();
const path=require('path');
const userModel = require('./models/user')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/createuser',(req,res)=>{
    res.render('create');
})

app.get('/login',(req,res)=>{
    res.render('login');
})

app.post('/create',async(req,res)=>{
    let{fullname,email,password,city}=req.body;
    await userModel.create({
        fullname,
        email,
        password,
        city
    })
    res.redirect('login');
})


app.listen(3000);