const Order = require("../../repositories/order");
const order = new Order();

module.exports = class {
  constructor() {}
  report = async (req, res) => {
    const report = await order.report(req?.body);
    res.send(
      report?.affectedRows
        ? { status: 1, message: "Report Sent Successfully" }
        : { status: 0, message: report?.message }
    );
  };
};
