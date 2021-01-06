import express from 'express';
import mongoose from 'mongoose';
import cards from './dbCards.js';
import Cors from 'cors';

//app config
const app = express();
const port= process.env.PORT || 8001;
const connection_url="mongodb+srv://admin:R6sahOCOfeznhW95@cluster0.ol0yj.mongodb.net/tinderdb?retryWrites=true&w=majority";

//middleware
app.use(express.json());
app.use(Cors());
//DB config
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

//API Endpoints
app.get('/',(req,res) =>{
    res.status(200).send("Hello Universe!");
});
app.post('/tinder/card',(req,res) =>{
    const dbCard=req.body;

    cards.create(dbCard,(err,data)=>{
        if(err){
           res.status(500).send(err) 
        }else{
            res.status(201).send(data)
        }
    })
});

app.get('/tinder/card',(req,res) =>{
    const dbCard=req.body;

    cards.find((err,data)=>{
        if(err){
           res.status(500).send(err) 
        }else{
            res.status(200).send(data)
        }
    })
});

//Listener
app.listen(port,() => console.log(`listening on localhost: ${port}`));