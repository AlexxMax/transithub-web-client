<template>
  <div>
    <div class="th-wrapper">
      <div v-if="active === 0">
        <UserRegistration />
      </div>

      <div v-else-if="active === 1">
        <CompanyRegistration />
      </div>

      <div v-else-if="active === 2">
        <Congratulations />
      </div>
    </div>
    
    <div class="th-footer">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="18" :md="14" :lg="10" :xl="10">
            <el-steps :active="active" finish-status="success" style="margin-top: 100px;">
              <el-step title="Користувач"></el-step>
              <el-step title="Компанія"></el-step>
              <el-step title="Готово"></el-step>
            </el-steps>

            <el-button style="margin-top: 30px;" @click="next">Наступний крок</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import UserRegistration from "@/components/Registration/UserRegistration";
import CompanyRegistration from "@/components/Registration/CompanyRegistration";
import Congratulations from "@/components/Registration/Congratulations";

export default {
  layout: "authorization",

  components: {
    UserRegistration,
    CompanyRegistration,
    Congratulations
  },

  data() {
    return {
      active: 0
    };
  },

  methods: {
    next() {
      if (this.active++ > 1) this.active = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.th-wrapper {
  min-height: calc(100vh - 250px - 250px);
}

.th-footer {
  height: 250px;
}
</style>
