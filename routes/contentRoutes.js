const { Router } = require("express");
const router = Router();

const { requireAuth } = require("../middleware/authMiddleware");
const contentController = require("../controllers/contentController");

router.get("/topic", requireAuth, contentController.topic);

router.get("/topic/:name", requireAuth, contentController.question);

router.delete("/topic/:id", contentController.topic_DELETE);

router.get("/newquestion", contentController.newQuestion_GET);

router.post("/newquestion", contentController.newQuestion_POST);
module.exports = router;
