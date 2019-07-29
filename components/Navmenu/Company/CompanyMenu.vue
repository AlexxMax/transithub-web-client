<template>
  <el-dropdown trigger="click">
    <span>
      <div slot="reference" class="CompanyAvatarWrapper">
        <Avatar
          class="CompanyAvatarWrapper__Avatar"
          :name="company.name"
          :size="38"
          square
          cursor
          hover
        />
      </div>
    </span>

    <el-dropdown-menu slot="dropdown">
      <div class="CompanyCardWrapper">
        <div class="CompanyCard">
          <div class="CompanyCardMain">
            <div v-if="notEmptyCompany" class="sticky-top" style="margin-bottom: 15px;">
              <el-dropdown-item class="CompanyMenu__DropdownItem" style="padding-top: 5px;" disabled>
                <div class="CompanyMenu__DropdownItem__SelectedCompany">
                  <div class="CompanyMenu__DropdownItem__SelectedCompany__CompanyName">
                    {{ company.name }}
                  </div> 
                </div> 
                  <!-- <div
                    class="CompanyMenu__DropdownItem__SelectedCompany__CompanyFullName"
                  >{{ company.fullname }}</div>-->
              </el-dropdown-item>

              <el-dropdown-item class="CompanyMenu__DropdownItem no-hover">
                <el-button
                  class="CompanyMenu__DropdownItem__SelectedCompany__CompanyName__profile-link"
                  type="text"
                  @click="$router.push($i18n.path(`workspace/companies/${$store.state.companies.currentCompany.guid}`))"
                >
                  {{ $t('links.system.viewCompanyProfile') }}
                </el-button>
              </el-dropdown-item>

              <!-- <el-dropdown-item class="CompanyMenu__DropdownItem" divided>
                <div class="CompanyMenu__DropdownItem__Link">
                  <el-button
                    class="CompanyMenu__DropdownItem__Link__Btn"
                    type="text"
                    @click="$router.push($i18n.path(`workspace/companies/${$store.state.companies.currentCompany.guid}`))"
                  >
                    <fa icon="suitcase" />
                    {{ $t('links.system.companyProfile') }}
                  </el-button>
                </div>
              </el-dropdown-item> -->

              <el-dropdown-item divided></el-dropdown-item>
            </div>

            <CompaniesListItem
              class="CompanyMenu__DropdownItem__List"
              v-for="с of companies"
              :key="с.guid"
              :company="с"
            />

            <el-dropdown-item v-if="notEmptyCompany" style="margin-top: 15px;"></el-dropdown-item>

            <el-dropdown-item class="CompanyMenu__DropdownItem" :class="{ 'sticky-bottom': notEmptyCompany, 'el-dropdown-menu__item--divided': notEmptyCompany }">
              <div class="CompanyMenu__DropdownItem__Link" :class="{ last: notEmptyCompany }">
                <el-button
                  class="CompanyMenu__DropdownItem__Link__Btn"
                  type="text"
                  @click="$store.dispatch('companies/showCreateNewDialog', true)"
                >
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
import Avatar from '@/components/Common/Avatar'
import CompaniesListItem from "@/components/Navmenu/Company/CompaniesListItem";

export default {
  components: {
    Avatar,
    CompaniesListItem
  },

  computed: {
    company() {
      return this.$store.getters["companies/getCurrentCompany"];
    },

    companies() {
      return this.$store.state.companies.list;
    },

    notEmptyCompany() {
      return Object.keys(this.company).length;
    }
  }
};
</script>

<style lang="scss" scoped>
.CompanyMenu__DropdownItem__SelectedCompany {
  margin: {
    top: 15px;
    right: -20px;
    bottom: 5px;
    left: -20px;
  }
  padding: 0 20px;

  &__CompanyName {
    font-size: 16px;
    text-transform: capitalize;
    font-weight: 500;
    color: #000;
    white-space: normal;
    line-height: 1.5;

    &__profile-link {
      font-size: 12px;
      padding: 8px 15px;
      border-radius: 30px;
      background: #FFD74D;
      color: white !important;
      transition: 0.5s;
      margin: {
        top: 10px;
        bottom: 20px;
      }

      &:hover {
        background: #ffdf71;
        border-color: #ffdf71;
      }
    }
  }

  // &__CompanyFullName {
  //   font-size: 12px;
  //   font-weight: 300;
  //   margin-top: 8px;
  //   color: #000;
  // }
}

.no-hover {
  &:hover{
    background: transparent !important;
  }
}

.CompanyCardWrapper {
  max-height: 420px;
  width: 320px;
  overflow-y: auto;
}

.CompanyMenu__DropdownItem__Link {
  padding: 0 20px !important;
  margin: 0 -20px;
}

.last {
  margin-top: 8px;
}

.CompanyMenu__DropdownItem__Link,
.CompanyMenu__DropdownItem__List {
  padding: {
    top: 5px;
    right: 30px;
    bottom: 5px;
    left: 20px;
  }
  transition: 0.5s;
  cursor: pointer;

  &:hover {
    border-left: 2px solid #fecd34;
    color: #fed75d;
  }

  &__Btn {
    width: 100%;
    text-align: left;
    font-family: "Montserrat", sans-serif;
    color: #606266 !important;
    font-weight: 400;
  }
}

.CompanyAvatarWrapper {
  cursor: pointer;
  margin-right: 30px;
}

.el-dropdown-menu {
  border-radius: 10px !important;
  min-width: 268px;
  max-width: 320px;
  max-height: 100% !important;
}

.CompanyMenu__DropdownItem {
  line-height: 16px;
  transition: 0.5s;
}

.CompanyMenu__DropdownItem__Link:not(.is-disabled):hover,
.CompanyMenu__DropdownItem__Link:focus,
.CompanyMenu__DropdownItem__List:not(.is-disabled):hover,
.CompanyMenu__DropdownItem__List:focus {
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

.sticky-top {
  position: sticky;
  top: 0;
  background: white;
  z-index: 999;
}

.sticky-bottom {
  position: sticky;
  bottom: 0px;
  background: white;
  margin-top: 15px;
}

.el-dropdown-menu__item--divided:before {
  height: 0;
}
</style>
