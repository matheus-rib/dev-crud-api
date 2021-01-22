import { Router } from 'express'
import developers from './developers'
import paginationMiddleware from '../middlewares/pagination'

const router = Router()

router.use(paginationMiddleware)
router.use('/developers', developers)

export default router
