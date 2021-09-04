import { Request } from 'express';

export default interface ReqWithUserID extends Request {
  userId?: string;
}
