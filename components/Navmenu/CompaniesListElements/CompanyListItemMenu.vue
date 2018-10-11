<template>
  <LeftView :show="show" @close="close">
    <div v-if="show">

      <div class="CompanyListItemMenu">

        <div class="CompanyListItemMenu__header">
          <span class="CompanyListItemMenu__header-title">{{ $t('links.navmenu.company.companyFastView') }}</span>
          <i class="el-icon-close CompanyListItemMenu__header-close" @click="close"></i>
        </div>

        <div class="CompanyListItemMenu__body">
          <div class="CompanyListItemMenu__body-avatar">
            <Avatar
              :name="company.name"
              :size="100"
              radius5px
              :style="{ 'width': '100px' }"/>
          </div>

          <div class="CompanyListItemMenu__body-items">
            <span class="CompanyListItemMenu__body-items-name">{{ company.shortname }}</span>

            <ContactInfo
              v-for="(ci, index) of contactInfo"
              class="CompanyListItemMenu__body-items-item"
              :key="index"
              :type="ci.type"
              :value="ci.value"
              opened/>

            <nuxt-link
              class="CompanyListItemMenu__body-items-button"
              :to="$i18n.path('company/profile')">
              <Button type="primary">
                {{ $t('links.navmenu.company.editCompany') }}
              </Button>
            </nuxt-link>
          </div>
        </div>

      </div>

    </div>
  </LeftView>
</template>

<script>
import LeftView from '@/components/Common/LeftView'
import Avatar from '@/components/Common/Avatar'
import Button from '@/components/Common/Buttons/Button'
import ContactInfo from '@/components/Common/ContactInfo'

export default {
  name: 'th-company-list-item-menu',

  components: {
    LeftView,
    Avatar,
    Button,
    ContactInfo
  },

  computed: {
    show() {
      return this.$store.state.companies.navmenu.showCompanyMenu
    },
    company() {
      const companyGuid = this.$store.state.companies.navmenu.companyGuid
      return this.$store.getters["companies/getCompanyByGuid"](companyGuid)
    },
    contactInfo() {
      const contactInfo = []

      if (this.company.email) {
        contactInfo.push({
          type: 'mail',
          value: this.company.email
        })
      }

      if (this.company.phone) {
        contactInfo.push({
          type: 'phone',
          value: this.company.phone.pMaskPhone()
        })
      }

      if (this.company.webpage) {
        contactInfo.push({
          type: 'webpage',
          value: this.company.webpage
        })
      }

      if (this.company.facebook) {
        contactInfo.push({
          type: 'facebook',
          value: this.company.facebook
        })
      }

      if (this.company.telegram) {
        contactInfo.push({
          type: 'telegram',
          value: this.company.telegram
        })
      }

      return contactInfo
    }
  },

  methods: {
    close() {
      this.$store.commit('companies/SET_NAVMENU')
    }
  }
}
</script>

<style lang="scss" scoped>
.CompanyListItemMenu {
  display: flex;
  flex-direction: column;
  color: #525252;

  .CompanyListItemMenu__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #A3A2A2;

    .CompanyListItemMenu__header-title {
      text-transform: uppercase;
      font-size: 11px;
      font-weight: 500;
    }

    .CompanyListItemMenu__header-close {
      font-size: 16px;
    }
  }

  .CompanyListItemMenu__body {
    margin-top: 20px;

    .CompanyListItemMenu__body-avatar {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    .CompanyListItemMenu__body-items {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      text-align: center;

      .CompanyListItemMenu__body-items-name {
        margin-bottom: 20px;
        font-weight: 500;
        font-size: 16px;
      }

      .CompanyListItemMenu__body-items-item {
        margin: 10px auto;
      }

      .CompanyListItemMenu__body-items-button {
        margin-top: 40px;
      }
    }
  }
}
</style>
