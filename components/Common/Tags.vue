<template>
  <div>
    <Tag
      class="Tags__tag"
      v-for="(tag, index) of tags"
      :key="index"
      :editable="editable"
      :value="tag.value"
      @close="handleCloseTag(tag.guid)"
    />
    <div v-if="editable" style="display: inline-block;">
      <el-input
        class="Tags__input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <Button 
        v-else
        round 
        class="Tags__button-new-tag" 
        @click="showInput">
        {{ $t('forms.common.addTag') }}
      </Button>
    </div>
  </div>
</template>

<script>
import Tag from '@/components/Common/Tag'
import Button from '@/components/Common/Buttons/Button'

export default {
  name: 'th-tags',

  components: {
    Tag,
    Button
  },

  props: {
    tags: Array,
    editable: Boolean
  },

  data: () => ({
    inputVisible: false,
    inputValue: ''
  }),

  methods: {
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.$emit('addNew', inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },

    handleCloseTag(guid) {
      this.$emit('closeTag', guid)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.Tags__tag {
  margin-right: 10px;
  margin-top: 5px;
}

.Tags__button-new-tag {
  height: 32px; //28px
  line-height: 30px; //26px
  padding: 0 15px;
  color: #606266;
  border: 1px solid darken(#F8F8F8, 10%);
  margin-top: 5px;

  &:hover {
    background: #F8F8F8;
  }
}

.Tags__input-new-tag {
  width: 90px;
}

.el-tag__close .el-icon-close {
  color: #606266 !important;

  &:hover {
    background-color: darken(#F8F8F8, 10%) !important;
    color: #fff !important;
  }
}
</style>
