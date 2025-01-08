import { Request, Response, Router } from "express";
const router: Router = Router();

import * as controller from "../controllers/task.controller";


router.get("/",controller.index);

router.get("/detail/:id", controller.detail);
router.post("/change-status/:id", controller.changeStatus);
router.patch("/change-multi",controller.changeMulti);
router.post("/create",controller.createPost);

export const taskRoutes: Router = router;