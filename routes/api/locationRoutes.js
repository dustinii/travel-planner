const router = require('express').Router();
const { Location, Trip, Traveller } = require('../../models');

// GET all locations
router.get('/', async (req, res) => {
    try {
        const locationData = await Location.findAll();
        res.status(200).json(locationData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single location
router.get('/:id', async (req, res) => {
    try {
        const locationData = await Location.findByPk(req.params.id, {
            include: [{ model: Traveller, through: Trip, as: 'planned_trips' }]
        });

        if (!locationData) {
            res.status(404).json({ message: 'No location found with this id!' });
            return;
        }

        res.status(200).json(locationData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST a new location
router.post('/', async (req, res) => {
    try {
        const locationData = await Location.create(req.body);
        res.status(200).json(locationData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE a location
router.delete('/:id', async (req, res) => {
    try {
        const locationData = await Location.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!locationData) {
            res.status(404).json({ message: 'No location found with this id!' });
            return;
        }

        res.status(200).json(locationData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;