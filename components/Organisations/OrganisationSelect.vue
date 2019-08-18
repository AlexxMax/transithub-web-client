<template>
  <div>
    <el-select
      v-model="value"
      value-key="value"
      style="width: 100%;"
      v-loading="organisationsLoading"
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
  </div>
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
    initValue: String,
    organisation: String
  },

  data: () => ({
    value: null
  }),

  computed: {
    organisations() {
      const list =  this.$store.state[ORGANISATIONS_STORE_MODULE_NAME].list.map(organisation => ({
        label: organisation.name,
        value: organisation.guid
      }))
      return list || []
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
    },

    getValue() {
      return this.value
    }
  },

  watch: {
    initValue(value) {
      this.value = this.initValue
    },

    organisation(value) {
      this.value = this.organisation
    },

    value(value) {
      this.$emit('update:organisation', value)
    }
  },

  async mounted() {
    await this.fetchOrganisations()
    if (this.initValue) {
      this.value = this.initValue
    } else if (this.organisations.length > 0) {
      this.value = this.organisations[0].value
      this.$emit('mounted-change', this.value)
    }
  }
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
