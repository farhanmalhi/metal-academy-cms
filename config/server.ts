export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  // security: {
  //   csrf: {
  //     enabled: true,
  //     key: '_csrf',
  //     secret: env('CSRF_SECRET', 'your-csrf-secret'),
  //   },
  //   xframe: {
  //     enabled: true,
  //     value: 'SAMEORIGIN',
  //   },
  //   hsts: {
  //     enabled: true,
  //     maxAge: 31536000,
  //     includeSubDomains: true,
  //   },
  //   xss: {
  //     enabled: true,
  //     mode: 'block',
  //   },
  //   cors: {
  //     enabled: true,
  //     origin: '*',
  //     headers: '*',
  //     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  //     credentials: false,
  //     maxAge: 86400,
  //   },
  // },
});
