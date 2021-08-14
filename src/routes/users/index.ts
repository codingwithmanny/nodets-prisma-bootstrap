// Imports
// ========================================================
import { Router } from 'express';
import ListUsers from './list';
import ReadUser from './read';
import UpdateUser from './update';
import DeleteUser from './delete';

// Config
// ========================================================
const router = Router();

// Routes
// ========================================================
router.use(ListUsers);
router.use(ReadUser);
router.use(UpdateUser);
router.use(DeleteUser);

// Exports
// ========================================================
export default router;
