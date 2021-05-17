import { Server, Model, RestSerializer } from 'miragejs'
import { backendSettings } from '../config/backend'
const data = require('./data.json')

export function makeServer ({ environment = 'development' } = {}) {
  const server = new Server({
    environment,
    serializers: {
      credits: RestSerializer.extend({ root: false, embed: true }),
      messages: RestSerializer.extend({ root: false, embed: true })
    },
    models: {
      messages: Model,
      credits: Model
    },

    routes () {
      // this.namespace = `${backendSettings.host}`
      // this.get(`${backendSettings.host}/v1/messages/:user`, schema => {
      //   const user = request.params.user
      //   return schema.messages.all()
      // })
      this.get(`${backendSettings.host}/credit/credits`, schema => {
        return schema.credits.all()
      })
      this.delete(`${backendSettings.host}/credit/credits/:id`, (schema, request) => {
        const id = request.params.id
        console.log(`recall credit with id ${id}`)
      })
      this.get(`${backendSettings.host}/rateIn/rates/:duration`, (schema, request) => {
        const duration = request.params.duration
        const amount = request.queryParams.amount

        let nominalInterest
        if (duration <= 12) {
          nominalInterest = 0.0102
        } else if (duration <= 24) {
          nominalInterest = 0.0114
        } else if (duration <= 24) {
          nominalInterest = 0.0114
        } else if (duration <= 36) {
          nominalInterest = 0.0136
        } else if (duration <= 48) {
          nominalInterest = 0.0159
        } else if (duration <= 60) {
          nominalInterest = 0.0217
        }

        const i = nominalInterest
        const m = 12
        const im = i / m
        const effectiveInterest = Math.pow(1 + im, m) - 1
        const n = duration / m
        const s0 = amount
        const cmn = Math.pow(1 + im, m * n)
        const rate = s0 * cmn * (im / (cmn - 1))
        return {
          nominalInterestRate: nominalInterest,
          effectiveInterestRate: effectiveInterest,
          monthlyRate: rate
        }
      })
      this.post(`${backendSettings.host}/credit/credits/`, (schema, request) => {
        const cred = JSON.parse(request.requestBody)
        cred.id = schema.credits.all().length + 1

        // also add a message
        const msg = {
          id: schema.messages.all().length,
          user: 'user1',
          text: ['Your application has been approved and the money will be transferred tomorrow.'],
          sender: 'World Bank',
          timestamp: new Date().toISOString()
        }
        window.setTimeout(() => schema.messages.create(msg), 10000)

        return schema.credits.create(cred)
      })
      this.post(`${backendSettings.host}/v1/testdata/`, () => {

      })
      this.delete(`${backendSettings.host}/v1/testdata/`, () => {

      })
    }
  })
  server.db.loadData(data)
  return server
}
