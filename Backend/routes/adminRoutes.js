import express from 'express';
const router = express.Router();
import { addAdmin, deleteAdmin, editAdmin, getAdmin, getAllAdmins, login, logout } from '../controlles/adminController.js'
import authorization from '../middleware/auth.js'
router.get('/', authorization, getAllAdmins);
router.get('/:id', authorization, getAdmin);
router.put('/:id', authorization, editAdmin);
router.delete('/:id', authorization, deleteAdmin);
router.post('/', authorization, addAdmin)
router.post('/login', login)
router.post('/logout', logout)

export default router;

