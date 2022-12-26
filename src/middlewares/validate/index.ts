// Imports
// ========================================================
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

// Middleware
// ========================================================
const ValidateMiddleware =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log({ body: req.body });

    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(422).json(error);
    }
  };

// Exports
// ========================================================
export default ValidateMiddleware;
