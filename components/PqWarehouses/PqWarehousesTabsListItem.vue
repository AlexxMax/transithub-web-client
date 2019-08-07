<template>
<ItemCard noFooter>

  <div class="PqWarehousesTabsListItem">

    <div class="PqWarehousesTabsListItem__">

        <div class="PqWarehousesTabsListItem__">
          <fa class="PqWarehousesTabsListItem__icon" icon="warehouse" />
          <fa class="PqWarehousesTabsListItem__icon" icon="map-marker-alt" />
          <span></span>
        </div>

        <div class="PqWarehousesTabsListItem__footer">

        </div>

    </div>

    <div class="PqWarehousesTabsListItem__company">

    </div>

  </div>

</ItemCard>
</template>

<script>
import ItemCard from '@/components/Common/Lists/ItemCard'

export default {
  components: {
    ItemCard
  },

  data: () => ({

    blocks: [
      { icon: 'warehouse', text: 'Назва складу' },
      { icon: 'warehouse', text: 'Україна, Хмельницька обл., Летичивський район, с. Грушківці, вулиця 11' },
    ]

  })
}
</script>

<style lang="scss" scoped>
</style>
