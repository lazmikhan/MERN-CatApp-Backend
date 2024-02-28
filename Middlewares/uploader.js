const multer = require('multer');
const storage = multer.diskStorage(
{
    destination:"images/",
    filename:(req, file,cb)=>{
        const uniqueSuffix = Date.now()+ '-'+ Math.round(Math.random()+1E9)
        cb(null,uniqueSuffix+'-'+file.originalname)
    }
}

);
const path = require('path');
const uploader = multer({storage:storage
,fileFilter:(req, file, cb)=>{
    const supportedImage =/png|jpg|jpeg/;
    const extension = path.extname(file.originalname);
    if(supportedImage.test(extension))
    {
        cb(null,true);
    }else{
        cb(new Error("must be a png/jpg"));
    }
}, limits:
{
    fileSize:50000000
}
});

module.exports=uploader;