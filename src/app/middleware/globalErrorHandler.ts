/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import config from '../config'
import AppError from '../error/AppError'
import { TErrorHandaler } from '../interface/error.type'
import handleZodError from '../error/handleZodError'
import handleValidationError from '../error/handleValidationError'
import handleCastError from '../error/handleCastError'
import handleDuplicateError from '../error/handleDuplicateError'



const globalErrorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'something went wrong'

  let errorSources: TErrorHandaler = [
    {
      path: '',
      message: 'Something Went Wrong',
    },
  ]
  if (err instanceof ZodError) {
    const simpliFiedError = handleZodError(err)
    statusCode = simpliFiedError?.statusCode
    message = simpliFiedError?.message
    errorSources = simpliFiedError?.errorSources
  } else if (err?.name === 'ValidationError') {
    const simpliFiedError = handleValidationError(err)
    statusCode = simpliFiedError?.statusCode
    message = simpliFiedError?.message
    errorSources = simpliFiedError?.errorSources
  } else if (err?.name === 'CastError') {
    const simpliFiedError = handleCastError(err)
    statusCode = simpliFiedError?.statusCode
    message = simpliFiedError?.message
    errorSources = simpliFiedError?.errorSources
  } else if (err?.code === 11000) {
    const simpliFiedError = handleDuplicateError(err)
    statusCode = simpliFiedError?.statusCode
    message = simpliFiedError?.message
    errorSources = simpliFiedError?.errorSources
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err?.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  } else if (err instanceof Error) {
    message = err?.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  }

  // ultimate return
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    errorSources: config.NODE_ENV === 'development' ? errorSources : null,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  })
}
export default globalErrorHandler

//patrern
/*
sucess
mesage
errorSource:[
path:"",
message:"",
],
stack
*/