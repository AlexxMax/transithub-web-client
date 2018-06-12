<template>
  <el-form-item :label="$store.state.locale === 'ru' ? 'Схема налогообложения' : 'Схема оподаткування'">
    <el-select
      class="th-form-item-select"
      v-model="inner_value"
      :placeholder="placeholder"
      size="mini"
      @change="onChange">
      <el-option
        v-for="item in tax"
        :key="item.value"
        :label="item.title"
        :value="item.value">
        <el-row :offset="10">
          <el-col :span="16">
            <span>{{ item.title }}</span>
          </el-col>
          <el-col :span="4">
            <span style="color: #8492a6; font-size: 9px">{{ item.nds }}</span>
          </el-col>
        </el-row>
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import { generateTaxSchemeFormSelectOption } from '@/utils/catalogsCommonMethods'

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

  mounted() {
    this.$store.dispatch('taxSchemes/load')
  },

  computed: {
    placeholder: function() {
      return this.$store.state.locale === 'ru' ? this.nameRu : this.nameUa
    },

    tax: function() {
      const tax = this.$store.state.taxSchemes.list
      const _tax = []
      for (const item of tax) {
        _tax.push(generateTaxSchemeFormSelectOption.apply(null, [
          this.$store.state.locale,
           ...(Object.keys(item).map(_ => item[_]))
        ]))
      }
      return _tax
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
