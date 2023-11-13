import { Request } from 'express';
import requestIp from 'request-ip';

export const checkClientIp = (req: Request) => {
  return requestIp.getClientIp(req);
};
