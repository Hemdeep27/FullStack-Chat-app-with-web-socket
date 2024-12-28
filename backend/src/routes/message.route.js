import express from "express"
import { getMessages, getUsersForList, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router()

router.get('/users', protectRoute, getUsersForList)
router.get('/:id', protectRoute, getMessages)
router.post('/send/:id', protectRoute, sendMessage)

export default router;