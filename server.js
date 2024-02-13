const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
require("dotenv").config();
const bodyParser = require('body-parser'); // Require body-parser

const app = express();
const upload = multer();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
//const script = require('./public/script');
// Define the directory for static files (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

const allowHost = ['https://thiala-df290042abc7.herokuapp.com/', 'https://tehilasargovski.com/']

app.use(cors({
  origin: allowHost,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //credentials:true,
}));

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'index.html')); });

app.post("/", upload.none(), (req, res) => {
  console.log("in post");
  receiveData(req.body) ?  res.status(200).send("work") : res.status(200).send("failure sending data!");
});

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`); });





function receiveData(indata) {

  console.log('r1');
  console.log("Recived data from API:", indata);
  
  const data = new FormData();
  
  data.append('publicid',  process.env.PUBLIC_ID); 
  
  data.append('lastname', indata.lastname ? indata.lastname : '');
  data.append('mobile', indata.mobile ? indata.mobile : '');
  data.append('email', indata.email ? indata.email : '');
  
  console.log('r2');

  // Create fetch options
  const options = {
    method: 'POST',
    body: data
  };


  console.log("send data to API:");

  for (let entry of data.entries()) {
    console.log(entry[0] + ': ' + entry[1]);
  }
  console.log('r3');
  
  
  // sendData(options)
  fetch('https://netanel2.scallacrm.co.il/modules/Webforms/capture.php', options)
  .then(response => {
    console.log('r4');
    if (!response.ok) { throw new Error('Network response was not ok'); }
    console.log('r5');
    return response.json();
    console.log('r6');
  })
  .then(data => {
      console.log('r7');
      console.log('Data sent successfully:', data);
      console.log('r8');
    })
    .catch(error => {
      console.log('r9');
      console.error('Error sending data:', error);
      console.log('r10');
    });
}

