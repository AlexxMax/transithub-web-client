<template>
<el-select
    class="th-form-item-select"
    v-model="inner_value"
    :placeholder="placeholder"
    size="mini"
    @change="onChange"
  >
    <el-option
      v-for="item in roles"
      :key="item.guid"
      :label="item.name"
      :value="item.guid"
    >
      <el-row :offset="10">
        <el-col :span="24">
          <span>{{ item.name }}</span>
        </el-col>
      </el-row>
    </el-option>
  </el-select>
</template>

<script>
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
    this.$store.dispatch('usersRoles/load')
  },

  computed: {
    placeholder: function() {
      const role = this.$store.getters['usersRoles/getRoleByGuid'](this.inner_value) || {}
      return this.$store.state.locale === 'ru' ? role.nameRu : role.nameUa
    },

    roles: function() {
      const roles = this.$store.state.usersRoles.list
      const _roles = []
      for (const { nameUa, nameRu, guid } of roles) {
        _roles.push({
          name: this.$store.locale === 'ru' ? nameRu : nameUa,
          guid
        })
      }
      return _roles
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
