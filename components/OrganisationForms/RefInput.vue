<template>
  <th-ref-input
    label="Форма організації"
    :title="title"
    placeholder="Форма організації"
    @onSelect="onSelectOpen"
    no-edit>

  </th-ref-input>
</template>

<script>
import RefInput from '@/components/Common/RefInput'

export default {
  components: {
    "th-ref-input": RefInput
  },

  props: {
    organisationForm: {
      type: Object,
      required: true
    },
  },

  data() {
    return {
      dialogSelectVisible: false
    }
  },

  computed: {
    title: function() {
      return this.organisationForm.nameUa + ' (' + this.organisationForm.abbrUa + ')'
    }
  },

  methods: {
    onSelectOpen: function() {
      this.dialogSelectVisible = true
    },

    onSelectClose: function() {
      this.dialogSelectVisible = false
      this.$emit('onSelect')
    }
  }
}
</script>
