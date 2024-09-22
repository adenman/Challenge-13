const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product, as: "products" }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// find one category by its `id` value
// be sure to include its associated Products
router.get("/:id", async (req, res) => {
  try {
    const categoryId = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: "products" }],
    });
    if (!categoryId) {
      return res.status(404).send("ID not found");
    }
    res.json(categoryId);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated) {
      const updatedCategory = await Category.findByPk(req.params.id);
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Category.destroy({
      where: { id: req.params.id },
    });

    if (deleted) {
      res.status(204).send(); 
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
