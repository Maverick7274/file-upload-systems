import dotenv from 'dotenv';
import express from 'express';
import { Storage } from '@google-cloud/storage';

dotenv.config();

async function uploadFile(bucketName, file, fileOutputName) {
    try {

        const projectId = process.env.PROJECT_ID;
        const keyFilename = process.env.KEYFILENAME;

        const storage = new Storage({ projectId, keyFilename });

        const bucket = storage.bucket(bucketName)
        const ret = await bucket.upload(
            file,
            {
                destination: fileOutputName,
            }
        )

        return ret

    } catch (error) {
        console.error("Error : ", error);
    }
}
(async()=>{
    const ret = uploadFile(process.env.BUCKET_NAME,"test.jpg", "testImage.jpg")
    console.log(ret);
})();