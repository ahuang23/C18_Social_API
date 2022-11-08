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

// get / delete / update thoughts by ID
router.route('/:thoughtId').get(getThoughtsById).delete(deleteThoughts).put(updateThoughts);

// add reaction
router.route('/:thoughtId/reactions').post(addReactions);

// delete reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReactions);

module.exports = router;