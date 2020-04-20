const { Router } = require("express");
const router = Router();

// Rutas
router.get("/device/:device", (req, res) => {
  res.render("index", { device: req.params.device });
});

router.get("/test", (req, res) => {
  const data = {
    message: "Hello World",
    author: "Jose Daniel Posso Garcia",
    github: "@daniel7byte",
  };
  res.json(data);
});

module.exports = router;