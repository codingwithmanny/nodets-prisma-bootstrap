// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { NotFound } from '../../utils/errorHandlers';
import { buildSuccessResponse } from '../../utils/helpers';
import dictionary from '../../utils/dictionary.json';
import { UPDATE_USER } from './queries';
import ValidateMiddleware from '../../middlewares/validate';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const UpdateUser = async (req: Request, res: Response) => {
  const { data } = await UPDATE_USER(req.params.id, req.body);

  if (!data) {
    throw new NotFound(dictionary.USERS.ERROR.READ.NOT_FOUND);
  }

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.put(
  '/:id',
  ValidateMiddleware(
    z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().email().optional(),
    }),
  ),
  UpdateUser,
);

// Exports
// ========================================================
export default router;
