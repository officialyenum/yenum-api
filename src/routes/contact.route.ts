import { Router } from 'express';
import { ValidateSchema, Schemas } from '../middleware/ValidateSchema';
import ContactController from '../controllers/api/contact.controller';
import extractJWT from '../middleware/extractJWT';

const router = Router();

/** Set up your api routes here */
// User routes
router.get('/', ContactController.index);
router.post('/', ValidateSchema(Schemas.contact.create), ContactController.create);
router.patch('/:id', ValidateSchema(Schemas.contact.update), ContactController.update);
router.get('/sync', ContactController.sync);
router.get('/:id', ContactController.show);
router.delete('/:id', ContactController.delete);

export default router;
