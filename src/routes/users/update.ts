// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { NotFound } from '../../utils/errorHandlers';
import { buildSuccessResponse } from '../../utils/helpers';
import dictionary from '../../utils/dictionary.json';
import { UPDATE_USER } from './queries';

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
router.put('/:id', UpdateUser);

// Exports
// ========================================================
export default router;
