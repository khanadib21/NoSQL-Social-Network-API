const { Thought, User, Reaction } = require('../models');
const {Types} = require('mongoose');

// Thought
const ThoughtCon = {
  async getThoughts(req, resp) {
    try {
      const allthoughts = await Thought.find({});
      resp.json(allthoughts);
    } catch (error) {
      resp.status(500).json(error);
    }
  },

  // findThoughtById
  async findThoughtById(req, resp) {
    try {
      const new_thought = await Thought.findOne({_id: req.params.tId});
      if (!new_thought) {
        resp.status(404).json({ message: 'Thought not found' });
      } else {
        resp.json(new_thought);
      }
    } catch (error) {
      resp.status(500).json(error);
    }
  },

  // addThought
  async addThought(req, resp) {
    try {
      const addthought = await Thought.create(req.body);
      resp.status(201).json(addthought);
    } catch (error) {
      resp.status(500).json(error);
    }
  },

  // destroyThought
  async destroyThought(req,resp) {
    try {
        const deletethought = await Thought.findByIdAndDelete({_id: req.params.tId});
        resp.status(200).json(deletethought);
    } catch (error) {
        resp.status(500).json(error);
    }
  },

  // updateThought
  async updateThought(req, resp) {
    try {
      const editthought = await Thought.findByIdAndUpdate(req.params.tId, req.body, {
        new: true,
      });
      if (!editthought) {
        resp.status(404).json({ message: 'Thought not found' });
      } else {
        resp.json(editthought);
      }
    } catch (error) {
      resp.status(500).json(error);
    }
  },

  // addReaction
  async addReaction(req, resp) {
      try {
        const newthought = await Thought.findOneAndUpdate(
            {_id:req.params.tId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        );
        newthought ? resp.json(newthought) : resp.status(404).json({message: notFound});
    } catch (error) {
        resp.status(500).json(error);
    }
  },

  // destroyReaction
  async destroyReaction(req, resp) {
      try {
        const newthought = await Thought.findOneAndUpdate(
            {_id: req.params.tId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        );

        newthought ? resp.json(newthought) : resp.status(404).json({message: notFound});
    } catch (error) {
        resp.status(500).json(error);
    }
  },

};
module.exports = ThoughtCon;
