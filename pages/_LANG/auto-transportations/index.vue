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
              <span>{{ $t('forms.common.functionalslInDev') }}</span>
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
  },

  computed: {
    title () {
    	return this.$t('forms.common.autoTransportation') + ' - Transithub'
  	}
  },

  head () {
    return {
      title: this.title
    }
  }
}
</script>

<style lang="scss" scoped>
#AutoTransportations {
  margin-top: 80px;
  padding: 30px;
  background-color: #FAFAFA;
  min-height: calc(100vh - 311px);

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
      margin-top: 20px;
      text-align: center;
      width: 80%;
      font-size: 18px;
      line-height: 1.5;

      span {
        color: #8E8E8E;
      }
    }
  }
}
</style>
