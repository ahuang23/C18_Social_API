const { User, Thought } = require('../models');

module.exports = {
    getAllThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    getThoughtsById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought found'})
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    addThoughts(req, res) {
        Thought.create(req.body)
            .then((thought) => {
// Associate thought with User                 
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id }},
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(400).json({ message: 'Thought created, but no user found'})
                    : res.json('Thought Created')
                )
                .catch((err) =>  res.status(500).json(err))
    },
    updateThoughts(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought found'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteThoughts(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought found'})
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: thoughtId } },
                        { new: true }
                    )
            )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'Thought deleted, but no user found'})
                    : res.json({ message: 'Thought Deleted'})
            )
            .catch((err) => res.status(500).json(err));
    },
    addReactions(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body} },
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought found'})
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteReactions(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { thought: req.params.thoughtId }},
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought found'})
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }

};