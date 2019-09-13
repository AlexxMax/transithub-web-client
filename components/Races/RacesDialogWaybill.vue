<template>
<el-dialog
  v-if="waybill"
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
        v-for="(field, index) in data"
        :key="index"
        :title="field.title"
        :value="field.value"
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
  },

  computed: {
    data() {
      return [{
          title: this.$t('forms.race.waybillDate'),
          value: this.waybill.waybillDateUtc.split(' ')[0]
        },
        {
          title: this.$t('forms.race.waybillNetWeigthSender'),
          value: this.waybill.waybillNettoIn
        },
        {
          title: this.$t('forms.race.waybillNumber'),
          value: this.waybill.waybillNumber
        },
        {
          title: this.$t('forms.race.waybillNetWeigthRecipient'),
          value: this.waybill.waybillNettoOut
        },
      ]
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

        @include for-extra-small {
          flex-direction: column;
        }
    }

    &__field {
        width: 50%;

        @include for-extra-small {
          width: 100%;
        }
    }
}
</style>
