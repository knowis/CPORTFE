export function login (state, user) {
  state.userId = user.id
  state.loggedIn = true
  state.username = user.name
}

export function logout (state) {
  state.userId = ''
  state.loggedIn = false
  state.username = ''
}

export function locale (state, locale) {
  state.preferredLocale = locale
}

export function currency (state, currency) {
  state.defaultCurrency = currency
}
