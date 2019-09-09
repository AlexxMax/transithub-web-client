<template>
  <FastCommands>
    <Button
      type="primary"
      label="Load More"
    />
  </FastCommands>
</template>

<script>
import FastCommands from '@/components/Common/Lists/ListFastCommands'
import Button from '@/components/Common/Buttons/RoundButton'

export default {
  name: 'th-pq-warehouses-catalog-list-fast-commands',

  components: { FastCommands, Button },
}
</script>
