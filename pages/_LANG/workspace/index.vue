<template>
  <div>
    <!-- <nuxt-link :to="$i18n.path('workspace/orders')">{{ $t('links.documents.orders') }}</nuxt-link>
    <nuxt-link :to="$i18n.path('workspace/goods')">{{ $t('links.catalogs.goods') }}</nuxt-link> -->

    <th-list></th-list>
  </div>
</template>

<script>
import FormList from "@/components/Orders/FormList";

export default {
  components: {
    "th-list": FormList
  }
};
</script>
