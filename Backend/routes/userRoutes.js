import express from "express";
import {
  changePassword,
  deleteAccount,
  getAllUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getAllUser);
router.put("/:id", verifyToken, updateUser);
router.post("/:id/change-password", verifyToken, changePassword);
router.delete("/:id/delete-account", verifyToken, deleteAccount);

export default router;
