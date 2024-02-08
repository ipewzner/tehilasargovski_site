const express = require('express');
const path = require('path');
const cors= require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
//const functions = require('./public/scripts');
// Define the directory for static files (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

const allowHost=['https://thiala-df290042abc7.herokuapp.com/','https://tehilasargovski.com/']

app.use(cors({
  origin: allowHost,
 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //credentials:true,
}));

// Route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.post("/", (req, res) => {
  console.log("in post");
 // console.log("posted: ",req.body);
 // receiveData(req.body);
 res.status(200).send("work")
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});