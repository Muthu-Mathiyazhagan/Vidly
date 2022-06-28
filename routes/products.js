const _ = require("lodash");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Product } = require("../models/product");
const multer = require('multer')              // multer will be used to handle the form data.
const Aws = require('aws-sdk')                // aws-sdk library will used to upload image to s3 bucket.
// const upload = multer({ dest: 'uploads/' })


router.use(express.json());

// creating the storage variable to upload the file and providing the destination folder, 
// if nothing is provided in the callback it will get uploaded in main directory

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
})

// below variable is define to check the type of file which is uploaded

const filefilter = (req, file, cb) => {
    console.log(`file.mimetype : ${file.mimetype}`);
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, true)
    }
}

// defining the upload variable for the configuration of photo being uploaded
const upload = multer({ storage: storage, fileFilter: filefilter });

// Now creating the S3 instance which will be used in uploading photo to s3 bucket.
const s3 = new Aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,              // accessKeyId that is stored in .env file
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET       // secretAccessKey is also store in .env file
})

// now how to handle the post request and to upload photo (upload photo using the key defined below in upload.single ie: productimage )
router.post('/', upload.single('productimage'), async (req, res) => {
    console.log("post called.!");
    console.log(`req.file : ${req.file}`)  // to check the data in the console that is being uploaded

    // Definning the params variable to uplaod the photo

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,      // bucket that we made earlier
        Key: req.file.originalname,               // Name of the image
        Body: req.file.buffer,                    // Body which will contain the image in buffer format
        ContentType: "image/jpeg"                 // Necessary to define the image content-type to view the photo in the browser with the link
    };

    console.log(`Params Bucket: ${params.Bucket}`);

    // uplaoding the photo using s3 instance and saving the link in the database.

    await s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).send({ "err": error })  // if we get any error while uploading error message will be returned.
        }


        // If not then below code will be executed

        console.log(`data : ${data}`)                      // this will give the information about the object in which photo is stored 
        console.log(`req.body.name : ${req.body.name}`);
        console.log(`req.body.price : ${req.body.price}`);
        // saving the information in the database.   
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            productImage: data.Location
        });
        product.save()
            .then(result => {
                res.status(200).send({
                    _id: result._id,
                    name: result.name,
                    price: result.price,
                    productImage: data.Location,
                })
            })
            .catch(err => {
                res.send({ message: err })
            })
    })
})

// Get all the product data from db 
router.get('/', async (req, res) => {
    try {
        console.log("hello")
        const products = await Product.find()

        console.log(products)
        res.send(products)
    } catch (err) {
        res.send({ message: err, m: "not working" })
    }
});

router.all('/presignedurl', async (req, res) => {

    console.log(req.body.fileName);
    console.log(req.body.expires);

    Aws.config.update({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
    const s3Params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.body.fileName,
        Expires: req.body.expires,
    };


    await getPresignUrl(s3, s3Params,res);
    /*
        await getPresignUrl(s3, s3Params).then((result) => {
            console.log(`result : ${result}`);
            if (result) return res.status(200).send(`result : ${result}`);
            return res.status(404).send(`result : ${result}`)
        }).catch((ex) => {
            return res.status(400).send(`EXception : ${ex}`)
    
        })
        */

});
async function getPresignUrl(s3, s3Params,res) {
    console.log("getPresignUrlcalled.!");
    try {
        await s3.getSignedUrl('getObject', s3Params, function (err, data) {
            console.log("getSignedUrl called.!");

            if (err) return res.status(404).send(`err : ${err}`);
            return res.status(200).send(`Data : ${data}`);
        });
    } catch (error) {
        return res.status(404).send(`err : ${error}`);
    }

}



module.exports = router;
