export const oidcSettings = {
  authority: 'https://keycloak-edu-keycloak.apps.openshift-01.knowis.cloud/auth/realms/education',
  // update clientId and redirectUri based on the client created in keycloak
  clientId: 'portal-ui',
  redirectUri: 'https://cportfe-edu-keycloak.apps.openshift-03.knowis.cloud:443/oidc-callback',
  responseType: 'id_token token',
  scope: 'openid profile'
}
