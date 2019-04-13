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

            <el-dropdown-item class="CompanyMenu__DropdownItem">
              <div class="CompanyMenu__DropdownItem__Link">
                <el-button class="CompanyMenu__DropdownItem__Link__Btn"
                  type="text"
                  @click="$router.push($i18n.path('company/profile'))">

                  <fa icon="suitcase" />
                  {{ $t('links.system.companyProfile') }}
                </el-button>
              </div>
            </el-dropdown-item>

            <el-dropdown-item class="CompanyMenu__DropdownItem__List" divided>
              <CompaniesListItem
                v-for="company of companies"
                :key="company.guid"
                :company="company"
              />
            </el-dropdown-item>

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
  },

 
};
</script>

<style lang="scss" scoped>
.CompanyMenu__DropdownItem__Link {
  margin: 0 -20px;
  padding: 0 20px;
  transition: .5s;
  
  &:hover {
    border-left: 2px solid #fecd34;
  }

  &__Btn {
    width: 100%;
    text-align: left;
    font-family: Montserrat;
    color: #606266 !important;
    font-weight: 400 !important;
  }
}

.CompanyAvatarWrapper {
  width: 100%;
  cursor: pointer;
  margin-right: 10px;
}

.el-dropdown-menu {
  border-radius: 10px !important;
  min-width: 228px;
}

.CompanyMenu__DropdownItem {
  line-height: 16px;
  transition: .5s;
}

.CompanyMenu__DropdownItem__List:not(.is-disabled):hover, .CompanyMenu__DropdownItem__List:focus {
  background-color: transparent !important;
}

.CompanyMenu__DropdownItem:not(.is-disabled):hover, .CompanyMenu__DropdownItem:focus {
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
</style>
