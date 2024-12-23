import TodoModel from "./todo.model";
import globalService from "../../global/global.service";
import { ObjectId } from "mongoose";
import moment from "moment";

// global services
const globalServices = globalService(TodoModel);

// rest services

const todoServices = { ...globalServices };

export default todoServices;
