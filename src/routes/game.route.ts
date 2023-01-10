import { Router } from 'express';
import { ValidateSchema, Schemas } from '../middleware/ValidateSchema';
import GameController from '../controllers/api/game.controller';

const router = Router();

/** Set up your api routes here */

// Post routes
router.get('/', GameController.index);
router.post('/', ValidateSchema(Schemas.game.create), GameController.create);
router.patch('/:id', ValidateSchema(Schemas.game.update), GameController.update);
router.get('/:id', GameController.show);
router.delete('/:id', GameController.delete);

export default router;
