import createHttpError from 'http-errors';

export const notFoundHandler = (req, res, next) => {
   res.status(404).json({
    message: 'Not found',
   });
 next(createHttpError(404, 'Route not found'));
};

//export const notFoundHandler = (req, res) => {
 // res.status(404).json({
 //   message: `Url not found`,
 // });
//};
