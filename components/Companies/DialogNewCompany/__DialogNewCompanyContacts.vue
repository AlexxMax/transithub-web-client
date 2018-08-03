<template>
  <div class="th-company-create-new-contacts-wrapper">
    <div class="th-company-create-new-contacts">
      <el-form style="clear: both" ref="form" :model="company" label-width="120px" size="mini" label-position="top">
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="12" :lg="8">
            <el-tooltip class="item" effect="dark" :content="$t('forms.common.phone')" placement="top" :open-delay="500">
              <el-form-item
                prop="phone">
                <el-input
                  v-model="company.phone"
                  :placeholder="$t('forms.company.profile.phone')"
                  :maxlength="50"
                  type="text"
                  clearable>
                  <fa class="input-internal-icon" icon="phone" slot="prefix" />
                </el-input>
              </el-form-item>
            </el-tooltip>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="12" :lg="8">
            <el-tooltip class="item" effect="dark" :content="$t('forms.common.email')" placement="top" :open-delay="500">
              <el-form-item
                prop="email">
                <el-input
                  v-model="company.email"
                  :placeholder="$t('forms.company.profile.email')"
                  :maxlength="50"
                  type="text"
                  clearable>
                  <fa class="input-internal-icon" icon="envelope" slot="prefix" />
                </el-input>
              </el-form-item>
            </el-tooltip>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="12" :lg="8">
            <el-tooltip class="item" effect="dark" :content="$t('forms.common.webpage')" placement="top" :open-delay="500">
              <el-form-item>
                <el-input
                  v-model="company.webpage"
                  :placeholder="$t('forms.company.profile.webpage')"
                  :maxlength="50"
                  type="text"
                  clearable>
                  <fa class="input-internal-icon" icon="globe" slot="prefix" />
                </el-input>
              </el-form-item>
            </el-tooltip>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="12" :lg="8">
            <el-tooltip class="item" effect="dark" :content="$t('forms.common.facebook')" placement="top" :open-delay="500">
              <el-form-item>
                <el-input
                  v-model="company.facebook"
                  :placeholder="$t('forms.company.profile.facebook')"
                  :maxlength="50"
                  type="text"
                  clearable>
                  <fa class="input-internal-icon" :icon="['fab', 'facebook-square']" slot="prefix" />
                </el-input>
              </el-form-item>
            </el-tooltip>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="12" :lg="8">
            <el-tooltip class="item" effect="dark" :content="$t('forms.common.telegram')" placement="top" :open-delay="500">
              <el-form-item>
                <el-input
                  v-model="company.telegram"
                  :placeholder="$t('forms.company.profile.telegram')"
                  :maxlength="50"
                  type="text"
                  clearable>
                  <fa class="input-internal-icon" :icon="['fab', 'telegram-plane']" slot="prefix" />
                </el-input>
              </el-form-item>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    company: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.th-company-create-new-contacts-wrapper {

  .th-company-create-new-contacts {
    // display: flex;
    // flex-direction: row;
  }
}
</style>
