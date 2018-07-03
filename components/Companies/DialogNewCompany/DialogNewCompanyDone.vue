<template>
  <div class="th-company-create-new-done-wrapper">
    <div class="th-company-create-new-done">
      <span><i class="fas fa-check"></i></span>
      <span>{{ $t('forms.company.newCompanyDialog.readyTitle') }}</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.th-company-create-new-done-wrapper {

  .th-company-create-new-done {
    text-align: center;
    display: flex;
    flex-direction: column;

    span:first-child {
      margin: auto;
      font-size: 150px;
    }

    span:last-child {
      margin: 10px 0 20px;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
