<template>
  <div>
    <nuxt-link :to="$i18n.path('orders')">{{ $t('links.documents.orders') }}</nuxt-link>
    <nuxt-link :to="$i18n.path('goods')">{{ $t('links.catalogs.goods') }}</nuxt-link>
  </div>
</template>

<script>
export default {}
</script>
