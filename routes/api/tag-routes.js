const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  return Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name"],
      },
    ],
  }).then((result) => {
    return res.json(result);
  });
  // find all tags
  // be sure to include its associated Product data
});

router.get("/:id", (req, res) => {
  return Tag.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name"],
      },
    ],
  }).then((result) => {
    return res.json(result);
  });
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", (req, res) => {
  return Tag.create(req.body)
    .then((result) => {
      return res.json(result);
    })
    .catch((e) => {
      return res.status(400).json(e);
    });
});

router.put("/:id", (req, res) => {
  return Tag.update(req.body, { where: { id: req.params.id } }).then(
    (result) => {
      if (!result) return res.status(404).json({ message: "Tag not found" });
      return res.json({ message: "tag updated" });
    }
  );
});

router.delete("/:id", (req, res) => {
  return Tag.destroy({ where: { id: req.params.id } }).then((result) => {
    if (!result) return res.status(404).json({ message: "Tag not found" });
    return res.json({ message: "tag deleted" });
  });
});

module.exports = router;
