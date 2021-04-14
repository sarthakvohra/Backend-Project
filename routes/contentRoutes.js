const { Router } = require("express");
const router = Router();

const { requireAuth } = require("../middleware/authMiddleware");
const contentController = require("../controllers/contentController");

router.get("/topic", requireAuth, contentController.topic);

router.get("/topic/:name", requireAuth, contentController.question);
module.exports = router;
