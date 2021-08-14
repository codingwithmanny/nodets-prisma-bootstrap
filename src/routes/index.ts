// Imports
// ========================================================
import { Router } from 'express';
import Users from './users';

// Config
// ========================================================
const router = Router();

// Routes
// ========================================================
router.use('/users', Users);

// Exports
// ========================================================
export default router;
