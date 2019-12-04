import { Controller, Get, Post, UseInterceptors, UploadedFile, Response} from '@nestjs/common';
import { AppService } from './app.service';
import {FileInterceptor} from '@nestjs/platform-express'
import * as express from 'express'


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
 
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file, @Response() res:express.Response){
    console.log(file);
    res.sendFile('index.html');
  }

}
