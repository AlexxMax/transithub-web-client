<template>
  <div>
    <el-row type="flex" justify="center">
      <!-- Card -->
      <el-col :xs="24" :sm="18" :md="14" :lg="10" :xl="10">

        <el-card class="box-card">
          <div class="th-congratulations">
            <span class="th-form-title">Вхід</span>

            <div class="th-user-info">
              <label>Користувач:</label>
              <p>
                {{ username }}
              </p>

              <label>Електронна пошта:</label>
              <p>
                {{ user.email }}
              </p>

              <!-- <label>Ключ компанії:</label>
              <p>
                {{ currentcompany.name }}
              </p> -->
            </div>

            <div class="th-btn-submit-wrapper">
              <el-button class="th-btn-submit" @click="Login">Ввійти</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  computed: {
    user: function() {
      return this.$store.state.user;
    },

    username: function() {
      return this.$store.getters["user/username"];
    }

    // currentcompany: function() {
    //   return this.$store.getters["companies/getCurrentCompany"];
    // }
  },

  methods: {
    Login() {
      this.$store.dispatch("user/userLogin", {
        email: this.user.email,
        password: this.user.regPassword
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin: 0 !important;
}

.el-card {
  padding: 20px 40px;
  background: white;
  z-index: 100;
  margin-top: -80px;
  text-align: center;

  .th-congratulations {
    //padding: 20px 0;
    .th-form-title {
      font-size: 34px;
      font-family: "Raleway" !important;
      color: #f0b917;
      display: flex;
      justify-content: center;
      z-index: 2;
      line-height: 60px;
      margin-bottom: 20px;
    }

    .th-user-info {
      label {
        font-size: 14px;
        color: #989795;
      }
    }
    .th-btn-submit-wrapper {
      width: 100%;
      margin-top: 40px;

      .th-btn-submit {
        width: 50%;
        height: 40px;
        border-radius: 5px;
        background-color: #f0b917;
        color: white;
        font-size: 14px;
        border-width: 0;

        &:hover {
          background-color: #f4c333;
        }
      }
    }
  }
}

@media (max-width: 700px) {
  .el-card {
    padding: 0;
    margin-top: 0;
    border: none;
  }
}

@media (max-width: 370px) {
  .el-card {
    padding: 0;
    margin-top: 0;
    border: none;
  }
}
</style>
