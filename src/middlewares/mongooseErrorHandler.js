import createHttpError from 'http-errors';

export const mongooseErrorHandler = (err, __, next) => {
  const { name, code } = err;
  const status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  next(createHttpError(status, 'There was a duplicate key error'));
};
