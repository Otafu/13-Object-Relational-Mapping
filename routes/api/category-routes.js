const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  const categories = await Category.findAll({
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  });
  return res.json(categories);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findOne({
    where: { id: req.params.id },
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  });

  return res.json(category);
});

router.post("/", async (req, res) => {
  const newCategory = await Category.create(req.body);
  return res.json(newCategory);
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  const updateCategory = await Category.update(req.body, {
    where: { id: req.params.id },
  });
  if (!updateCategory) {
    return res.status(404).json({ message: "category not found" });
  }
  return res.json({ message: "category is updated" });
});

router.delete("/:id", async (req, res) => {
  const deletedCategory = await Category.destroy({
    where: { id: req.params.id },
  });
  if (!deletedCategory) {
    return res.status(404).json({ message: "category not found" });
  }
  res.json({ message: "category is deleted." });
});

module.exports = router;
