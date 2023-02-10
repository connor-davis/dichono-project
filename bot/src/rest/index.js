const { Router } = require('express');
const router = Router();

const configurationRoutes = require('./configuration');

/**
 * @openapi
 * tags:
 *   - name: Configuration
 *     description: Api configuration routes.
 */
router.use('/configuration', configurationRoutes);

module.exports = router;
