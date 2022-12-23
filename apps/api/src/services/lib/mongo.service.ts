import mongoose from 'mongoose';
import { logger } from '@api/services';

export const mongoInstance = process.env.NX_MONGO_URI || 'mongodb://localhost:27017/nxstarter';

export const getItem = async (model: any, id: string) => {
  try {
    return await model.findById(id);
  } catch (error) {
    throw new Error(`Item: ${id} doesn't exist`);
  }
};

export const updateItem = async (model: any, id, params) => {
  console.log('params', params);

  if (!Object.keys(params).length) {
    throw new Error('there are no parameters for user update');
  }

  try {
    const storedItem = await getItem(model, id);
    const update = {};

    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const element = params[key];
        if (element !== storedItem[key]) {
          update[key] = element;
        }
      }
    }

    if (!Object.keys(update).length) {
      throw new Error('Parameters are equal with stored for item');
    }

    await model.findByIdAndUpdate(id, update);

    return model.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const mongooseSetup = () => {
  mongoose.connect(mongoInstance);
  mongoose.connection
    .once('open', () => logger.success(`Connected to Mongo instance on ${mongoInstance}`))
    .on('error', (error) => logger.fatal(`Error connecting to Mongo: ${error.message}`, error));
};
