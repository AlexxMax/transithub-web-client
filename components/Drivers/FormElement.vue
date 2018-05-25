<template>
  <th-form>
    <template slot="header">
      <h3>Водій {{ driver.name }}</h3>
    </template>

    <template slot="content">
      <el-form :model="driver" label-width="100px" label-position="top" size="mini">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Прізвище">
              <el-input v-model="driver.last_name" clearable>
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="Ім'я">
              <el-input v-model="driver.first_name" clearable>
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="По батькові">
              <el-input v-model="driver.middle_name" clearable>
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Повне ім'я">
              <el-input v-model="driver.name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Серійний номер" prop="cert_serial_number">
              <el-input v-model="driver.cert_serial_number" clearable>
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="Номер телефону" prop="phone">
              <el-input v-model="driver.phone" clearable="">
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-tabs>
          <el-tab-pane label="Паспортні дані">

            <el-row>
              <el-col :span="8">
                <el-form :model="driver" label-position="top" size="mini">
                  <el-form-item label="Pass Date">
                    <el-date-picker v-model="driver.pass_date" type="date" placeholder="Виберіть дату" :picker-options="pickerOptions" clearable>
                    </el-date-picker>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </template>
  </th-form>
</template>

<script>
import CommonForm from "@/components/Common/Form";

export default {
  components: {
    "th-form": CommonForm
  },

  data() {
    const driver = this.$store.state.drivers.list.find(
      elem => elem.guid === this.$route.params.guid
    );
    return {
      driver: {
        last_name: "" || driver.last_name,
        first_name: "" || driver.first_name,
        middle_name: "" || driver.middle_name,
        name: "" || driver.name,
        cert_serial_number: "" || driver.cert_serial_number,
        phone: "" || driver.phone,
        pass_date: "" || driver.pass_date
      },

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "Сьогодні",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "Вчора",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "Тиждень тому",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.el-tabs {
  margin-top: 30px;
}
</style>

