const express=require('express');
const app=express();
const PORT=process.env.PORT ||4000;

app.use(express.static('./public'));

const server=app.listen(PORT,()=>{
    console.log(`chat server on port ${PORT} `);
})