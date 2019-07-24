<template>
  <el-button
    :class="{
      'Button__simple': simple,
      'Button__hover-underline': hoverUnderline,
      'Button__edit': edit,
      'Button__flat': flat,
      'Button__external-resorse': externalResorse,
      'Button__danger': danger
    }"
    :size="size"
    :type="type"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled || isTimer"
    :icon="icon"
    :autofocus="autofocus"
    :native-type="nativeType"
    :plain="plain"
    @click="$emit('click')"
  >
      <fa v-if=faIcon :icon="faIcon" :class="{ 'Button__icon-fa': true, 'Button__icon-fa-only': iconOnly }"/>

      <slot />
      <span v-if="isTimer">({{ timerTime }})</span>

      <fa v-if=faIconSuffix :icon="faIconSuffix" class="Button__icon-fa-suffix"/>
  </el-button>
</template>

<script>
export default {
  name: 'th-button',

  data: () => ({
    timerTime: 30,
    isTimer: false
  }),

  props: {
    type: {
      type: String,
      default: 'text'
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    plain: Boolean,
    simple: Boolean, // color: inherit
    faIcon: [ String, Array ],
    faIconSuffix: String,
    hoverUnderline: Boolean,
    edit: Boolean,
    flat: Boolean,
    iconOnly: Boolean,
    externalResorse: Boolean,
    size: {
      type: String,
      default: 'small'
    },
    danger: Boolean,

    timer: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    timer(value) {
      if (value) this.startTimer()
      else this.isTimer = false
    }
  },

  methods: {
    startTimer(timerTime = 30) {
      this.timerTime = timerTime
      this.isTimer = true

      setInterval(() => {

        if (this.timerTime) this.timerTime--
        else {
          this.isTimer = false
          this.$emit('update:timer', false)
          return
        }

      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
$edit-bg-color: #B15ECF;
$external-resorse-bg-color: #27A5E7;
$danger-color: #F56C6C;

.Button__simple {
  color: inherit;
}

.Button__icon-fa {
  margin-right: 5px;
  width: 14px;

  &.Button__icon-fa-only {
    margin-right: 0;
  }
}

.Button__icon-fa-suffix {
  margin-left: 5px;
  width: 15px;
}

.Button__hover-underline:hover {
  text-decoration: underline;
}

.Button__edit {
  border-color: $edit-bg-color;
  background-color: $edit-bg-color;
  color: white;

  &:hover {
    color: white;
    border-color: lighten($edit-bg-color, 10%);
    background-color: lighten($edit-bg-color, 10%);
  }
}

.Button__external-resorse {
  color: #fff;
  border-color: $external-resorse-bg-color;
  background-color: $external-resorse-bg-color;
  white-space: nowrap;
  vertical-align: middle;
  transition: all .3s ease-in-out;

  &:hover {
    color: white;
    border-color: lighten($external-resorse-bg-color, 10%);
    background-color: lighten($external-resorse-bg-color, 10%);
  }

  .svg-inline--fa {
    border-right: 1px solid rgba(255,255,255,0.35);
    margin-right: 5px;
    padding-right: 10px;
  }
}

.Button__flat {
  width: 100%;
  border: none;
  text-align: left;
  border-radius: 5px;
  margin: 10px 0;
  padding: 10px;
  font-size: 13px;
  font-weight: 400;
}

.Button__danger {
  color: $danger-color;

  &:hover {
    color :lighten( $danger-color, 10% );
  }
}
</style>
