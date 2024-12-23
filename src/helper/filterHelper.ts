import { Request } from "express";
import { Document } from "mongoose";
import { IPartialSearchableFields, TFilter } from "../shared/globalInterfaces";
import { pic } from "./paginationHelper";

const filterHelper = (req: Request, schemaName: Document, partialSearching: IPartialSearchableFields): TFilter => {
  const schemaKeys = Object.keys(schemaName.schema.obj);
  const filter = pic(req.query, ["query", ...schemaKeys]);
  const { query, ...filterData } = filter;
  const andCondition = [];
  Object.entries(req.query).forEach(([key, value]) => {
    if (key.includes("_")) {
      const [name, operator] = key.split("_");
      if(Array.isArray(value)){
        value = value[0]
      }
      andCondition.push({
        $or: [
          {
            [name]: {
              [operator]: Number(value),
            },
          },
        ],
      });
    }
  });

  if (query && partialSearching.length > 0) {
    andCondition.push({
      $or: partialSearching.map((field) => {
        return {
          [field]: {
            $regex: query,
            $options: "i",
          },
        };
      }),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      $and: Object.entries(filterData).map(([key, value]) => {
        return { [key]: value };
      }),
    });
  }

  return andCondition.length > 0 ? { $and: andCondition } : {};
};

export default filterHelper;
