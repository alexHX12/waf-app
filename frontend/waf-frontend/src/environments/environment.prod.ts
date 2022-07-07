export const environment = {
  production: true,
  backendURL: "https://api.waf-1.ml",
  localURL: "https://gestione.waf-1.ml",
  clientID:{
    domain: 'waf-tenant.us.auth0.com',
    clientId: '3GDnYnEvCmLR5p3z1cMJtYhJQldVlr43',
    audience:'https://api.waf-1.ml',
    httpInterceptor: {
      allowedList: [
        {
          uri: 'https://api.waf-1.ml/*',
          tokenOptions: {
            audience: 'https://api.waf-1.ml'
          }
        }
      ]
    }
  }
};