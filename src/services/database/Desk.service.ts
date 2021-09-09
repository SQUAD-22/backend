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
};
