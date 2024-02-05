import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor (){}
  getHello(): string {
    return 'Hey, Whats up, Bro! You are using 1.5 version'}
}

