// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { NotFound } from '../../utils/errorHandlers';
import { buildSuccessResponse } from '../../utils/helpers';
import dictionary from '../../utils/dictionary.json';
import { DELETE_USER } from './queries';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const DeleteUser = async (req: Request, res: Response) => {
  const { data } = await DELETE_USER(req.params.id);

  if (!data) {
    throw new NotFound(dictionary.USERS.ERROR.READ.NOT_FOUND);
  }

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.delete('/:id', DeleteUser);

// Exports
// ========================================================
export default router;
