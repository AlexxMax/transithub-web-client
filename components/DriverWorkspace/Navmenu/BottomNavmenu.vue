<template>
  <div class="BottomNavmenu">
    <div class="BottomNavmenu__footer mobile-driver-workspace__container">

      <div class="BottomNavmenu__footer__home">
        <nuxt-link
          :to="$i18n.path(`driver`)"
          exact-active-class="is-active"
          exact
          class="link"
        >
          <fa class="icon" icon="home" />
          <span>{{ $t('links.system.home') }}</span>
        </nuxt-link>
      </div>

      <div class="BottomNavmenu__footer__add">
        <div id="half-circle-wrapper"></div>

        <template v-if="modified">
          <Button circle>
            <fa class="icon" id="pen-icon" icon="pen" />
          </Button>

          <span>{{ $t('forms.common.edit') }}</span>
        </template>

        <template v-else>
          <Button circle @click="$methods.driver.setActionsheet(true, items)">
            <fa class="icon" id="add-icon" icon="plus" />
          </Button>

          <span>{{ $t('forms.common.createRace') }}</span>
        </template>
      </div>

      <div class="Navmenu__footer__settings">
        <nuxt-link
          :to="$i18n.path(`driver/pq-queues`)"
          exact-active-class="is-active"
          exact
          class="link"
        >
          <fa class="icon" icon="user-friends" />
          <span>{{ $t('forms.common.pqQueues') }}</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'

import Button from '@/components/Common/Buttons/Button'

import { CREATION_TYPES } from '@/utils/driver'
import * as notify from '@/utils/notifications'

export default {
  components: {
    Button
  },

  props: {
    visible: Boolean,
  },

  computed: {
    items() {

      return [
        this.modified && {
          children: [{
            text: this.continueText,
            function: this.handleClickContinue
          }]
        },
        {
          children: [{
              text: _.capitalize(this.$t('forms.driverWorkspace.creationTypeByVechicleRegister')),
              function: this.handleClickByVehicleRegister,
              loading: true
            },
            {
              text: _.capitalize(this.$t('forms.driverWorkspace.creationTypeManual')),
              function: this.handleClickManually
            },
          ]
        }
      ].filter(Boolean)

    },

    modified() {
      return this.$store.state.driver.races.form.modified
    },
    continueText() {
      const type = this.$store.state.driver.races.form.creationType === CREATION_TYPES.MANUAL ? this.$t('forms.driverWorkspace.creationTypeManual') : this.$t('forms.driverWorkspace.creationTypeByVechicleRegister')
      const date = moment(this.$store.state.driver.races.form.modifiedDate).format('DD.MM.YYYY')

      return `${this.$t('forms.driverWorkspace.continueCreationRace')} ${type} (${date})`
    }
  },

  methods: {
    handleClickContinue() {
      this.$router.push(this.$i18n.path(`driver/new-race`))
    },

    async handleClickByVehicleRegister() {
      this.$methods.driver.resetRaceForm()
      this.$methods.driver.setСreationType(CREATION_TYPES.BY_VEHICLE_REGISTER)

      const { status, count } =  await this.$methods.driver.fetchRaceFormVehiclesRegisters()

      if (!status) return

      if (count) {

        this.$router.push(this.$i18n.path(`driver/new-race`))

      } else {

        notify.error(this.$t('forms.driverWorkspace.noVehiclesRegisters'))
        return true
      }

    },

    async handleClickManually() {
      this.$methods.driver.resetRaceForm()
      this.$methods.driver.setСreationType(CREATION_TYPES.MANUAL)

      this.$router.push(this.$i18n.path(`driver/new-race`))
    }
  }
}
</script>

<style lang="scss" scoped>
#half-circle-wrapper {
  height: 21px;
  width: 48px;
  border-radius: 50px 50px 0 0;
  background: white;
  //border-top: 2px solid #EBEEF5;
  border-top: $--driver-workspace-border;
  box-shadow: 0px -1px 9px rgba(0, 0, 0, 0.03);
  margin-top: -6px;
}

.BottomNavmenu {
  position: fixed !important;
  height: 55px;
  background-color: white;
  z-index: 5;
  border-top: 1px solid #EBEEF5;
  width: 100%;
  display: flex;
  justify-content: center;
  box-shadow: 0px -1px 9px rgba(0, 0, 0, 0.03);
  bottom: 0;
  left: 0;
  right: 0;

  &__footer {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-around;
    padding: 0 20px;

    .icon {
      font-size: 19px;
    }

    #add-icon {
      font-size: 25px;
    }

    #add-icon {
      font-size: 20px;
    }

    &__add {
      margin: {
        top: -15px;
        //left: 30px;
      }
    }

    .link {
      margin-top: 5px;

      &:hover,
      &:focus,
      &.nuxt-link-active {
        color: $--color-primary;
      }
    }

    .link, &__add {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: $--main-text-color;

      span {
        font-size: 10px;
        margin-top: 5px;
      }
    }

    &__home, &__add, &__settings {
      cursor: pointer;
    }
  }
}

.el-button {
  border: none;
  font-size: 15px;
  padding: 8px 10px !important;
  background: $--color-primary;
  color: white;
  margin-top: -15px;
}

.is-active {
  color: $--color-primary !important;
}

.el-button--text:hover, .el-button--text:focus {
  background: $--color-primary;
  color: white;
}

@media screen and (max-width: 359px) {
  .BottomNavmenu__footer {
    padding: 0 20px;
  }
}
</style>
