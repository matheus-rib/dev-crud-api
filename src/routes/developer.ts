import { Router } from 'express'

// middlewares
import developerMiddleware from '../middlewares/developer'

// controllers
import developersController from '../controllers/DevelopersController'

const router = Router()

router.get('/')
router.post('/')
router.use('/:developerId')
router.get('/:developerId')
router.put('/:developerId')
router.delete('/:developerId')

export default router
