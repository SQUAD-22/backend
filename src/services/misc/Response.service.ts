import { Response } from 'express';

export const ResponseHelpers = {
  sendError: (
    res: Response,
    error: {
      status: number;
      errorId: string;
      message: string;
    },
    field: string | null
  ) => {
    return res.status(error.status).json({ ...error, field });
  },
};
