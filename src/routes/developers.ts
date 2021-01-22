import { Router } from 'express'
import requestHandler from '../utils/requestHandler'

// middlewares
import developerScopeMiddleware from '../middlewares/developerScope'

// controllers
import developersController from '../controllers/DevelopersController'

const router = Router()

router.get('/', requestHandler(developersController.list))
router.post('/', requestHandler(developersController.create))
router.use('/:developerId', developerScopeMiddleware)
router.get('/:developerId', requestHandler(developersController.show))
router.put('/:developerId', requestHandler(developersController.update))
router.delete('/:developerId', requestHandler(developersController.destroy))

export default router
