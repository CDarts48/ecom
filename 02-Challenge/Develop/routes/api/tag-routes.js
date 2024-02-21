const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// get all tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: Product,
    });
    res.json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one tag by its `id` value
router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: Product,
    });
    if (!tag) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    res.json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post("/", async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tag) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    res.json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tag) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    res.json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
