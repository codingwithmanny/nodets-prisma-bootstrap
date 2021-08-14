// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildSuccessResponse } from '../../utils/helpers';
import { QUERY_USERS } from './queries';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const ListUsers = async (req: Request, res: Response) => {
  const { data, pagination } = await QUERY_USERS({
    query: req?.query?.q as string | undefined,
    take: req?.query?.take
      ? (parseInt(req.query.take as string, 0) as number)
      : undefined,
    skip: req?.query?.skip
      ? (parseInt(req.query.skip as string, 0) as number)
      : undefined,
    orderBy: req?.query?.orderBy as string | undefined,
    sort: req?.query?.sort as string | undefined,
  });
  return res.json(buildSuccessResponse(data, pagination));
};

// Middlewares
// ========================================================
router.get('/', ListUsers);

// Exports
// ========================================================
export default router;
