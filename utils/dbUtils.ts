import { Model, Document, UpdateWriteOpResult } from "mongoose";

export async function findOneDocument<T extends Document>(
  model: Model<T>,
  query: object
): Promise<T | null> {
  const document = await model.findOne(query).exec();
  return document;
}

export async function findOneCASEDocument<T extends Document>(
  model: Model<T>,
  query: object
): Promise<T | null> {
  // Konvertiere alle Zeichenfolgenfelder im Suchquery zu regulären Ausdrücken
  const caseInsensitiveQuery: any = Object.entries(query).reduce(
    (acc, [key, value]) => {
      // @ts-ignore
      acc[key] = { $regex: new RegExp(`^${value}$`, "i") };
      return acc;
    },
    {}
  );

  const document = await model.findOne(caseInsensitiveQuery).exec();
  return document;
}

export async function deleteOneDocument<T extends Document>(
  model: Model<T>,
  query: object
): Promise<number> {
  const result = await model.deleteOne(query).exec();
  return result.deletedCount;
}

export async function updateOneDocument<T extends Document>(
  model: Model<T>,
  filter: object,
  update: object
): Promise<UpdateWriteOpResult> {
  const result = await model.updateOne(filter, update).exec();
  return result;
}
