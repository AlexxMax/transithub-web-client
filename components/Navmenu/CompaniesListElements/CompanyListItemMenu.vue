<template>
  <LeftView :show="show" @close="close">
    <div v-if="show">

      <div class="CompanyListItemMenu">

        <div class="CompanyListItemMenu__header">
          <span class="CompanyListItemMenu__header-title">{{ company.shortname }}</span>
          <i class="el-icon-close CompanyListItemMenu__header-close" @click="close"></i>
        </div>

        <div class="CompanyListItemMenu__body">

          <div class="CompanyListItemMenu__body-items">
            <Navlink
              class="CompanyListItemMenu__navlink"
              v-for="(item, index) in links"
              :key="index"
              :link="item.link"
              :icon="item.icon"
              :title="item.title"
              @clicked="close"/>
          </div>

          <Navlink
            class="CompanyListItemMenu__body-items-button CompanyListItemMenu__navlink"
            link="company/profile"
            icon="cog"
            title="links.navmenu.company.editCompany"
          />
        </div>

      </div>

    </div>
  </LeftView>
</template>

<script>
import LeftView from '@/components/Common/LeftView'
import Button from '@/components/Common/Buttons/Button'
import Navlink from '@/components/Navmenu/Navlink'

export default {
  name: 'th-company-list-item-menu',

  components: {
    LeftView,
    Button,
    Navlink
  },

  data: () => ({
    links: [
      {
        icon: 'list',
        title: 'links.documents.requests',
        link: 'workspace/requests'
      }, {
        icon: 'book-open',
        title: 'links.documents.vehiclesRegisters',
        link: 'workspace/vehicles-registers'
      }, {
        icon: 'shipping-fast',
        title: 'links.documents.races',
        link: 'workspace/races'
      }
    ]
  }),

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
    margin-top: 5px;

    .CompanyListItemMenu__body-items {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
    }

    .CompanyListItemMenu__body-items-button {
      position: absolute;
      bottom: 0;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }

  .CompanyListItemMenu__navlink {
    margin: 5px 5px 5px -10px;
  }
}
</style>
