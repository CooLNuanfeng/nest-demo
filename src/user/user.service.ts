import { Injectable, Scope } from '@nestjs/common';

export type User = any;

@Injectable({
  scope: Scope.TRANSIENT,
})
export class UserService {
  private scopeA = '';

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: '111',
      roles: ['Admin', 'User'],
    },
    {
      userId: 2,
      username: 'tom',
      password: '123',
      roles: ['User'],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  setA(value: string) {
    this.scopeA = value;
  }

  getA(): string {
    return this.scopeA;
  }
}
