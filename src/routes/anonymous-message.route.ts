import { Router } from 'express';
import { ValidateSchema, Schemas } from '../middleware/ValidateSchema';
import AnonymousMessageController from '../controllers/api/anonymous-message.controller';
import extractJWT from '../middleware/extractJWT';

const router = Router();

/** Set up your api routes here */
// User routes
router.get('/', AnonymousMessageController.index);
router.post('/', ValidateSchema(Schemas.anonymousMessage.create), AnonymousMessageController.create);
router.patch('/:id', ValidateSchema(Schemas.anonymousMessage.update), AnonymousMessageController.update);
router.get('/sync', AnonymousMessageController.sync);
router.get('/:id', AnonymousMessageController.show);
router.delete('/:id', AnonymousMessageController.delete);

export default router;
