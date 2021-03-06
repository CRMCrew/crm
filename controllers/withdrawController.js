const Withdraw = require('../models/Withdraw');

const save = async (req, res) => {
  const w = new Withdraw(req.body);
  const widthdraw = await w.save();
  res.status(201).send(widthdraw);
};

const deleteComment = async (req, res) => {
  const id = req.params.id;
  const data = await Withdraw.deleteOne({ _id: id });
  res.send(data);
};

const getAllByOwner = async (req, res) => {
  const id = req.params.id;
  const data = await Withdraw.getAllByOwner({ owner: id });
  data;
  res.send(data);
};
module.exports = {
  save,
  deleteComment,
  getAllByOwner,
};
