import { Response, Request } from 'express';
import OfficeService from '../services/database/Office.service';

export default {
  create: async (req: Request, res: Response) => {
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

  update: async (req: Request, res: Response) => {
    const { office, name, state, city, occupationLimitPercent, deskCount } =
      req.body;

    const updatedDoc = await OfficeService.update(office, {
      state,
      name,
      city,
      occupationLimitPercent,
      deskCount,
    });

    return res.status(200).json(updatedDoc);
  },

  list: async (_req: Request, res: Response) => {
    const allOffices = await OfficeService.list();
    return res.status(200).json(allOffices);
  },
};
