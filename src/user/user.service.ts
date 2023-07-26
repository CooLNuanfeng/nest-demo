import { Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class UserService {
  private scopeA = '';

  setA(value: string) {
    this.scopeA = value;
  }

  getA(): string {
    return this.scopeA;
  }
}
