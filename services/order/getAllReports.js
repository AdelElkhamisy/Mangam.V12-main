const Get_Order_Details = require("../../repositories/order");
const get_Order_Details = new Get_Order_Details();

module.exports = class {
  constructor() {}
  async getAllReports(req, res) {
    let getAll = await get_Order_Details.getAllReports();
    console.log(getAll);
    res.send(
      getAll && getAll.length
        ? { status: 1, message: getAll }
        : { status: 0, message: [] }
    );
  }
};
