import { Router } from "express";
import { createOrder, getOrderById, getAllOrders } from "../controllers/orderController.js";

const router = Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);

export default router;