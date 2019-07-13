<template>
  <FiltersSimpleButtonsView :show-all="false" :items="items" @click="handleFiltersClick"/>
</template>

<script>
import moment from 'moment'

import FiltersSimpleButtonsView from '@/components/Common/Lists/Filters/FiltersSimpleButtonsView'

import {
  setFilter,
  getVehiclesRegisterStatus,
  getVehiclesRegisterStatusSelect,
  VEHICLES_REGISTER_STATUS
} from '@/utils/requests'

import { generateFilterValue, getFilterValue } from '@/utils/filters'

const FILTERS = Object.freeze({
  YESTERDAY: 'yesterday',
  TODAY: 'today',
  TOMORROW: 'tomorrow',
  WITHOUT_VEHICLE_REGISTER: 'no_vehicle_register',
  VEHICLE_REGISTER_NOT_SEND: 'vehicle_register_not_send'
})

const VEHICLES_REGISTER_STATUS_CODES = Object.freeze({
  NO_REGISTERS: 'no_registers',
  NOT_SENT: 'not_sent'
})

export default {
  name: 'th-requests-simple-filters',

  components: { FiltersSimpleButtonsView },

  data() {
    return {
      items: [{
        name: FILTERS.YESTERDAY,
        title: this.$t('forms.common.yesterday'),
        toggled: false
      }, {
        name: FILTERS.TODAY,
        title: this.$t('forms.common.today'),
        toggled: false
      }, {
        name: FILTERS.TOMORROW,
        title: this.$t('forms.common.tomorrow'),
        toggled: false
      }, {
        name: FILTERS.WITHOUT_VEHICLE_REGISTER,
        title: this.$t('forms.request.vehiclesRegisterHandleStatus.noRegisters'),
        toggled: false
      }, {
        name: FILTERS.VEHICLE_REGISTER_NOT_SEND,
        title: this.$t('forms.request.vehiclesRegisterHandleStatus.notSent'),
        toggled: false
      }],

      vehiclesRegisterStatusSelect: getVehiclesRegisterStatusSelect(this),

      // selectedVehiclesRegisterStatuses: []
    }
  },

  computed: {
    period() {
      return [
        this.$store.state.requests.filters.set.periodFrom,
        this.$store.state.requests.filters.set.periodTo
      ]
    },
    vehiclesRegistersStatuses() {
      return getFilterValue(this.$store.state.requests.filters.set.vehiclesRegistersStatuses)
    }
  },

  methods: {
    handleFiltersClick(_filters, filterName, toggled) {
      if (filterName === FILTERS.YESTERDAY) {
        const yesterday = moment().add(-1, 'day')
        this.setPeriodFilter(yesterday.startOf('day').toDate(), yesterday.endOf('day').toDate(), toggled)
      } else if (filterName === FILTERS.TODAY) {
        const today = moment()
        this.setPeriodFilter(today.startOf('day').toDate(), today.endOf('day').toDate(), toggled)
      } else if (filterName === FILTERS.TOMORROW) {
        const tomorrow = moment().add(1, 'day')
        this.setPeriodFilter(tomorrow.startOf('day').toDate(), tomorrow.endOf('day').toDate(), toggled)
      } else if (filterName === FILTERS.WITHOUT_VEHICLE_REGISTER) {
        this.setVehiclesRegisterStatus(VEHICLES_REGISTER_STATUS_CODES.NO_REGISTERS, toggled)
      } else if (filterName === FILTERS.VEHICLE_REGISTER_NOT_SEND) {
        this.setVehiclesRegisterStatus(VEHICLES_REGISTER_STATUS_CODES.NOT_SENT, toggled)
      }
    },

    setPeriodFilter(dateFrom, dateTo, toggled) {
      if (toggled) {
        setFilter(this, 'period', [ dateFrom, dateTo ])
        return
      }
      setFilter(this, 'period', [ null, null ])
    },

    setVehiclesRegisterStatus(statusCode, toggled) {
      const statuses = this.vehiclesRegistersStatuses.filter(item => item !== statusCode)
      if (toggled) {
        statuses.push(statusCode)
      }

      setFilter(
        this,
        'vehiclesRegistersStatuses',
        generateFilterValue(
          statuses,
          this.vehiclesRegisterStatusSelect,
          'code'
        )
      )
    },

    checkPeriod(itemName, date) {
      const [ periodFrom, periodTo ] = this.period

      const item = this.items.find(item => item.name === itemName)
      item.toggled = false

      if (periodFrom && periodTo) {
        const start = date.startOf('day')
        const end = date.endOf('day')

        item.toggled = (moment(periodFrom).format("DD-MM-YYYY") === start.format("DD-MM-YYYY"))
          && (moment(periodTo).format("DD-MM-YYYY") === end.format("DD-MM-YYYY"))
      }
    },

    checkVehiclesRegistersStatus(itemName, statusCode) {
      const item = this.items.find(item => item.name === itemName)
      item.toggled = false

      const status = this.vehiclesRegistersStatuses.find(item => item === statusCode)
      item.toggled = Boolean(status)
    }
  },

  watch: {
    period: {
      immediate: true,
      handler() {
        this.checkPeriod(FILTERS.YESTERDAY, moment().add(-1, 'days'))
        this.checkPeriod(FILTERS.TODAY, moment())
        this.checkPeriod(FILTERS.TOMORROW, moment().add(1, 'days'))
      }
    },
    vehiclesRegistersStatuses: {
      immediate: true,
      handler() {
        this.checkVehiclesRegistersStatus(
          FILTERS.WITHOUT_VEHICLE_REGISTER,
          VEHICLES_REGISTER_STATUS_CODES.NO_REGISTERS
        )
        this.checkVehiclesRegistersStatus(
          FILTERS.VEHICLE_REGISTER_NOT_SEND,
          VEHICLES_REGISTER_STATUS_CODES.NOT_SENT
        )
      }
    }
  }
}
</script>
