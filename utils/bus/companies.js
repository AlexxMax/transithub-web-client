import { EventBus, EVENTS } from '@/utils/bus'

const currentCompanyChanged = {
  emit: () => {
    EventBus.$emit(EVENTS.CURRENT_COMPANY_CHANGED)
  },
  on: listener => {
    EventBus.$on(EVENTS.CURRENT_COMPANY_CHANGED, listener)
  },
  off: listener => {
    EventBus.$off(EVENTS.CURRENT_COMPANY_CHANGED, listener)
  }
}

export default {
  currentCompanyChanged
}
