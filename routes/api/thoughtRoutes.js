const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    addThoughts,
    updateThoughts,
    deleteThoughts,
    addReactions,
    deleteReactions
} = require('../../controllers/thoughtController');

// get / add all thoughts
router.route('/').get(getAllThoughts).post(addThoughts);

// get / delete /update thoughts by ID
router.route('/:thoughtId').get(getThoughtsById).delete(deleteThoughts).put(updateThoughts);

// add / delete reactions
router.route('/:thoughtID/reactions').post(addReactions).delete(deleteReactions);

module.exports = router;