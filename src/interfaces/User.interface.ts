import { Cat } from './Cat.interface';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cats: Cat[];
}
