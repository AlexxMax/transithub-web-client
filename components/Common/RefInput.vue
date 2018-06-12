<template>
  <div>
    <!-- INPUT -->
    <el-form-item :label="label">
      <el-input v-model="title" :placeholder="placeholder" :readonly="true">
        <i class="el-icon-more el-input__icon" slot="prefix" @click="onSelect"></i>
        <i class="el-icon-search el-input__icon" slot="suffix" @click="onOpen"></i>
      </el-input>
    </el-form-item>

    <!-- ELEMENT FORM -->
    <slot name="dialogEdit"/>

    <!-- LIST FORM -->
    <slot name="dialogList" />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    placeholder: {
      type: String
    }
  },

  methods: {
    onSelect: function() {
      this.$emit('onSelect')
    },

    onOpen: function() {
      this.$emit('onOpen')
    }
  }
}
</script>

<style>

</style>
