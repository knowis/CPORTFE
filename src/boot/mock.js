import { makeServer } from '../mock'
import { backendSettings } from '../config/backend'

if (process.env.NODE_ENV === 'development' && backendSettings.host && backendSettings.host.includes('localhost')) {
  makeServer()
}
