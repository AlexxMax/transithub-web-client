<template>
  <ItemCard>
    <OrganisationAvatar :name="name"/>
    <div class="OrganisationsListItem">
      <div class="OrganisationsListItem__col">
        <span class="OrganisationsListItem__name">{{name}}</span>
        <span class="OrganisationsListItem__form">{{fullname}}</span>
        <span
          class="OrganisationsListItem__code"
        >{{ $t('forms.company.common.edrpou') }}: {{edrpou}}</span>
      </div>
    </div>
    <div class="DriversListItem__footer" slot="footer-left">
      <nuxt-link :to="$i18n.path(`workspace/organisations/${guid}`)">
        <Button
          round
          type="primary"
          size="small"
          @click="organisationDialog=true"
        >{{ $t('lists.open') }}</Button>
      </nuxt-link>
    </div>
  </ItemCard>
</template>

<script>
import OrganisationAvatar from "@/components/Organisations/OrganisationAvatar";
import ItemCard from "@/components/Common/Lists/ItemCard";
import Button from "@/components/Common/Buttons/Button";
export default {
  name: "th-organisations-list-item",
  components: {
    OrganisationAvatar,
    ItemCard,
    Button
  },
  props: {
    name: {
      type: String,
      required: true
    },
    fullname: {
      type: String,
      required: true
    },
    edrpou: {
      type: Number,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.OrganisationsListItem {
  display: flex;
  flex-direction: row;
  &__col {
    display: flex;
    flex-direction: column;
    margin-left: 67px;
    margin-top: -60px;
    font-weight: 500;
  }
  &__name {
    font-size: 16px;
    font-weight: 600;
  }
  &__form {
    margin-top: 5px;
    color: rgb(165, 163, 163);
  }
  &__code {
    margin-top: 8px;
    color: rgb(165, 163, 163);
  }
}
</style>
