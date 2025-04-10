import type { Request, RequestHandler } from "express";
import httpStatus from "http-status";

import ApiError from "../../ApiError";
import sendRes from "../../shared/sendResponse";
import { IMeta } from "./globalInterfaces";

interface ServiceMethods<T> {
  create: (data: T) => Promise<T | null>;
  getSingle: (id: string, populate: string) => Promise<T | null>;
  getAll: (req: Request) => Promise<{ data: T[]; meta: IMeta }>;
  update: (id: string, data: Partial<T>) => Promise<T | null>;
  remove: (id: string) => Promise<T | null>;
}

const globalController = <T>(
  service: ServiceMethods<T>,
  name: string
): {
  create: RequestHandler;
  getAll: RequestHandler;
  getSingle: RequestHandler;
  update: RequestHandler;
  remove: RequestHandler;
} => {
  return {
    create: async (req, res, next) => {
      try {
        const data = await service.create(req.body);

        const payload = {
          success: true,
          message: `${name} created successfully`,
          data,
        };
        sendRes(res, httpStatus.CREATED, payload);
        return;
      } catch (error) {
        next(error);
      }
    },

    getAll: async (req, res, next) => {
      try {
        // get data from service
        const values = await service.getAll(req);

        const { meta, data } = values;

        // payload
        const payload = {
          success: true,
          message: `${name}s fetched successfully`,
          meta,
          data,
        };
        sendRes(res, httpStatus.OK, payload);
        return;
      } catch (error) {
        next(error);
      }
    },

    getSingle: async (req, res, next) => {
      try {
        const populate = req.query.populate as string;
        const data = await service.getSingle(req.params.id, populate);

        // const data = await service.getSingle(req.params.id);
        const payload = {
          success: true,
          message: `${name} fetched successfully`,
          data,
        };
        sendRes(res, httpStatus.OK, payload);
        return;
      } catch (error) {
        next(error);
      }
    },

    update: async (req, res, next) => {
      try {
        const data = await service.update(req.params.id, req.body);

        if (!data) {
          throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Server Error");
        }

        const payload = {
          success: true,
          message: `${name} updated successfully`,
          data,
        };
        sendRes(res, httpStatus.OK, payload);
        return;
      } catch (error) {
        next(error);
      }
    },

    remove: async (req, res, next) => {
      try {
        const data = await service.remove(req.params.id);

        const payload = {
          success: true,
          message: `${name} deleted successfully`,
          data,
        };
        sendRes(res, httpStatus.OK, payload);
        return;
      } catch (error) {
        next(error);
      }
    },
  };
};

export default globalController;
