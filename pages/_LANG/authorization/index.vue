<template>
  <div>
    <el-row type="flex" justify="center">

      <!-- Card -->
      <el-col :xs="18" :sm="16" :md="14" :lg="8" :xl="8">
        <el-card class="box-card">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
            <span class="th-form-title">Вхід</span>

            <el-form-item prop="number">
              <label>Номер телефону</label>
              <el-input v-model.number="ruleForm2.number" placeholder="Введіть номер телефону"></el-input>
            </el-form-item>

            <el-form-item prop="pass">
              <label>Пароль</label>
              <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="Введіть пароль"></el-input>
            </el-form-item>
            
            <div class="th-remember">
               <el-checkbox v-model="checked">Запам’ятати мене</el-checkbox>
                <a href="#">Забули пароль?</a>
            </div>

            <div class="th-btn-submit-wrapper">
              <button class="th-btn-submit" onClick="submitForm('ruleForm2')">Увійти</button>
            </div>

            <div class="th-registration">
              <span>Ще не маєте облікового запису?</span>
              <a href="#">Зареєструватися</a>
            </div>

             <el-button type="primary" @click="submitForm('ruleForm2')">Submit</el-button>

          </el-form>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.el-card {
  padding: 40px;
  background: white;
  z-index: 100;
  margin-top: -120px;

  .th-form-title {
    font-size: 34px;
    font-family: "Raleway" !important;
    color: #f0b917;
    display: flex;
    justify-content: center;
    z-index: 2;
    line-height: 60px;
  }

  .el-form-item {
    label {
      font-size: 14px !important;
      color: #989795 !important;
      width: 100%;
    }
  }

  .th-remember,
  .th-registration {
    .el-checkbox,
    span,
    a {
      font-size: 14px !important;
      color: #989795;
    }
    a {
      float: right;
    }
  }
  .th-btn-submit-wrapper {
    width: 100%;
    margin-top: 44px;

    .th-btn-submit {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      background-color: #f0b917;
      color: white;
      font-size: 14px;
      border-width: 0;
    }
  }

  .th-registration {
    margin-top: 44px;
    a {
      color: #f0b917;
      font-size: 16px !important;
    }
  }
}
</style>

<script>
export default {
  layout: "authorization",
  data() {
    var checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input the age"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please input digits"));
        } else {
          if (value < 18) {
            callback(new Error("Age must be greater than 18"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        checkPass: "",
        number: ""
      },
      rules2: {
        pass: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ],
        number: [
          {
            validator: checkNumber,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
