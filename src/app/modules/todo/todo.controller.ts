import { RequestHandler } from "express";
import todoServices from "./todo.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { paginationHelper } from "../../../helper/paginationHelper";
import filterHelper from "../../../helper/filterHelper";
import TodoModel from "./todo.model";
import globalController from "../../global/global.controller";

// variables
const name = "Todo";
// global
const globalControllers = globalController(todoServices, name);

// custom
export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const pagination = paginationHelper(req.query);
    const filter = filterHelper(req, new TodoModel(), ["title", "type"]);

    const { data, meta } = await todoServices.getAll(pagination, filter);

    const payload = {
      success: true,
      message: `${name}s fetched successfully`,
      meta,
      data,
    };
    return sendResponse(res, httpStatus.OK, payload);
  } catch (error) {
    next(error);
  }
};

// const create: RequestHandler = async (req, res, next) => {
//   try {
//     const body = { ...req.body, user: req.user.userId };
//     const data = await todoServices.create(body);

//     const payload = {
//       success: true,
//       message: `${name} created successfully`,
//       data,
//     };
//     return sendResponse(res, httpStatus.CREATED, payload);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

const todoController: any = { ...globalControllers, getAll };
export default todoController;
