export const oidcSettings = {
  authority: 'https://auth.apps.openshift-03.knowis.cloud/auth/realms/qa-br',
  clientId: 'portal-ui',
  redirectUri: 'https://cportfe-qa-br.apps.openshift-03.knowis.cloud:443/oidc-callback',
  responseType: 'id_token token',
  scope: 'openid profile'
}
