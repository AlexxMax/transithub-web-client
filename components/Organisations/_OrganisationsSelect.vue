<template>
  <el-select
    :loading="organisationsLoading"
    v-model="value"
    value-key="value"
    style="width: 100%;"
    @change="$emit('change', value)"
  >
    <el-option
      class="OrganisationSelect_option"
      v-for="organisation in organisations"
      :key="organisation.value"
      :label="organisation.label"
      :value="organisation.value"
    >
      <Organisation :name="organisation.label"/>
    </el-option>
  </el-select>
</template>

<script>
import Organisation from '@/components/Organisations/OrganisationWidget'

import {
  STORE_MODULE_NAME as ORGANISATIONS_STORE_MODULE_NAME,
  ACTIONS_KEYS as ORGANISATIONS_ACTIONS_KEYS
} from '@/utils/organisations'

export default {
  name: 'th-select-organisation',

  components: {
    Organisation
  },

  props: {
    noDefaultValue: {
      type: Boolean,
      default: false
    },

    default: {
      type: [String, Object],
      default: null
    }
  },

  data: () => ({
    value: null
  }),

  watch: {
    default: {
      immediate: true,
      handler(value) {

        if (value) this.value = value

      }
    }
  },

  computed: {
    organisations() {
      const list =  this.$store.state[ORGANISATIONS_STORE_MODULE_NAME].list.map(organisation => ({
        label: organisation.name,
        value: organisation.guid
      }))
      return list
    },
    organisationsLoading() {
      return this.$store.state[ORGANISATIONS_STORE_MODULE_NAME].loading
    }
  },

  methods: {
    async fetchOrganisations() {
      await this.$store.dispatch(
        `${ORGANISATIONS_STORE_MODULE_NAME}/${ORGANISATIONS_ACTIONS_KEYS.FETCH_LIST}`,
        this.$store.state.companies.currentCompany.guid
      )
    }
  },

  async created() {
    if (!this.organisations.length)
      await this.fetchOrganisations()

    if (!this.noDefaultValue)
      this.value = this.organisations[0]
  },
}
</script>

<style lang="scss" scoped>
.OrganisationSelect_option {
  height: 55px;
  padding: {
    top: 5px;
    bottom: 5px;
  }
}
</style>
