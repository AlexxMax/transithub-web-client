<template>
  <div class="th-company-create-new-requisites-wrapper">
    <div class="th-company-create-new-requisites">
      <el-form style="clear: both" ref="form" :model="company" label-width="120px" size="mini" label-position="top">
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="16" :lg="12">
            <el-form-item :label="$t('forms.company.common.info')">
              <el-input type="textarea" :rows="10" v-model="company.info" />
            </el-form-item>
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

</style>
