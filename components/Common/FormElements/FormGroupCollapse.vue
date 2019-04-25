<template>
  <div :class="{ 'FormGroupCollapse': true, 'FormGroupCollapse__toggled': showBody }">
    <span v-if="title" class="FormGroupCollapse__title" @click="showBody = !showBody">
      <fa
        class="FormGroupCollapse__title-icon"
        :icon="showBody ? 'caret-down': 'caret-right'"/>
      {{ title }}
    </span>
    <Collapse>
      <div class="FormGroupCollapse__body" v-show="showBody">
        <slot/>
      </div>
    </Collapse>
  </div>
</template>

<script>
import Collapse from '@/components/Common/Transitions/Collapse'

export default {
  name: 'th-form-group-collapse',

  components: {
    Collapse
  },

  props: {
    title: String
  },

  data() {
    return {
      showBody: false
    }
  }
}
</script>

<style lang="scss" scoped>
.FormGroupCollapse {
  margin: -10px -10px 30px;
  padding: 10px 10px 0;

  .FormGroupCollapse__title {
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    color: #FFD74D;

    &:hover {
      text-decoration: underline;
    }

    .FormGroupCollapse__title-icon {
      width: 15px;
    }
  }

  .FormGroupCollapse__body {
    margin-top: 10px;
  }
}

.FormGroupCollapse__toggled {
  background-color: #f8f8f8;
  border-radius: 5px;
}
</style>
