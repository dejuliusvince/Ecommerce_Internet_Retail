const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/categories', async (req, res) => {
  // find all categories
  // select * from category left join product on product.category_id=category.id
try{
  const categories = await Category.findAll({
    // be sure to include its associated Products
    include:[{model:Product}],
  });
  res.status(200).json(categories);
}
catch(err){
  res.status(500).json(err);
}
});

router.get('/categories/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if(!categoryData) {
      res.status(404).json({ message: 'No category found with that id'});
      return;
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/categories', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/categories/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body
    },
    {
      where:{
        id: req.params.id
      }
    }
  )
  .then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.delete('/categories/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    if(!categoryData) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
