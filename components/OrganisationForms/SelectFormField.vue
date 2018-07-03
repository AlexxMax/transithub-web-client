<template>
  <el-form-item :label="$t('forms.company.common.organisationForm')">
    <el-select
      class="th-form-item-select"
      v-model="inner_value"
      :placeholder="$t('forms.company.common.organisationForm')"
      size="mini"
      @change="onChange">
      <el-option
        v-for="item in forms"
        :key="item.value"
        :label="item.title"
        :value="item.value">
        <el-row :offset="10">
          <el-col :span="16">
            <span>{{ item.name }}</span>
          </el-col>
          <el-col :span="4">
            <span>{{ item.abbr }}</span>
          </el-col>
          <el-col :span="4">
            <span style="color: #8492a6; font-size: 9px">{{ item.type }}</span>
          </el-col>
        </el-row>
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import { generateOrganisationFormSelectOption } from '@/utils/catalogsCommonMethods'

export default {
  props: {
    value: {
      type: String
    }
  },

  data() {
    return {
      inner_value: this.value
    }
  },

  async mounted() {
    await this.$store.dispatch('organisationForms/load')
    const forms = this.$store.state.organisationForms.list
    if (forms.length > 0) {
      this.inner_value = forms[0].guid
      this.onChange()
    }
  },

  computed: {
    forms: function() {
      const forms = this.$store.state.organisationForms.list
      const _forms = []
      for (const item of forms) {
        _forms.push(generateOrganisationFormSelectOption.apply(null, [
          this.$store.state.locale,
           ...(Object.keys(item).map(_ => item[_]))
        ]))
      }
      return _forms
    }
  },

  methods: {
    onChange: function() {
      this.$emit('onSelect', this.inner_value)
    }
  }
}
</script>

<style scoped>
.th-form-item-select {
  width: 100%
}
</style>
