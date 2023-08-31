const { subject } = require("@casl/ability");
const Invoice = require("../invoice/model");
const { policyFor } = require("../../utils");

const show = async (req, res, next) => {
  try {
    let policy = policyFor(req.user);
    let subjectInvoice = subject("Invoice", {
      ...invoice,
      user_id: invoice.user._id,
    });
    if (!policy.can("read", subjectInvoice)) {
      return res.json({
        error: 1,
        message: "Anda tidak memiliki akse untuk melihat ini",
      });
      let { order_id } = req.params;
      let invoice = await Invoice.findOne({ order: order_id })
        .populate("order")
        .populate("user");
      return res.status(200).json(invoice);
    }
  } catch (error) {
    return res.status(400).json({
      error: 1,
      message: `Error when getting invoice.`,
    });
  }
};

module.exports = {
  show,
};
