import { Router } from 'express'
import developers from './developers'

const router = Router()

router.use('/developers', developers)

export default router
