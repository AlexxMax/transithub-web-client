<template>
  <div
    class="th-company-navmenu-item-wrapper"
    @click="$emit('click')"
    @mouseover="$emit('mouseover')"
    @mouseout="$emit('mouseout')">

    <div class="th-company-navmenu-item">
      <div class="th-company-navmenu-item-cred">
        <th-company-avatar :name="name" />
        <div class="th-company-navmenu-text">
          <span class="th-company-navmenu-text-title">{{ name }}</span>
          <span class="th-company-navmenu-text-subtitle">{{ description }}</span>
        </div>
      </div>
      <div class="th-company-navmenu-addons">
        <slot name="addon" />
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Companies/CompanyAvatar'

export default {
  components: {
    "th-company-avatar": Avatar
  },

  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.th-company-navmenu-item-wrapper {
  margin-bottom: 10px;
  padding: 10px 0px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8
  }

  .th-company-navmenu-item {
    margin: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .th-company-navmenu-item-cred {
      display: flex;
      flex-direction: row;

      .th-company-navmenu-text {
        display: flex;
        flex-direction: column;
        padding-left: 10px;

        .th-company-navmenu-text-title {
          font-size: 14px;
          font-weight: 500;
        }

        .th-company-navmenu-text-subtitle {
          margin-top: 4px;
          font-size: 12px;
          font-weight: 400;
        }
      }
    }

    .th-company-navmenu-addons {
      font-size: 13px;
      font-weight: 500;
      margin-left: 30px;
      display: flex;
      width: 100px;
      flex-direction: column;
      justify-content: center;
      text-align: right;
      color: #909399;
    }
  }
}
</style>
