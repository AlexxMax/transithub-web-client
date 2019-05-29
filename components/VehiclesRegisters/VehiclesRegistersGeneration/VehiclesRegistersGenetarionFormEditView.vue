<template>
  <div>
    <div class="VehiclesRegistersGenerationFormEditView--request-info">
      <el-row :gutter="20">
        <el-col :xs="24" :md="5">
          <FormField
            :title="$t('forms.common.pointFrom')"
            :value="`${request.pointFromName}, ${request.pointFromRegion}`"
          />
        </el-col>

        <el-col :xs="24" :md="5">
          <FormField
            :title="$t('forms.common.pointTo')"
            :value="`${request.pointToName}, ${request.pointToRegion}`"
          />
        </el-col>

        <el-col :xs="24" :md="3">
          <FormField
            :title="$t('forms.common.goods')"
            :value="request.goodsName"
          />
        </el-col>

        <el-col :xs="24" :md="2">
          <FormField
            :title="$t('forms.request.quantityT')"
            :value="request.quantityT"
          />
        </el-col>
      </el-row>
    </div>


  </div>
</template>

<script>
import FormField from '@/components/Common/FormElements/FormField'

export default {
  name: 'th-vehicles-registers-generation-form-edit-view',

  components: { FormField },

  props: {
    request: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped>
.VehiclesRegistersGenerationFormEditView {
  &--request-info {
    margin: {
      bottom: 30px;
    }
  }
}
</style>
