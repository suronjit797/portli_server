import { Model } from "mongoose";
import type { IGetAll_service, IPagination, TFilter } from "./globalInterfaces";
import { paginationHelper } from "../../helper/paginationHelper";
import filterHelper from "../../helper/filterHelper";
import { Request } from "express";

const globalService = <TType>(
  ModelName: Model<TType, Record<string, unknown>>
): {
  create: (body: TType) => Promise<TType>;
  getSingle: (id: string) => Promise<TType | null>;
  update: (id: string, payload: Partial<TType>) => Promise<TType | null>;
  remove: (id: string) => Promise<TType | null>;
  getAll: (req: Request) => Promise<IGetAll_service<TType[]>>;
} => {
  return {
    // create
    create: async (body: TType): Promise<TType> => {
      return await ModelName.create(body);
    },

    // get all
    // getAll: async (pagination: IPagination, filter: Partial<TFilter>): Promise<IGetAll_service<TType[]>> => {
    getAll: async (req: Request): Promise<IGetAll_service<TType[]>> => {
      const pagination = paginationHelper(req.query);
      const filter = filterHelper(req, new ModelName(), req.partialFilter);

      const { page, limit, skip, sortCondition, populate = "" } = pagination;
      const data = await ModelName.find(filter as any)
        .limit(limit)
        .skip(skip)
        .sort(sortCondition)
        .populate(populate);
      const total = await ModelName.countDocuments(filter as any);
      return { data, meta: { page, limit, total } };
    },

    // get single
    getSingle: async (id: string, populate = ""): Promise<TType | null> => {
      return (await ModelName.findById(id).populate(populate)) as any;
    },

    // update single
    update: async (id: string, payload: Partial<TType>): Promise<TType | null> => {
      return await ModelName.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    },

    // remove single
    remove: async (id: string): Promise<TType | null> => {
      return (await ModelName.findByIdAndDelete(id)) as any;
    },
  };
};

export default globalService;
