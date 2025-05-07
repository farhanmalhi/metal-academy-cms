/**
 * module router
 */

import { factories } from '@strapi/strapi';

export default {
  routes: [
    {
      method: 'GET',
      path: '/modules/tree',
      handler: 'module.getAllWithNested',
      config: {
        policies: [],
        auth: {
          strategies: ['api-token', 'admin'],
        },
      },
    }
  ]
}; 