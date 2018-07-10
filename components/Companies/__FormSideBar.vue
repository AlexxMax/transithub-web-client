<template>
  <div>
    <th-toolbar>
      <th-button style="width: 100%;" type="primary" @click="$emit('onSave')">{{ $t('forms.company.sidebar.saveChanges') }}</th-button>
    </th-toolbar>

    <div class="th-avatar-wrapper">
      <th-company-avatar slot="reference" :name="name" :size="190" :rounded=false :shadow=false />
      <th-sidebar-button @onClick="$emit('onClickUsers')">{{ $t('forms.company.sidebar.uploadImage') }}</th-sidebar-button>
    </div>

    <div style="margin-top: 50px">
      <th-sidebar-link
        @click="$emit('onClickUsers')"
        :title="$t('forms.company.sidebar.users')"
        :subtitle="$t('forms.company.sidebar.usersDesc')">
        <i slot="icon" class="fas fa-users" style="margin: auto; width: 30px;"></i>
      </th-sidebar-link>
      <th-sidebar-link
        @click="$emit('onClickAccredCompanys')"
        :title="$t('forms.company.sidebar.accredCompanys')"
        :subtitle="$t('forms.company.sidebar.accredCompanysDesc')">
        <i slot="icon" class="fas fa-building" style="margin: auto; width: 30px;"></i>
      </th-sidebar-link>
      <th-sidebar-link
        @click="$emit('onClickDevelopers')"
        :title="$t('forms.company.sidebar.develop')"
        :subtitle="$t('forms.company.sidebar.developDesc')">
        <i slot="icon" class="fas fa-code" style="margin: auto; width: 30px;"></i>
      </th-sidebar-link>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Common/Avatar.vue"
import Toolbar from '@/components/Common/Toolbar'
import Button from '@/components/Common/Buttons/Button'
import SideBarButton from '@/components/Common/Buttons/SideBarButton'
import SideBarLink from '@/components/Companies/__SideBarLink'

export default {
  components: {
    "th-company-avatar": Avatar,
    "th-toolbar": Toolbar,
    "th-button": Button,
    "th-sidebar-button": SideBarButton,
    "th-sidebar-link": SideBarLink
  },

  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.th-avatar-wrapper {
  margin: 50px 0px 0;
}
</style>
