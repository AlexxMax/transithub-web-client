<template>
  <div v-if="showCookieLaw">
    <cookie-law class="Cookie--th" storage-type="both" :storage-name="$cookies.EU_COOKIE_LAW_KEY">
      <div slot-scope="props" class="Cookie__content">
        <p class="Cookie__content__message"> {{ $t('forms.common.showCookies') }} </p>

        <div class="Cookie__content__buttons">
          <button class="Cookie__content__buttons__button" @click="props.accept">
            <span>OK</span>
          </button>

          <button class="Cookie__content__buttons__button grey" @click="props.close">
            <span> {{ $t('forms.common.ignore') }}</span>
          </button>
        </div>
      </div>
    </cookie-law>
  </div>
</template>

<script>
import CookieLaw from 'vue-cookie-law-with-type'

export default {
  components: {
    CookieLaw
  },

  data () {
    return {
      showCookieLaw: false
    }
  },

  mounted() {
    this.showCookieLaw = true
  }
}
</script>

<style lang="scss" scoped>
.Cookie {
  justify-content: center;

  &--th {
    z-index: 1000000;
    background: #ffffff;
    color: #535353;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    font-size: 14px;
  }
}

.Cookie__content {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;

  &__message {
    margin: 10px;
  }

  &__buttons {
    display: flex;
    flex-direction: row;

    &__button {
      font-size: 12px !important;
      color: #fff !important;
      border: none !important;
      border-radius: 3px !important;
      padding: 9px 15px !important;
      background: #FFD74D !important;
      white-space: nowrap;
      vertical-align: middle;
      transition: all .3s ease-in-out;
      margin-left: 10px;
      cursor: pointer;

      &:hover {
        box-shadow: 1px 1px 5px #FFD74D;
      }

      &.grey {
        background: #f0f2f5 !important;
        color: #535353 !important;

        &:hover {
          box-shadow: 1px 1px 5px #f0f2f5;
        }
      }
    }
  }
}

@media only screen and (max-width: 640px) {
  .Cookie__content {
    flex-direction: column;

    &__buttons {
      &__button{
        margin-left: 0;
        margin-top: 20px;
        padding: 9px 25px;

        &:nth-child(2) {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
