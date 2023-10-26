const router = require('express').Router();
const {
    getThoughts,
    findThoughtById,
    addThought,
    destroyThought,
    updateThought,
    addReaction,
    destroyReaction,
} = require('../../controllers/thought');

router.route('/').get(getThoughts).post(addThought);
router.route('/:tId/reactions').post(addReaction);
router.route('/:tId').get(findThoughtById).put(updateThought).delete(destroyThought);
router.route('/:tId/reactions/:reactionId').delete(destroyReaction);
module.exports = router;