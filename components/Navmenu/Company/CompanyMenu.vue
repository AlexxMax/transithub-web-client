<template>
  <el-dropdown trigger="click">
    <span>
      <div slot="reference" class="CompanyAvatarWrapper">
        <CompanyAvatar
          class="CompanyAvatarWrapper__Avatar"
          :name="company.name"
          :size="36"
          radius5px
          :style="{ 'width': '36px' }"/>
      </div>
    </span>

    <el-dropdown-menu slot="dropdown">
      <div class="CompanyCardWrapper">
        <div class="CompanyCard">
          <div class="CompanyCardMain">

            <el-dropdown-item class="CompanyMenu__DropdownItem" disabled>
              <div class="CompanyMenu__DropdownItem__SelectedCompany">
                <div class="CompanyMenu__DropdownItem__SelectedCompany__CompanyName">{{ company.name }}</div>
                <div class="CompanyMenu__DropdownItem__SelectedCompany__CompanyFullName">{{ company.fullname }}</div>
              </div>
            </el-dropdown-item>

            <el-dropdown-item class="CompanyMenu__DropdownItem" divided>
              <div class="CompanyMenu__DropdownItem__Link">
                <el-button class="CompanyMenu__DropdownItem__Link__Btn"
                  type="text"
                  @click="$router.push($i18n.path(`workspace/companies/${$store.state.companies.currentCompany.guid}`))">

                  <fa icon="suitcase" />
                  {{ $t('links.system.companyProfile') }}
                </el-button>
              </div>
            </el-dropdown-item>

            <el-dropdown-item divided></el-dropdown-item>

            <CompaniesListItem
              class="CompanyMenu__DropdownItem__List"
              v-for="с of companies"
              :key="с.guid"
              :company="с"
            />

            <el-dropdown-item class="CompanyMenu__DropdownItem" divided>
              <div class="CompanyMenu__DropdownItem__Link">
                <el-button
                  class="CompanyMenu__DropdownItem__Link__Btn"
                  type="text"
                  @click="$store.dispatch('companies/showCreateNewDialog', true)">

                  <fa icon="plus" />
                  {{ $t('links.system.newCompany') }}
                </el-button>
              </div>
            </el-dropdown-item>
          </div>
        </div>
      </div>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Avatar from "@/components/Common/Avatar.vue"
import CompaniesListItem from '@/components/Navmenu/Company/CompaniesListItem'

export default {
  components: {
    "CompanyAvatar": Avatar,
    CompaniesListItem
  },

  computed: {
    company() {
      return this.$store.getters['companies/getCurrentCompany']
    },

    companies() {
      return this.$store.state.companies.list
    }
  }
};
</script>

<style lang="scss" scoped>
.CompanyMenu__DropdownItem__SelectedCompany {
  margin: 15px -20px;
  padding: 0 20px;

  &__CompanyName {
    font-size: 16px;
    text-transform: capitalize;
    font-weight: 500;
    margin-top: 7px;
    color: #000;
  }

  &__CompanyFullName {
    font-size: 12px;
    font-weight: 300;
    margin-top: 8px;
    color: #000;
  }
}

.CompanyCardWrapper {
  max-height: 400px;
  width: 320px;
}

.CompanyMenu__DropdownItem__Link {
  padding: 0 20px !important;
  margin: 0 -20px;
}

.CompanyMenu__DropdownItem__Link, .CompanyMenu__DropdownItem__List {
  padding: 5px 20px;
  transition: .5s;
  cursor: pointer;

  &:hover {
    border-left: 2px solid #fecd34;
    color: #fed75d;
  }

  &__Btn {
    width: 100%;
    text-align: left;
    font-family: Montserrat;
    color: #606266 !important;
    font-weight: 400;
  }
}

.CompanyAvatarWrapper {
  //width: 100%;
  cursor: pointer;
  margin-right: 30px;

  &__Avatar {
    box-shadow: 0px 0px 1px 4px rgba(175, 176, 178, 0.1);
    transition: .5s;

    &:hover {
      box-shadow: 0px 0px 2px 4px rgba(175, 176, 178, 0.2);
    }
  }
}

.el-dropdown-menu {
  border-radius: 10px !important;
  min-width: 268px;
  max-width: 320px;
  max-height: 100% !important;
}

.CompanyMenu__DropdownItem {
  line-height: 16px;
  transition: .5s;
}

.CompanyMenu__DropdownItem__Link:not(.is-disabled):hover, .CompanyMenu__DropdownItem__Link:focus,
.CompanyMenu__DropdownItem__List:not(.is-disabled):hover, .CompanyMenu__DropdownItem__List:focus {
  background-color: rgba(254, 205, 52, 0.15) !important;
  color: #606266 !important;
}

svg:not(:root).svg-inline--fa {
  margin-right: 5px;
}

.CompanyMenu__DropdownItem {
  color: #000;
  line-height: 16px;
}

.el-popper {
  top: 54px !important;
}
</style>
