import { Request } from 'express';
import { User } from 'src/orm';

export interface AppRequest extends Request {
  user?: User
}
