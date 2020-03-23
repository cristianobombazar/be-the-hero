const express = require('express');

const app = express();


app.get('/', (req, res) =>{
   return res.json({
       message: 'It Works'
   });
});

app.listen(3333, ()=> {
    console.log('Server started');
});