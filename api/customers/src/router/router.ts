// Libs
import { Router } from 'express';

import LoggerFactory from '@logger';

// Data
const router = Router();

router.all('*', (req, res) => {
    const logger = LoggerFactory.createLogger(req.ip);
    logger.info('Acessed an unknown route.');
    return res.status(404).json({
        status: 'error',
        message: 'Not found'
    });
});

// Code
export default router;