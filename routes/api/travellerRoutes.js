const router = require('express').Router();
const { Traveller, Trip, Location } = require('../../models');

// GET all travellers
router.get('/', async (req, res) => {
  try {
    const travellerData = await Traveller.findAll();
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single traveller
router.get('/:id', async (req, res) => {
  try {
    const travellerData = await Traveller.findByPk(req.params.id, {
      include: [{ model: Location, through: Trip, as: 'planned_trips' }]
    });

    if (!travellerData) {
      res.status(404).json({ message: 'No traveller found with this id!' });
      return;
    }

    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new traveller
router.post('/', async (req, res) => {
  try {
    const travellerData = await Traveller.create(req.body);
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a traveller
router.delete('/:id', async (req, res) => {
  try {
    const travellerData = await Traveller.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!travellerData) {
      res.status(404).json({ message: 'No traveller found with this id!' });
      return;
    }

    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// post user login
router.post('/login', async (req, res) => {
  try {
    const travellerData = await Traveller.findOne({ where: { email: req.body.email } });

    if (!travellerData) {
      res.status(400).json({ message: 'No traveller found with that email address!' });
      return;
    }

    const validPassword = await bcrypt.compare(req.body.password, travellerData.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    res.status(200).json({ user: travellerData, message: 'You are now logged in!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
