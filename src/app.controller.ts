import { Controller, Get, Post, UseInterceptors, UploadedFile, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express'
import * as express from 'express'
import AWS = require('aws-sdk');
const ID = '';
const SECRET = '';
const BUCKET_NAME = 'fuckshit';

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {

  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }



  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file, @Response() res: express.Response) {
    console.log(file);
    let s = file.originalname;
    // Setting up S3 upload parameters
    const params = {
      Bucket: BUCKET_NAME,
      Key: file.originalname, // File name you want to save as in S3
      Body: file.buffer
    };
    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err, data);
        
      }
      else{
        res.send("file successfully uploaded")
      }
    });
  }

}
