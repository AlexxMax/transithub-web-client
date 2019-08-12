<template>
<el-menu
  class="PQWarehousesGuidSidebar"
  :collapse="false"
>

  <nuxt-link
    teg="div"
    :to="$i18n.path('workspace/pq-warehouses')"
    class="PQWarehousesGuidSidebar__item"
  >
    <div class="PQWarehousesGuidSidebar__icon">
      <fa icon="arrow-left" />
    </div>

    <span>{{ this.$t('forms.pqWarehouses.item.buttonBack') }}</span>
  </nuxt-link>

  <div class="PQWarehousesGuidSidebar__item">
    <div :class="['PQWarehousesGuidSidebar__icon', 'PQWarehousesGuidSidebar__icon--warehouse']">
      <fa icon="warehouse" />
    </div>

    <span>{{ item.name }}</span>
  </div>

  <div class="PQWarehousesGuidSidebar__item">
    <PQWarehousesAvatar
      :name="item.organisationName"
      class="PQWarehousesGuidSidebar__avatar"
    />

    <span>{{ item.organisationName }}</span>
  </div>

</el-menu>
</template>

<script>
import PQWarehousesAvatar from '@/components/PQWarehouses/PQWarehousesAvatar'

export default {
  components: {
    PQWarehousesAvatar
  },

  props: {
    item: {
      type: Object,
      default: () => {}
    },

    horizontal: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.PQWarehousesGuidSidebar {

    width: 300px;
    height: 100%;

    padding-top: 2rem;

    @include for-medium-and-less {
        width: auto;

        margin: 0;
        padding: 1rem 4rem;

        display: flex;
        flex-wrap: wrap;
        flex-direction: row;

        border: 0;
        border-bottom: 1px solid $--color-border;
    }

    @include for-small-and-less {
        padding: 1rem 2rem;
    }

    @include for-extra-small {
        padding: 1rem;
    }

    &__item {
        padding: 1rem 2rem;
        margin-bottom: 1rem;

        display: flex;
        align-items: center;
        justify-content: flex-start;

        color: $--color-black;
        font-size: 1rem;
        line-height: 1rem;

        transition: 0.2s;

        &:first-child {
            font-weight: bold;

            cursor: pointer;

            svg {
                color: $--color-info;

                transition: 0.2s;
            }

            &:hover {

                color: $--color-danger;

                svg {
                    color: $--color-danger;

                    transform: scale(1.1) translateX(-.5rem);
                    transition: 0.2s;
                }
            }
        }

        &:not(:first-child) {
            padding: 1rem 2rem 1rem 4rem;
        }

        @include for-medium-and-less {

            padding: 0;
            margin: 0;

            &:not(:first-child) {
                padding: 0;
                margin: 0;
            }

            &:not(:last-child) {
                margin-right: 2rem;
            }

        }

        @include for-extra-small {
          margin: 0;

          &:not(:last-child) {
            margin: 0 2rem 1rem 0;
          }
        }

    }

    &__icon {
        height: 1rem;
        width: 1rem;

        margin-right: 1rem;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 1rem;

        &--warehouse {
            font-size: 0.75rem;
        }
    }

    &__avatar {
        margin-right: 1rem;
    }
}
</style>
