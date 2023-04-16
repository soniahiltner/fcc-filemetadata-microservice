var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer = require("multer");

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//Setting storage engine
const storageEngine = multer.diskStorage({
  destination: 'public/uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  }
});
const upload = multer({ storage: storageEngine });

app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
  const file = req.file;
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  })
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
