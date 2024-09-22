const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, as: "products" }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagId = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, as: "products" }],
    });
    if (!tagId) {
      return res.status(404).send("ID not found");
    }
    res.json(tagId);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(201).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const [updated] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated) {
      const updatedTag = await Tag.findByPk(req.params.id);
      res.status(200).json(updatedTag);
    } else {
      res.status(404).json({ message: "Tag not found" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const rowsDeleted = await Tag.destroy({
      where: { id: req.params.id }
    });

    if (rowsDeleted) {
      res.status(200).json({ message: 'Tag deleted successfully' });
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});
module.exports = router;
