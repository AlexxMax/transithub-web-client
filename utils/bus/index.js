import Vue from 'vue'

import companies from '@/utils/bus/companies'

export const EVENTS = Object.freeze({
  CURRENT_COMPANY_CHANGED: 'current-company-changed'
})

export const EventBus = new Vue({})

export default {
  companies
}
