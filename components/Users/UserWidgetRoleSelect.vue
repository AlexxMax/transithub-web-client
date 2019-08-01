<template>
<el-dropdown
  @command="value => $emit('onSelect', value)"
  trigger="click"
>

  <el-button
    round
    size="mini"
    type=""
  >
    {{ $t('forms.user.dialog.changeRole') }}
    <i class="el-icon-arrow-down el-icon--right" />
  </el-button>

  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item
      v-for="(role, index) in accessibleRoles"
      :key="index"
      :command="role"
    >{{ $t(`roles.${role}`) }}</el-dropdown-item>
  </el-dropdown-menu>

</el-dropdown>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    accessibleRoles: {
      type: Array,
      required: true
    }
  },

  methods: {
    beforeEmit(value) {
      console.log(value);
      // value => $emit('onSelect', value)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
