import { Router } from 'express';
import UserController from '../controllers/api/user.controller';
import IndexController from '../controllers/api/index.controller';

import { AI21 } from "@officialyenum/ai21";

import authRoutes from './auth.route';
import userRoutes from './user.route';
import gameRoutes from './game.route';
import anonymousMessageRoutes from './anonymous-message.route';

import { Request, Response, NextFunction } from 'express';
import { AIResponse, IParaphrase, ISummaryBody } from '@officialyenum/ai21/lib/cjs/types/library';

const router = Router();

/** Set up your api routes here */

// Health check
router.get('/', IndexController.index);
router.get('/ping', IndexController.health);

// Auth routes
router.use('/auth', authRoutes);
// User routes
router.use('/users', userRoutes);
// Game routes
router.use('/games', gameRoutes);
// Game routes
router.use('/anonymous-message', anonymousMessageRoutes);

router.get('/ai', async (req: Request, res: Response, next: NextFunction) => {

    const token:string = process.env.AI21_TOKEN  as string;
    const ai = new AI21(token)
    const data:IParaphrase = {
        text: "La Taqueria is a tiny place with 3 long tables inside and 2 small tables outside. The inside is cramped, but the outside is pleasant. Unfortunately, we had to sit inside as all the outside tables were taken. The tacos are delicious and reasonably priced and the salsa is spicy and flavorful. Service was friendly. Aside from the seating, the only thing I didn't like was the lack of parking - we had to walk six blocks to find a spot",
        style: "general", // financial_report, academic_paper, wikipedia_article
    }
    const resp:AIResponse | undefined = await ai.paraphrase(data);
    console.log(resp);
    // {
    //     "status": "success",
    //     "message": "Summaries Retrieved Successfully",
    //     "data": [
    //       {
    //         "text": "Olives, wheat and grapes have been the staple foods of the Mediterranean world, with seafood as the preferred protein source.\nThis paper reviews how seafood has been present in the dietary practices of the Mediterranean people since ancient Egyptians up to the gastronomic discourse of some celebrated contemporary chefs.\nSome contemporary celebrity chefs are not fully aware of the rich Mediterranean culinary heritage."
    //       }
    //     ]
    //  }
    return res.status(200).json(resp);
});

export default router;
