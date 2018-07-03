<template>
  <div class="th-company-create-new-contacts-wrapper">
    <div class="th-company-create-new-contacts">
      <el-form style="clear: both" ref="form" :model="company" label-width="120px" size="mini" label-position="top">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-tooltip class="item" effect="dark" :content="$t('forms.common.phone')" placement="top" :open-delay="500">
              <el-form-item>
                <el-input v-model="company.phone" clearable size="small">
                  <template slot="prepend"><i class="fas fa-phone" /></template>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>
            </el-tooltip>
          </el-col>

          <el-col :span="12">
            <el-tooltip class="item" effect="dark" :content="$t('forms.common.email')" placement="top" :open-delay="500">
              <el-form-item>
                <el-input v-model="company.email" clearable size="small">
                  <template slot="prepend"><i class="fas fa-at" /></template>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>
            </el-tooltip>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-tooltip class="item" effect="dark" :content="$t('forms.common.webpage')" placement="top" :open-delay="500">
              <el-form-item>
                <el-input v-model="company.webpage" clearable size="small">
                  <template slot="prepend"><i class="fas fa-link" /></template>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>
            </el-tooltip>
          </el-col>

          <el-col :span="12">
            <el-tooltip class="item" effect="dark" :content="$t('forms.common.telegram')" placement="top" :open-delay="500">
              <el-form-item>
                <el-input v-model="company.telegram" clearable size="small">
                  <template slot="prepend"><i class="fab fa-telegram" /></template>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>
            </el-tooltip>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-tooltip class="item" effect="dark" :content="$t('forms.common.facebook')" placement="top" :open-delay="500">
              <el-form-item>
                <el-input v-model="company.facebook" clearable size="small">
                  <template slot="prepend">
                      <i class="fab fa-facebook" />
                  </template>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
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
