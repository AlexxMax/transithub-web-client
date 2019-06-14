<template>
  <el-dialog title="OF" :visible="dialogVisible" @close="closeDialog" width="70%">
    <el-form :model="organisationForm" label-width="100px" label-position="top" size="mini">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Назва (укр.)">
            <el-input v-model="organisationForm.nameUa"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    organisationForm: {
      type: Object,
      required: true
    },

    dialogVisible: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    closeDialog: function() {
      this.$emit('closeDialog')
    }
  }
}
</script>
