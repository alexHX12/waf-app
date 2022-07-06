export const environment = {
  production: true,
  backendURL: "http://api.waf-1.ml",
  localURL: "http://gestione.waf-1.ml",
  clientID:{
    domain: 'waf-tenant.us.auth0.com',
    clientId: '3GDnYnEvCmLR5p3z1cMJtYhJQldVlr43',
    audience:'http://api.waf-1.ml',
    httpInterceptor: {
      allowedList: [
        {
          uri: 'http://api.waf-1.ml/*',
          tokenOptions: {
            audience: 'http://api.waf-1.ml'
          }
        }
      ]
    }
  }
};