<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="18" :md="14" :lg="10" :xl="10">
        <el-card class="Invitation__card">
          <span class="Invitation__title">{{ $t('forms.invitation.title') }}</span>

          <div v-if="invalidInvitation">
            <el-row>
              <el-col :span="24">
                <div class="Invitation__info-wrapper">
                  <div class="Invitation__invalid-invitation">
                    <p class="Invitation__invalid-invitation-title">
                      {{ $t('messages.invalidInvitationTitle') }}
                    </p>
                    <p class="Invitation__invalid-invitation-subtitle">
                      {{ $t('messages.invalidInvitationSubtitle') }}
                    </p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>

          <div v-else>
            <el-row>
              <el-col :xs="24" :md="12">
                <div class="Invitation__info-wrapper">
                  <span class="Invitation__label">{{ $t('forms.invitation.company') }}</span>
                  <div class="Invitation__info">
                    <CompanyAvatar :name="company.name" />
                    <span class="Invitation__info-name Invitation__name">
                      {{ company.workName }}
                    </span>
                  </div>
                </div>
              </el-col>

              <el-col :xs="24" :md="12">
                <div class="Invitation__info-wrapper">
                  <span class="Invitation__label">{{ $t('forms.invitation.author') }}</span>
                  <div class="Invitation__info">
                    <UserAvatar :username="author.fullname" />
                    <span class="Invitation__info-name Invitation__name">
                      {{ author.fullname }}
                      <span class="Invitation__info-subname">{{ author.email }}</span>
                    </span>
                  </div>
                </div>
              </el-col>
            </el-row>

            <div class="Invitation_user-wrapper" v-if="user.needReg">
              <div class="Invitation__info-wrapper">
                <span class="Invitation__label">{{ $t('forms.invitation.user') }}</span>
                <el-form
                  :model="user"
                  status-icon
                  :rules="rules"
                  ref="form"
                  label-width="120px"
                  label-position="top"
                  size="mini">
                  <el-row :gutter="20">
                    <el-col :xs="24" :md="12">
                      <el-form-item
                        :label="$t('forms.user.common.firstname')"
                        prop="firstname">
                        <el-input
                          v-model="user.firstname"
                          :placeholder="$t('forms.user.placeholdes.firstname')"
                          :maxlength="100">
                          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                        </el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :md="12">
                      <el-form-item
                        :label="$t('forms.user.common.lastname')"
                        prop="lastname">
                        <el-input
                          v-model="user.lastname"
                          :placeholder="$t('forms.user.placeholdes.lastname')"
                          :maxlength="100">
                          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20">
                    <el-col :xs="24" :md="12">
                      <el-form-item
                        :label="$t('forms.common.email')"
                        prop="email">
                        <el-input
                          v-model="user.email"
                          type="email"
                          :placeholder="$t('forms.user.placeholdes.email')"
                          :maxlength="500">
                          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                        </el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :md="12">
                      <el-form-item :label="$t('forms.common.uiLanguage')">
                        <el-select
                          style="width: 100%"
                          v-model="user.language"
                          placeholder="Select">
                          <el-option v-for="(lang, index) in langs" :key="index" :label="lang.label" :value="lang.value">
                            {{lang.label}}
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <div style="margin-top: 20px;">
                    <el-row :gutter="20">
                      <el-col :xs="24" :md="12">
                        <el-form-item
                          :label="$t('forms.user.common.password')"
                          prop="password">
                          <el-input
                            v-model="user.password"
                            :placeholder="$t('forms.user.placeholdes.password')"
                            type="password"
                            :maxlength="500">
                            <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                          </el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :xs="24" :md="12">
                        <el-form-item
                          :label="$t('forms.user.common.passwordCheck')"
                          prop="passwordCheck">
                          <el-input
                            v-model="user.passwordCheck"
                            :placeholder="$t('forms.user.placeholdes.passwordCheck')"
                            type="password"
                            :maxlength="500">
                            <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </el-form>
              </div>
            </div>

            <div class="Invitation_user-wrapper" v-if="!user.needReg">
              <el-row type="flex" justify="center">
                <el-col :span="24">
                  <div class="Invitation__info-wrapper">
                    <span class="Invitation__label">{{ $t('forms.invitation.user') }}</span>
                    <div class="Invitation__info Invitation__info-col">
                      <UserAvatar :username="user.fullname" :size="80" style="margin: auto"/>
                      <span class="Invitation__info-name Invitation__info-name-user">
                        {{ user.fullname }}
                        <span class="Invitation__info-subname">{{ user.email }}</span>
                      </span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>

            <el-row type="flex" justify="center" :gutter="20">
              <el-col :span="24">
                <Button
                  class="Invitation__submit"
                  type="primary"
                  @click="acceptInvitation">
                  {{ $t('forms.invitation.mainButton') }}
                </Button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CompanyAvatar from "@/components/Companies/CompanyAvatar";
import UserAvatar from "@/components/Users/UserAvatar";
import Button from "@/components/Common/Buttons/Button";

import { VALIDATION_TRIGGER } from "@/utils/forms/constants";
import { showErrorMessage, showWarningMessage } from "@/utils/messages";

export default {
  name: "th-invitation",

  components: {
    Button,
    CompanyAvatar,
    UserAvatar
  },

  data() {
    const validation = {
      firstname: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.user.validation.firstname")));
        }
        cb();
      },
      lastname: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.user.validation.lastname")));
        }
        cb();
      },
      email: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.user.validation.email")));
        }
        cb();
      },
      password: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.user.validation.password")));
        }
        cb();
      },
      passwordCheck: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.user.validation.passwordCheck")));
        } else if (value !== this.user.password) {
          cb(new Error(this.$t("forms.user.validation.passwordCheckDiff")));
        }
        cb();
      }
    };

    return {
      company: {
        guid: "",
        name: "",
        workName: ""
      },

      author: {
        fullname: "",
        email: ""
      },

      user: {
        guid: "",
        firstname: "",
        lastname: "",
        fullname: "",
        email: "",
        password: "",
        passwordCheck: ""
      },

      langs: [
        {
          value: "ua",
          label: "Українська"
        },
        {
          value: "ru",
          label: "Русский"
        }
      ],

      rules: {
        firstname: [
          {
            required: true,
            validator: validation.firstname,
            trigger: VALIDATION_TRIGGER,
            max: 100
          }
        ],
        lastname: [
          {
            required: true,
            validator: validation.lastname,
            trigger: VALIDATION_TRIGGER,
            max: 100
          }
        ],
        email: [
          {
            required: true,
            validator: validation.email,
            trigger: VALIDATION_TRIGGER,
            max: 500
          }
        ],
        password: [
          {
            required: true,
            validator: validation.password,
            trigger: VALIDATION_TRIGGER,
            max: 500
          }
        ],
        passwordCheck: [
          {
            required: true,
            validator: validation.passwordCheck,
            trigger: VALIDATION_TRIGGER,
            max: 500
          }
        ]
      },

      invalidInvitation: false,

      loading: true
    };
  },

  methods: {
    async acceptInvitation() {
      const res = await this.$api.companies.acceptInvitation(
        this.company.guid,
        this.user.guid,
        this.user.needReg,
        this.user.firstname,
        this.user.lastname,
        this.user.email,
        this.user.password,
        this.user.language,
        this.$route.query.key
      );

      try {
        if (res.status) {
          if (
            this.$store.getters["user/isAuthenticated"] &&
            this.$store.state.user.guid !== this.user.guid
          ) {
            this.$store.dispatch("user/userLogout");
          }

          if (this.user.needReg) {
            await this.$store.dispatch("user/userLogin", {
              email: this.user.email,
              password: this.user.password
            });
          } else {
            this.$router.push("/workspace");
          }
        } else {
          throw new Error(res.msg);
        }
      } catch (e) {
        showErrorMessage(e.message);
      }
    }
  },

  async created() {
    const { user, company, key } = this.$route.query;
    const info = await this.$api.companies.getInvitationInfo(
      company,
      user,
      key
    );

    if (!info.status) {
      this.invalidInvitation = true;
      showWarningMessage(info.msg);
      return;
    }

    if (info.user.invitationAccepted) {
      this.$router.push("/workspace");
    }

    this.user = info.user;
    this.company = info.company;
    this.author = info.author;
  }
};
</script>

<style lang="scss" scoped>
.Invitation__card {
  padding: 20px 40px;
  background: white;
  z-index: 100;
  margin-top: -80px;
  padding-bottom: 20px;

  .Invitation__title {
    font-size: 34px;
    font-family: "Raleway" !important;
    color: #f0b917;
    display: flex;
    justify-content: center;
    z-index: 2;
    line-height: 60px;
    margin-bottom: 20px;
  }

  .Invitation__info-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .Invitation__invalid-invitation {
      text-align: center;

      .Invitation__invalid-invitation-title {
        font-size: 16px;
      }

      .Invitation__invalid-invitation-subtitle {
        font-size: 14px;
        color: #606266;
      }
    }

    .Invitation__info {
      display: flex;
      flex-direction: row;
      justify-content: center;

      .Invitation__info-name {
        margin-top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 40px;
        padding-left: 10px;
        color: #606266;

        .Invitation__info-subname {
          font-size: 13px;
          font-weight: 400;
          color: #989795;
        }

        &.Invitation__info-name-user {
          text-align: center;
          padding-left: 0;
          font-size: 20px;
          font-weight: 500;
        }
      }

      &.Invitation__info-col {
        flex-direction: column;
        justify-content: center;
      }
    }
  }

  .Invitation__submit {
    width: 100%;
    margin-top: 10px;
  }
}

.Invitation__name {
  font-size: 16px;
  font-weight: 500;
}

.Invitation__label {
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #989795;
  margin: 20px 0;
}

.Invitation_user-wrapper {
  margin: 20px 0;
}

.el-row {
  margin: 0 !important;
}

@media (max-width: 700px) {
  .Invitation__card {
    padding: 0;
    margin-top: 0;
    border: none;
  }
}

@media (max-width: 370px) {
  .Invitation__card {
    padding: 0;
    margin-top: 0;
    border: none;
  }
}
</style>
