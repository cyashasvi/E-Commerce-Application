const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product, through: Category, as: 'product_tag'}]
    });
    if (!categoryData) {
      res.status(400).json({message: 'No category for this product!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((category) => {
  return Category.findAll({ where: {product_id: req.params.id} })
  })
  .then((category) => {
   const categoryID = category.map(({category_id}) => category_id);
   const newCategoryID = req.body.categoryID
    .filter((category_id) => !categoryID.includes(category_id))
    .map((category_id) => {
      return {
        category_id: req.params.id,
        category_id,
     };
   }) 

const categoriestoRemove = category
.filter(({category_id}) => !req.body.categoryID.includes(category_id))
.map(({id}) => id);

return Promise.all([
  Category.destroy({where: {id: categoriestoRemove } }),
  Category.bulkCreate(newCategoryID)
])
})
});
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(400).json({message: 'No category found with this id!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
