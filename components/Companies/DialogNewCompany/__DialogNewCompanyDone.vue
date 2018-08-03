<template>
  <div class="th-company-create-new-done-wrapper">
    <div class="th-company-create-new-done">
      <span><th-done-img class="icon" /></span>
      <span>{{ $t('forms.company.newCompanyDialog.readyTitle') }}</span>
    </div>
  </div>
</template>

<script>
import SuccessOperation from '@/assets/images/success-operation.svg'

export default {
  components: {
    'th-done-img': SuccessOperation
  }
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
      margin-bottom: 20px;

      .icon {
        width: 60px;
        height: 60px;
      }
    }

    span:last-child {
      margin: 10px 0 20px;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
