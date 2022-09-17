const course = require("../controllers/course");
const router = require("express").Router();

router.get("/", course.index);
router.post("/", course.create);
router.get("/:id", course.show);
router.put("/:id", course.update);
router.delete("/:id", course.delete);

module.exports = router;