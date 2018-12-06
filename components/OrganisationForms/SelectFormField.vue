<template>
  <el-form-item :label="$t('forms.company.common.organisationForm')" :prop="labelProp">
    <el-select
      ref="select"
      class="OrganisationFormSelectFormField"
      v-model="inner_value"
      :placeholder="$t('forms.company.common.organisationForm')"
      size="mini"
      filterable
      :loading="loading"
      :loading-text="$t('forms.common.loading')"
      @change="onChange">
      <el-option
        v-for="item in forms"
        :key="item.value"
        :label="item.title"
        :value="item.value">

        <!-- <el-row>
          <el-col :span="4">{{ item.abbr }}</el-col>
          <el-col :span="20">{{ item.name }}</el-col>
        </el-row> -->

        <div class="OrganisationFormSelectFormField__option">
          <span
            class="OrganisationFormSelectFormField__option-abbr"
          >
            {{ item.abbr }}
          </span>

          <span
            class="OrganisationFormSelectFormField__option-name"
            :style="nameStyle"
          >
            {{ item.name }}
          </span>
        </div>

      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import { generateOrganisationFormSelectOption } from '@/utils/catalogsCommonMethods'
import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

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
    await this.$store.dispatch('organisationForms/load')
    if (!this.noInit) {
      const forms = this.$store.state.organisationForms.list
      if (forms.length > 0) {
        this.inner_value = forms[0].guid
        this.onChange()
      }
    }
  },

  computed: {
    nameStyle() {
      const style = {
        width: (this.smallDeviceMixin_windowWidth - 154) + 'px'
      }

      const select = this.$refs.select
      if (select) {
        style['max-width'] = (select.$el.clientWidth - 110) + 'px'
      }
      return style
    },
    loading() {
      return this.$store.state.organisationForms.loading
    },
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
    },
    reset() {
      this.inner_value = null
    }
  }
}
</script>

<style lang="scss" scoped>
.OrganisationFormSelectFormField {
  width: 100%;
}

.OrganisationFormSelectFormField__option {
  display: flex;
  flex-direction: row;

  &-abbr {
    min-width: 70px;
  }

  &-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }
}
</style>

