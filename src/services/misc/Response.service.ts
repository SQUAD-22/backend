import { Response } from 'express';

export const ResponseHelpers = {
  sendError: (
    res: Response,
    error: { status: number; errorId: string; message: string }
  ) => {
    return res.status(error.status).json(error);
  },
};
