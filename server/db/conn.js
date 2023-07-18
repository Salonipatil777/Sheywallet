
const mongoose = require('mongoose')

const DB = process.env.DB;
mongoose.set('strictQuery', false);
mongoose.connect(DB).then(()=>{
    console.log('connection success');
}).catch(()=>console.log('connection failed'))

