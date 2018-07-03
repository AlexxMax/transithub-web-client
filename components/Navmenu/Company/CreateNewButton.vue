<template>
  <div class="th-company-create-new-wrapper" @click="$emit('click')">
    <div class="th-company-create-new">
      <i class="fas fa-plus th-company-create-new-icon"></i>
      <span class="th-company-create-new-title">{{ $t('links.navmenu.company.createNewCompany') }}</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.th-company-create-new-wrapper {
  margin-bottom: 10px;
  padding: 10px 0px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8
  }

  .th-company-create-new {
    margin: 0 10px;
    display: flex;
    flex-direction: row;

    .th-company-create-new-icon {
      font-size: 25px;
      width: 40px;
    }

    .th-company-create-new-title {
      margin-left: 10px;
      line-height: 25px;
      font-size: 14px;
      font-weight: 500;
    }
  }
}
</style>
