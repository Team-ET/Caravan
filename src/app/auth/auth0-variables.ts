interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: "jZslOYmLdnleoatyDPab2dQXuiWs2mX4",
  domain: "dev-xhza98ci.auth0.com",
  callbackURL: "http://localhost:4200/callback"
};