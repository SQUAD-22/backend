import { Response } from 'express';
import OfficeService from '../services/database/Office.service';
import ReqWithUserID from '../types/ReqWithUserID';

export default {
  create: async (req: ReqWithUserID, res: Response) => {
    const { name, state, city, occupationLimitPercent, deskCount } = req.body;

    const newOffice = await OfficeService.create({
      name,
      state,
      city,
      occupationLimitPercent,
      deskCount,
    });

    return res.status(201).json(newOffice);
  },
};
