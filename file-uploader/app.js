var express     = require('express');  
var mongoose    = require('mongoose');  
var multer      = require('multer');  
var path        = require('path');  
var excelModel    = require('./models/excelModel');  
var excelToJson = require('convert-excel-to-json');
var bodyParser  = require('body-parser');  
var storage = multer.diskStorage({  
destination:(req,file,cb)=>{  
cb(null,'./public/uploads');  
},  
filename:(req,file,cb)=>{  
cb(null,Date.now() + '-' + file.originalname);  
}  
});  
var upload = multer({storage:storage});  
//connect to db  
mongoose.connect('mongodb+srv://admin:Admin1995@testcluster.sg7rebz.mongodb.net/test',{useNewUrlParser:true})  
.then(()=>console.log('connected to db'))  
.catch((err)=>console.log(err))  
//init app  
var app = express();  
//set the template engine  
app.set('view engine','ejs');  
//fetch data from the request  
app.use(bodyParser.urlencoded({extended:false}));  
//static folder  
app.use(express.static(path.resolve(__dirname,'public')));  
//route for Home page
app.get('/', (req, res) => {
res.sendFile(__dirname + '/index.html');
});
// Upload excel file and import to mongodb
app.post('/uploadfile', upload.single("uploadfile"), (req, res) =>{
importExcelData2MongoDB(__dirname + '/public/uploads/' + req.file.filename);
console.log(res);
});
// Import Excel File to MongoDB database
function importExcelData2MongoDB(filePath){
// -> Read Excel File to Json Data
const excelData = excelToJson({
sourceFile: filePath,
// Header Row -> be skipped and will not be present at our result object.
header:{
rows: 1
},
// Mapping columns to keys
columnToKey: {
A: '_id',
B: 'name',
C: 'address',
D: 'age'
}
});
// -> Log Excel Data to Console
console.log(excelData);
/**
{ 
Customers:
[ 
{ _id: 1, name: 'Jack Smith', address: 'Massachusetts', age: 23 },
{ _id: 2, name: 'Adam Johnson', address: 'New York', age: 27 },
{ _id: 3, name: 'Katherin Carter', address: 'Washington DC', age: 26 },
{ _id: 4, name: 'Jack London', address: 'Nevada', age: 33 },
{ _id: 5, name: 'Jason Bourne', address: 'California', age: 36 } 
] 
}
*/  
// Insert Json-Object to MongoDB
excelModel.insertMany(excelData,(err,data)=>{  
if(err){  
console.log(err);  
}else{  
res.redirect('/');  
}  
}); 
fs.unlinkSync(filePath);
}
//assign port  
var port = process.env.PORT || 5000;  
app.listen(port,()=>console.log('server run at port '+port + __dirname));

module.exports = app;
