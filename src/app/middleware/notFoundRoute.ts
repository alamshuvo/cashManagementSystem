import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    sucess: false,
    message: 'Api not found',
    error: "",
  })
}
export default notFoundRoute