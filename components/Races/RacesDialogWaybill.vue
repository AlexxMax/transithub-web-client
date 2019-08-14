<template>
<el-dialog
  append-to-body
  class="RacesDialogWaybill"
  :title="$t('forms.race.waybill')"
  custom-class="RacesDialogWaybill__dialog"
  :z-index="4000"
  :visible.sync="visible"
  :before-close="() => $emit('update:visible', false)"
>
  <div class="RacesDialogWaybill__content">
    <!-- {{ waybill }} -->

    <div class="RacesDialogWaybill__fields">
      <FormField
        class="RacesDialogWaybill__field"
        :title="$t('forms.race.waybillDate')"
        value="21.06.2019"
      />

      <FormField
        class="RacesDialogWaybill__field"
        :title="$t('forms.race.waybillNetWeigthSender')"
        value="200"
      />

      <FormField
        class="RacesDialogWaybill__field"
        :title="$t('forms.race.waybillNumber')"
        value="348332НН"
      />

      <FormField
        class="RacesDialogWaybill__field"
        :title="$t('forms.race.waybillNetWeigthRecipient')"
        value="200"
      />
    </div>

  </div>
</el-dialog>
</template>

<script>
import FormField from '@/components/Common/FormElements/FormField'

export default {
  components: {
    FormField
  },

  props: {
    visible: {
      type: Boolean,
      required: true
    },

    waybill: {
      type: Object,
      default: () => null
    }
  }
}
</script>

<style lang="scss">
.RacesDialogWaybill {

  &__dialog {
    width: fit-content !important;
  }

  &__fields {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__field {
    flex-grow: 1;
    width: 50%;
  }
}
</style>
