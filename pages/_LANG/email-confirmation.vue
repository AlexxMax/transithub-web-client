<template>
  <div class="EmailConfirmation__wrapper">
     <el-row type="flex" justify="center">
      <!-- Card -->
      <el-col :xs="24" :sm="18" :md="14" :lg="12" :xl="12">
        <el-card class="box-card">
          <div class="EmailConfirmation__congratulations">
            <span class="EmailConfirmation__title">Вітаємо!</span>

              <p class="EmailConfirmation__message">
                {{ $t('messages.emailConfirmationMessage') }}
              </p>
          
          <div class="EmailConfirmation__user-info">
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
          </div>

            <div class="EmailConfirmation__btn-submit-wrapper">
              <el-button class="EmailConfirmation__btn-submit" @click="Login">Ввійти</el-button>
            </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  layout: "authorization",

  computed: {
    user: function() {
      return this.$store.state.user;
    },
    username: function() {
      return this.$store.getters["user/username"];
    },
    currentcompany: function() {
      return this.$store.getters["companies/getCurrentCompany"];
    }
  },

  methods: {
    Login() {
      this.$router.push("/login");
    }
  },

  fetch({ store, route }) {
    if (store.state.user.guid) {
      store.dispatch("user/userLogout");
    }
    return store.dispatch("user/getUserInfo", route.query.user);
  }
};
</script>

<style lang="scss" scoped>
.EmailConfirmation__wrapper {
  min-height: calc(100vh - 250px - 250px);
}

.el-row {
  margin: 0 !important;
}

.el-card {
  padding: 20px 40px;
  background: white;
  z-index: 100;
  margin-top: -80px;
  text-align: center;

  .EmailConfirmation__congratulations {
    //padding: 20px 0;
    .EmailConfirmation__title {
      font-size: 34px;
      //font-family: "Raleway" !important;
      color: #f0b917;
      display: flex;
      justify-content: center;
      z-index: 2;
      line-height: 60px;
      margin-bottom: 20px;
    }

    .EmailConfirmation__message {
      color: #606266;
    }

    .EmailConfirmation__user-info {
      label {
        font-size: 14px;
        color: #909399;
      }

      p {
        color: #606266;
        margin: 0 0 20px 0;
      }
    }

    .EmailConfirmation__btn-submit-wrapper {
      width: 100%;
      margin-top: 40px;

      .EmailConfirmation__btn-submit {
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