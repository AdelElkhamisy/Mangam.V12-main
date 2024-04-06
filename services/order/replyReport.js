const Get_Order_Details = require("../../repositories/order");
const get_Order_Details = new Get_Order_Details();

module.exports = class {
  constructor() {}
  async replyReport(req, res) {
    let getAll = await get_Order_Details.replyReport(req?.body);
    res.send({
      status: getAll?.affectedRows,
      message: getAll?.affectedRows ? "Changes" : "Already Changed"
    });
  }
};
