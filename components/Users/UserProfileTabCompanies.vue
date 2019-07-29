<template>
  <div class="UserProfileTabCompanies">

    <span slot="label">
      {{ $t('forms.user.profile.tabCompanies') }}
    </span>

    <div class="th-user-profile-body-wrapper">
      <div class="th-user-profile-body">
        <div v-for="(company, index) of companies" :key="index">
          <el-row type="flex" justify="center">
            <el-col :xs="24" :sm="20" :md="16" :lg="16">
              <div class="th-user-profile-company-widget-wrapper">
                <div class="th-user-profile-company-widget">
                  <div class="th-user-profile-company-widget-header">
                    <th-company-avatar :name="company.name" />
                    <div class="th-user-profile-company-widget-header-titles">
                      <span class="th-user-profile-company-widget-header-main-title">
                        {{ company.workname }}
                        <fa v-if="getUserActive(company)" icon="check-circle" style="color: #67C23A" />
                      </span>
                      <span class="th-user-profile-company-widget-header-main-subtitle">{{ company.description || company.fullname }}</span>
                      <span class="th-user-profile-company-widget-header-subtitle">{{ getUserRoleName(company) }}</span>
                    </div>
                  </div>
                  <div class="th-user-profile-company-widget-btns">
                    <Button
                      style="width: 120px"
                      :type="getUserActive(company) === true ? 'info' : 'success'"
                      @click="onCompanyActivation(company, index)">
                      {{ getUserActive(company) === true ? $t('forms.user.profile.deactivateCompany') : $t('forms.user.profile.activateCompany')}}
                    </Button>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
