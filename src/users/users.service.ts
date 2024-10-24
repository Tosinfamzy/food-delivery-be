import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { User } from 'src/interfaces/User.interface';
import { readFromFile } from 'src/utils/readFromFile';

@Injectable()
export class UsersService {
  private readonly filePath = path.join(process.cwd(), 'data.json');
  private readonly users: User[] = readFromFile(this.filePath);

  public getAllUserNames() {
    return this.users.map((user) => ({
      uuid: user.id,
      name: `${user.firstName} ${user.lastName}`,
    }));
  }
}
