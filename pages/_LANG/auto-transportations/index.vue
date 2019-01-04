<template>
  <div id="AutoTransportations">
    <el-row>
      <el-col :xs="24" :md="4">
        <BackButton :text="$t('forms.common.back')"/>
      </el-col>

      <el-col :span="24" :md="16">
        <div class="AutoTransportations__list">

          <div class="AutoTransportations__list-header">
            <span class="AutoTransportations__list-header-title">
              {{ $t('forms.common.autoTransportation') }}
            </span>
          </div>

          <div class="AutoTransportations__list-message">
              <span>{{ $t('forms.common.functionalslInDev') }}
              <nuxt-link to="/railway-aggregations" class="AutoTransportations__list-message__link">
                {{ $t('forms.common.railwayTransportation') }}
              </nuxt-link>
            </span>
          </div>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BackButton from '@/components/Common/FormElements/Constituents/BackButton'

export default {
  layout: "public",

  components: {
    BackButton
  }
}
</script>

<style lang="scss" scoped>
#AutoTransportations {
  margin-top: 70px;
  padding: 30px;
  background-color: #FAFAFA;

  .AutoTransportations__list {
    display: flex;
    flex-direction: column;

    &-header {
      text-align: center;

      &-title {
        font-size: 22px;
        font-weight: 700;
        color: #5B5B5B;
      }
    }

    &-message {    
      display: flex;
      align-self: center;
      margin-top: 40px;
      text-align: center;
      width: 80%;
      font-size: 18px;
      line-height: 1.5;

      span {
        color: #8E8E8E;
      }

      &__link {
        color: #FECD34;
        font-weight: 500;

        &:hover {
          color: #C4C4C4;
        }
      }
    }
  }
}
</style>
