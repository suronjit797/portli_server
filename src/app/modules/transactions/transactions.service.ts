import TransactionsModel from "./transactions.model";
import globalService from "../../global/global.service";
import { ObjectId } from "mongoose";
import moment from "moment";

// global services
const globalServices = globalService(TransactionsModel);

const summary = async (userId: ObjectId) => {
  const $match = {
    user: userId,
    createdAt: {
      $gte: new Date(moment().startOf("month").format()),
      $lte: new Date(moment().endOf("month").format()),
    },
  };

  //   prev data
  const prevData = await TransactionsModel.aggregate([
    {
      $match: {
        user: userId,
        createdAt: {
          //   $gte: new Date(moment().add(-1, "M").startOf("month").format()),
          $lte: new Date(moment().add(-1, "M").endOf("month").format()),
        },
      },
    },
    {
      $group: {
        _id: "$type",
        amount: { $sum: "$amount" },
      },
    },
  ]);

  //   present data
  const data = await TransactionsModel.aggregate([
    {
      $match,
    },
    {
      $group: {
        _id: "$type",
        amount: { $sum: "$amount" },
      },
    },
  ]);

  let presentMonth: any = {
    income: 0,
    expense: 0,
    give: 0,
    take: 0,
    save: 0,
    withdraw: 0,
  };

  let lastMonth: any = {
    income: 0,
    expense: 0,
    give: 0,
    take: 0,
    save: 0,
    withdraw: 0,
  };

  prevData.forEach(({ _id, amount }) => (lastMonth[_id] = amount));
  data.forEach(({ _id, amount }) => (presentMonth[_id] = amount));
  return { presentMonth, lastMonth };
};

const overall = async (userId: ObjectId) => {
  const $match = {
    user: userId,
    // createdAt: {
    //   $gte: new Date(moment().startOf("month").format()),
    //   $lte: new Date(moment().endOf("month").format()),
    // },
  };

  const data = await TransactionsModel.aggregate([
    {
      $match,
    },
    {
      $group: {
        _id: "$type",
        amount: { $sum: "$amount" },
      },
    },
  ]);

  let overall: any = {
    income: 0,
    expense: 0,
    give: 0,
    take: 0,
    save: 0,
    withdraw: 0,
  };

  data.forEach(({ _id, amount }) => (overall[_id] = amount));
  return overall;
};

// rest services

const transactionServices = { ...globalServices, summary, overall };

export default transactionServices;
