<template>
  <Wrapper>
    <Tooltip
      :content="tooltip"
      placement="right">

      <div class="CompanyListButton__wrapper" :style="{ 'width': collapse ? '175px' : '40px' }">
        <div class="CompanyListButton" @click="$emit('click')">
          <fa class="CompanyListButton__icon" :icon="icon"/>
        </div>
      </div>

    </Tooltip>
  </Wrapper>
</template>

<script>
import Wrapper from '@/components/Navmenu/CompaniesListElements/Wrapper'
import Tooltip from '@/components/Common/Tooltip'

export default {
  name: 'th-company-list-button',

  components: {
    Wrapper,
    Tooltip
  },

  props: {
    icon: {
      type: String,
      reqired: true
    },
    tooltip: {
      type: String,
      required: true
    }
  },

  computed: {
    collapse() {
      return !this.$store.state.userSettings.navmenu.collapse
    }
  }
}
</script>

<style lang="scss" scoped>
.CompanyListButton__wrapper {
  margin-top: 10px;
  width: inherit;
  height: inherit;
  border-radius: inherit;

  .CompanyListButton {
    margin: 3px;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    background-color: #f8f8f8;

    &:hover {
      background-color: #FECD34;
      color: white;
    }

    .CompanyListButton__icon {
      position: relative;
      float: left;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
