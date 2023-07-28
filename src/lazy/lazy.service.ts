import { Injectable } from '@nestjs/common';

@Injectable()
export class LazyService {
  lazyLoad() {
    console.log('lazyload....');
  }
}
