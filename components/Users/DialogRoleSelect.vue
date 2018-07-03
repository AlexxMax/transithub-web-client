<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :width="width"
    @close="$emit('close')"
    append-to-body>

    <el-table
      :data="roles"
      border
      height="400px"
      @row-click="onClickRow">
      <el-table-column
        prop="name"
        label="Роль"
        fixed />
    </el-table>

  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: '50%'
    }
  },

  async mounted() {
    await this.$store.dispatch('usersRoles/load')
  },

  methods: {
    onClickRow: function(row) {
      this.$emit('onSelect', row)
    }
  },

  computed: {
    roles: function() {
      const roles = this.$store.state.usersRoles.list
      const _roles = []
      for (const { nameUa, nameRu, guid } of roles) {
        _roles.push({
          name: this.$store.locale === 'ru' ? nameRu : nameUa,
          nameUa,
          nameRu,
          guid
        })
      }
      return _roles
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

