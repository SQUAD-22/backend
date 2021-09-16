import { Types } from 'mongoose';
import DeskModel, { Desk } from '../../models/Desk.model';
import OfficeModel from '../../models/Office.model';

export default {
  delete: async (howMany: number, office: string) => {
    const officeDoc = await OfficeModel.findById(office);
    officeDoc.deskCount -= howMany;
    await DeskModel.deleteMany({
      office: officeDoc._id,
      deskId: { $gt: officeDoc.deskCount },
    });
    await officeDoc.save();
  },

  add: async (howMany: number, office: string) => {
    const officeDoc = await OfficeModel.findById(office);
    const { deskCount, _id } = officeDoc;

    const desks: Desk[] = [];

    for (let i = deskCount + 1; i <= deskCount + howMany; i++) {
      desks.push({
        available: false,
        office: _id,
        deskId: i,
      });
    }

    officeDoc.deskCount += howMany;
    await DeskModel.insertMany(desks);
    await officeDoc.save();
  },

  changeAvailable: async (deskIds: number[], office: string) => {
    const parsedObjectId = new Types.ObjectId(office);

    await DeskModel.updateMany(
      { office: parsedObjectId, deskId: { $in: deskIds } },
      [
        {
          $set: {
            available: { $not: '$available' },
          },
        },
      ]
    );
  },

  listAll: async (office: string) => {
    const parsedObjectId = new Types.ObjectId(office);

    const allDesks = await DeskModel.find({ office: parsedObjectId });
    return allDesks;
  },

  findOne: async (query: any) => {
    const deskDoc = await DeskModel.findOne(query);
    return deskDoc;
  },
};
