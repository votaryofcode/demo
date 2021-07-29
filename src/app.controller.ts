import { Body, Controller, Delete, Get, HttpException, Inject, NotFoundException, Param, Post } from '@nestjs/common';


@Controller('/storage')
export class AppController {
  constructor(@Inject('STORAGE') private storage: Record<string, string>) {}
  
  @Post()
  store(@Body() data: Record<string, string>): string {
    const { key, value } = data;
    if (Object.keys(this.storage).includes(key)) {
      throw new HttpException('Overriding not allowed', 400);
    }
    this.storage[key] = value;
    console.log(this.storage);
    return 'ok';
  }
  
  @Get('/:key')
  get(@Param('key') key: string) {
    if (!Object.keys(this.storage).includes(key)) {
      throw new NotFoundException('Key does not exist');
    }
    return this.storage[key];
  }
  
  @Delete('/:key')
  delete(@Param('key') key: string) {
    if (!Object.keys(this.storage).includes(key)) {
      throw new NotFoundException('Key does not exist');
    }
    delete this.storage[key];
    return '';
  }
}
