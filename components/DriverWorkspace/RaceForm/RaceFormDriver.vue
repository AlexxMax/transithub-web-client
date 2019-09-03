<template>
<div class="RaceFormDriver">

  <div
    class="RaceFormDriver__block"
    v-for="(item, i) in driver"
    :key="i"
  >

    <span class="RaceFormDriver__label">{{ item.label }}</span>

    <div
      class="RaceFormDriver__children"
      v-if="item.children"
    >
      <div
        class="RaceFormDriver__block-item"
        v-for="(child, j) in item.children"
        :key="j"
      >
        <span class="RaceFormDriver__label">{{ child.label }}</span>
        <span class="RaceFormDriver__value">{{ child.value }}</span>
      </div>
    </div>

    <span
      class="RaceFormDriver__value"
      v-else
    >{{ item.value }}</span>

  </div>

</div>
</template>

<script>
export default {
  computed: {
    driver() {
      const { certSerialNumber, passIssued, passDate, passNumber, passSerial, personDocsType } = this.$store.state.driver

      const result = [{
        label: this.$t('forms.common.certSerialNumber'),
        value: certSerialNumber || '–',
      }]

      const driverDocument = personDocsType === 'passport' ? this.$t('forms.driverWorkspace.newRace.driverPassport') : this.$t('forms.driverWorkspace.newRace.driverIdCard')

      if (personDocsType === 'passport')
        result.push({
          label: driverDocument,
          children: [{
            label: this.$t('forms.driverWorkspace.newRace.driverSeries'),
            value: passSerial || '–'
          }, {
            label: this.$t('forms.driverWorkspace.newRace.driverNumber'),
            value: passNumber || '–'
          }]
        })
      else result.push({
        label: driverDocument,
        value: passNumber || '–'
      })

      result.push({
        label: this.$t('forms.driverWorkspace.newRace.driverDate'),
        value: passDate || '–'
      })

      return result

    }
  }
}
</script>

<style lang="scss" scoped>
.RaceFormDriver {
    display: flex;
    flex-direction: column;

    &__block {
        &:not(:last-child) {
            margin-bottom: 1.5rem;
        }

        display: flex;
        flex-direction: column;
    }

    &__children {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    &__block-item {

        &:not(:last-child) {
            margin-right: 3rem;
        }

        display: flex;
        flex-direction: column;
    }

    &__label {
        margin-bottom: 0.5rem;

        display: flex;

        font-weight: 600;
    }
}
</style>
