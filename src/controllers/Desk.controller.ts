import { Response } from 'express';
import DeskService from '../services/database/Desk.service';
import ReqWithUserID from '../types/ReqWithUserID';

export default {
  update: async (req: ReqWithUserID, res: Response) => {
    const { deskIds, office } = req.body;

    await DeskService.changeAvailable(deskIds, office);

    return res.status(200).json({ error: null });
  },
};
