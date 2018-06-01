<template>
  <el-popover placement="right" width="220" size="40" trigger="click">
    <div class="th-company-card">
      <th-company-avatar slot="reference" :name="company" class="th-company-avatar-big" :size="140" :shadow=false :cursor=false :rounded=false />

      <th-company-select />
    </div>

    <th-company-avatar slot="reference" :name="company" class="th-company-avatar" :size="40" :rounded=false />
  </el-popover>
</template>

<script>
import Avatar from "@/components/Common/Avatar.vue"
import CompanySelect from "@/components/Navmenu/Company/CompanySelect"

export default {
  components: {
    "th-company-select": CompanySelect,
    "th-company-avatar": Avatar
  },

  computed: {
    company: function() {
      return this.$store.state.companies.currentCompany.nameUa || '+'
    }
  }
};
</script>

<style lang="scss" scoped>
.th-company-card {
  text-align: center !important;
  padding: 10px 0;
  cursor: default;

  .th-company {
    margin-top: 15px;
    font-size: 16px;
    text-transform: capitalize;
  }
}

.th-company-avatar {
    width: 40px;
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: auto;
    margin-right: auto;
}

.th-company-avatar-big {
  margin: auto;
  width: 140px;
}
</style>
