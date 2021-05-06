import Vue from 'vue'
import { date } from 'quasar'
import store from './../store'

const percentageFormatter = new Map()
const dateFormatter = new Map()
const tsFormatter = new Map()

function getFormatterPercentage (locale, fractionDigits) {
  let res = percentageFormatter.get(locale + fractionDigits)
  if (!res) {
    percentageFormatter.set(locale + fractionDigits, new Intl.NumberFormat(locale, { style: 'percent', minimumFractionDigits: fractionDigits }))
    res = percentageFormatter.get(locale + fractionDigits)
  }
  return res
}

function getFormatterDate (locale) {
  let res = dateFormatter.get(locale)
  if (!res) {
    dateFormatter.set(locale, new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }))
    res = dateFormatter.get(locale)
  }
  return res
}

function getFormatterTimestamp (locale) {
  let res = tsFormatter.get(locale)
  if (!res) {
    tsFormatter.set(locale, new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'medium' }))
    res = tsFormatter.get(locale)
  }
  return res
}

Vue.filter('formatPercentage', function (value) {
  if (typeof value === 'number') {
    return getFormatterPercentage(store.state.userdata.preferredLocale, 2).format(value)
  }
  return undefined
})

Vue.filter('formatPercentage4', function (value) {
  if (typeof value === 'number') {
    return getFormatterPercentage(store.state.userdata.preferredLocale, 4).format(value)
  }
  return undefined
})

Vue.filter('dateFormat', function (value) {
  if (value) {
    return getFormatterDate().format(new Date(value))
  }
  return undefined
})

Vue.filter('timestampFormat', function (value) {
  if (value) {
    return getFormatterTimestamp().format(date.extractDate(value))
  }
  return undefined
})
