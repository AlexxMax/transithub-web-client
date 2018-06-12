<template>
  <th-ref-input
    label="Форма організації"
    :title="title"
    placeholder="Форма організації"
    @onSelect="onSelectOpen"
    @onOpen="onEditOpen">

    <template slot="dialogEdit">
      <th-organisation-form-dialog-element
        :dialogVisible="dialogEditVisible"
        :organisationForm="organisationForm"
        @closeDialog="onEditClose" />
    </template>

  </th-ref-input>
</template>

<script>
import RefInput from '@/components/Common/RefInput'
import OrganisationFormDialogElement from '@/components/OrganisationForms/DialogElement'

export default {
  components: {
    "th-ref-input": RefInput,
    "th-organisation-form-dialog-element": OrganisationFormDialogElement
  },

  props: {
    organisationForm: {
      type: Object,
      required: true
    },
  },

  data() {
    return {
      dialogEditVisible: false
    }
  },

  computed: {
    title: function() {
      return this.organisationForm.nameUa + ' (' + this.organisationForm.abbrUa + ')'
    }
  },

  methods: {
    onSelectOpen: function() {

    },

    onSelectClose: function() {
      this.$emit('onSelect')
    },

    onEditOpen: function() {
      this.dialogEditVisible = true

    },

    onEditClose: function() {
      this.dialogEditVisible = false
      this.$emit('onEdit')
    }
  }
}
</script>

<style>

</style>
