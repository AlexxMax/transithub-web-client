<template>
  <Card>
    <div class="ManipulationCard">

      <div class="ManipulationCard__body">
        <div
          v-if="showDraggable"
          class="ManipulationCard__part ManipulationCard__drag"
        >
          <DraggableField/>
        </div>

        <div class="ManipulationCard__part">
          <slot/>
        </div>
      </div>

      <div class="ManipulationCard__actions">
        <Button
          v-if="showOpenButton"
          :class="{
            'ManipulationCard__actions--half-height': showRemoveButton || showSelectButton,
            'ManipulationCard__actions--full-height': !showRemoveButton && !showSelectButton
          }"
          fa-icon="search"
          icon-only
          type="text"
          @click="handleOpen"
        />

        <Button
          v-if="showRemoveButton"
          class="ManipulationCard__actions--half-height ManipulationCard__actions--delete"
          fa-icon="times"
          icon-only
          style="margin-left: 0px;"
          type="text"
          @click="handleRemove"
        />

        <Button
          v-if="showSelectButton"
          class="ManipulationCard__actions--half-height"
          fa-icon="check"
          icon-only
          style="margin-left: 0px;"
          type="text"
          @click="handleSelect"
        />
      </div>

    </div>
  </Card>
</template>

<script>
import Card from '@/components/Common/Card'
import DraggableField from '@/components/Common/DraggableField'
import Button from '@/components/Common/Buttons/Button'

export default {
  name: 'th-manipulation-card',

  components: {
    Card,
    DraggableField,
    Button
  },

  props: {
    showDraggable: Boolean,
    showOpenButton: Boolean,
    showRemoveButton: Boolean,
    showSelectButton: Boolean
  },

  data: () => ({ shake: false }),

  methods: {
    handleOpen() {
      this.$emit('open')
    },

    handleRemove() {
      this.$emit('remove')
    },

    handleSelect() {
      this.$emit('select')
    }
  }
}
</script>

<style lang='scss' scoped>
$border-color: #EBEEF5;

.ManipulationCard {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: -20px;
  height: 80px;

  &__body {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__part {
    margin-right: 5px;
  }

  &__drag {
    color: #AFB0B2;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    border-left: 1px solid $border-color;

    &--full-height {
      padding: 33px 15px;
    }

    &--half-height {
      padding: 13px 15px;
    }

    :not(:first-child) {
      border-top: 1px solid $border-color;
    }

    * {
      color: #606266;
    }

    &--delete {
      color: #F56C6C;
    }
  }
}
</style>
