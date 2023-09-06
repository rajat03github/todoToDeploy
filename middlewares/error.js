//error handler in express throught middleware
//!takes error as first middleware with next  -- errormiddleware
//!uses next( new Error()) in anywhere to call the middleware and Error Class

class ErrorHandler extends Error {
  //? takes message and StatusCode

  constructor(message, statusCode) {
    super(message); //Parent Class Constructor ie Error Constructor
    this.statusCode = statusCode;
  }
}

const errorMiddleware = (err, req, res, next) => {
  //* if message/statusCode exists else this

  err.message = err.message || "Internal Server Error";

  err.statusCode = err.statusCode || 500;

  return res.status(err.statusCode).json({
    success: false,
    message: err.message, //err.message  got throw a new Error ("Error")
  });
};

export default ErrorHandler;
export { errorMiddleware };
