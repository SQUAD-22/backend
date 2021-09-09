import DeskModel, { Desk } from '../../models/Desk.model';
import OfficeModel, { Office } from '../../models/Office.model';

export default {
  create: async (office: Office) => {
    const { deskCount } = office;

    //Cria um novo escritório
    const newOffice = await OfficeModel.create(office);

    //Cria uma mesa numerada de 1 até a quantidade de mesas que o escritório tem
    const desks: Desk[] = [];
    for (let i = 1; i <= deskCount; i++) {
      desks.push({
        office: newOffice._id,
        available: false,
        deskId: i,
      });
    }

    //Insere todas as mesas no banco de dados
    await DeskModel.insertMany(desks);

    return newOffice;
  },
};
