<template>
<FormSideNav :title="$t('forms.common.pqWarehouses')">
  <div class="PQWarehousesFormSidebar">

    <div class="PQWarehousesFormSidebar__item">
      <fa
        class="PQWarehousesFormSidebar__icon"
        icon="parking"
      />

      <span class="PQWarehousesFormSidebar__name">{{ warehouse.name }}</span>
    </div>

    <OrganisationWidget
      style="margin-top: 40px"
      :name="warehouse.organisationName"
    />

  </div>
</FormSideNav>
</template>

<script>
import FormSideNav from '@/components/Common/FormElements/FormSideNav'
import OrganisationWidget from '@/components/Organisations/OrganisationWidget'

export default {
  components: {
    FormSideNav,
    OrganisationWidget
  },

  props: {
    warehouse: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.PQWarehousesFormSidebar {

    &__item {
        margin-bottom: 1rem;

        display: flex;
        align-items: center;
        justify-content: flex-start;

        line-height: 1;
    }

    &__icon {
        height: 1rem;
        width: 1rem;

        margin-right: .5rem;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 1rem;
        color: $--color-info;
    }
}
</style>
