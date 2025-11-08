import { NextFunction, Request, Response } from 'express'

import { catchAsync } from '../utils/catchAsync'
import { ZodObject } from 'zod'

const validateRequest = (scehme: ZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    await scehme.parseAsync({
      body: req.body,
      cookies: req.cookies,
    })
    next()
  })
}
export default validateRequest