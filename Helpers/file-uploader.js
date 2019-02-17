const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
    secretAccessKey: process.env.AWS_ACCESS_KEY || 'Add the AWS access key to your .env file.',
    accessKeyId: process.env.AWS_KEY_ID || 'add the AWS key id to your .env file.', 
    region: 'us-east-2'
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'guidrimages',
        acl: 'bucket-owner-full-control',
        metadata:  (req, file, cb)=>{
            cb(null, {fieldName: file.fieldname});
        },
        key: (req, file, cb)=>{
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload;