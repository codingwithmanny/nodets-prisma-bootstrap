// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { buildSuccessResponse } from '../../utils/helpers';
import { CREATE_USER } from './queries';
import ValidateMiddleware from '../../middlewares/validate';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const CreateUser = async (req: Request, res: Response) => {
  console.log({ body: req.body });

  const { data } = await CREATE_USER(req.body);

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.post(
  '/',
  ValidateMiddleware(
    z.object({
      body: z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
      }),
    }),
  ),
  CreateUser,
);

// Exports
// ========================================================
export default router;
