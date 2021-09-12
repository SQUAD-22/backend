import OfficeModel, { Office } from '../../models/Office.model';
import DeskService from './Desk.service';

export default {
  create: async (office: Office) => {
    const { deskCount, city, name, occupationLimitPercent, state } = office;

    //Cria um novo escritório
    const newOffice = await OfficeModel.create({
      city,
      name,
      occupationLimitPercent,
      state,
      deskCount: 0,
    });

    //Cria uma mesa numerada de 1 até a quantidade de mesas que o escritório tem
    await DeskService.add(deskCount, newOffice._id);

    return newOffice;
  },

  update: async (officeId: string, data: Partial<Office>) => {
    const officeDoc = await OfficeModel.findById(officeId);
    const { city, deskCount, name, occupationLimitPercent, state } = data;

    if (city) officeDoc.city = city;
    if (name) officeDoc.name = name;
    if (state) officeDoc.state = state;

    /**
     * Aqui, vamos trabalhar a parte da alteração do deskCount, duas alterações possíveis
     * Caso o deskcount enviado < deskcount atual, deleta as mesas a partir do final da contagem
     * Caso deskcount enviado > deskcount atual, cria novas mesas a partir do final da contagem
     */
    if (deskCount) {
      const diff = Math.abs(deskCount - officeDoc.deskCount);

      if (deskCount < officeDoc.deskCount) {
        await DeskService.delete(diff, officeDoc._id);
      } else {
        await DeskService.add(diff, officeDoc._id);
      }

      officeDoc.deskCount = deskCount;
    }

    if (occupationLimitPercent)
      officeDoc.occupationLimitPercent = occupationLimitPercent;

    await officeDoc.save();
    return officeDoc;
  },

  list: async () => {
    const allOfices = await OfficeModel.find({});
    return allOfices;
  }
};
