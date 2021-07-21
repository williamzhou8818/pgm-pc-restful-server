const OSS = require('ali-oss');
const dotenv = require('dotenv').config();

const clientOss = new OSS({
    region: process.env.OSS_REGION,
    accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
    bucket: process.env.OSS_BUCKET,
    //endpoint: 'oss-cn-shanghai.aliyuncs.com',
    endpoint: process.env.END_POINT
})

module.exports =  clientOss;