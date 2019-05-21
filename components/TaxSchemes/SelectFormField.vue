<template>
  <el-form-item :label="$t('forms.company.common.taxScheme')" :prop="labelProp">
    <el-select
      class="th-form-item-select"
      v-model="inner_value"
      :placeholder="$t('forms.company.common.taxScheme')"
      size="mini"
      @change="onChange">
      <el-option
        v-for="item in tax"
        :key="item.value"
        :label="item.title"
        :value="item.value">

        <div class="TaxSchemeSelectFormField__option">
          <span
            class="TaxSchemeSelectFormField__option-nds"
          >
            {{ item.nds }}
          </span>

          <span
            class="TaxSchemeSelectFormField__option-title"
            :style="nameStyle"
          >
            {{ item.title }}
          </span>
        </div>

        <!-- <el-row :offset="10">
          <el-col :span="16">
            <span>{{ item.title }}</span>
          </el-col>
          <el-col :span="4">
            <span style="color: #8492a6; font-size: 9px">{{ item.nds }}</span>
          </el-col>
        </el-row> -->
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
    noInit: Boolean,
    labelProp: String
  },

  data() {
    return {
      inner_value: this.value
    }
  },

  async mounted() {
    await this.$store.dispatch('taxSchemes/load')
    if (!this.noInit) {
      const list = this.$store.state.taxSchemes.list
      if (list.length > 0) {
        this.inner_value = list[0].guid
        this.onChange()
      }
    }
  },

  computed: {
    tax: function() {
      const tax = this.$store.state.taxSchemes.list
      const _tax = []
      for (const item of tax) {
        _tax.push({
          value: item.guid,
          title: this.$store.state.locale === 'ru' ? item.nameRu : item.nameUa,
          nds: item.nds === 1 ? this.$t('forms.common.hasPDV') : this.$t('forms.common.hasntPDV')
        })
      }
      return _tax
    },

    nameStyle() {
      const style = {
        width: (this.smallDeviceMixin_windowWidth - 154) + 'px'
      }

      const select = this.$refs.select
      if (select) {
        style['max-width'] = (select.$el.clientWidth - 110) + 'px'
      }
      return style
    }
  },

  methods: {
    onChange: function() {
      this.$emit('onSelect', this.inner_value)
    }
  }
}
</script>

<style lang="scss" scoped>
.th-form-item-select {
  width: 100%;
}

.TaxSchemeSelectFormField__option {
  display: flex;
  flex-direction: row;

  &-nds {
    min-width: 100px;
  }

  &-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }
}
</style>
