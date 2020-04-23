<template>
  <div class="login_nhwm">
    <div class="header">
      <div class="title">手机号注册</div>
      <div class="subtitle">未注册过的手机号将自动创建账号</div>
    </div>
    <van-field v-model="phone" type="tel" placeholder="请输入手机号" class="input" :border="false" />
    <van-field
      v-model="code"
      type="number"
      :maxlength="6"
      center
      placeholder="请输入验证码"
      class="input"
      :border="false"
    >
      <template #button>
        <span class="code" @click="getCode()" v-if="!wait">获取验证码</span>
        <div class="wait" v-else>
          <van-count-down :time="time" format="ss" auto-start @finish="overAwait()" />
          <span>秒后重新获取</span>
        </div>
      </template>
    </van-field>
    <div class="submit" v-points @click="login()">登录</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      code: "",
      time: 30 * 1000,
      wait: false,
      innerHeight:null,
      availHeight:null
    };
  },
  created(){    
  },
  methods: {
    getCode: function() {
      if (this.phone.length != 11) {
        this.$toast("请输入正确的手机号");
        return;
      }
      this.$axios
        .get("", {
          params: {
            s: "/api/user/send",
            mobile: this.phone
          }
        })
        .then(res => {
          this.$toast(res.data);
          this.$nextTick(() => {
            this.wait = true;
          });
        });
    },
    overAwait: function() {
      this.$nextTick(() => {
        this.wait = false;
      });
    },
    login: function() {
      if (this.code.length != 6) {
        this.$toast("请填写正确的验证码");
        return;
      }
      this.$axios
        .post("", {
          params: {
            s: "/api/user/login",
            mobile: this.phone,
            code: this.code
          }
        })
        .then(res => {
          if (res.code == 1) {
            this.$cookie.set("token", res.data.token, { expires: 7, path: "" });
            this.$router.replace({ name: "Home", params: {} });
          }
        });
    },    
  }
};
</script>
<style lang="scss" scoped>
.login_nhwm {
  padding: 112px 58px 72px;
  .header {
    margin-bottom: 90px;
    .title {
      font-size: 44px;
      font-weight: bold;
      color: #000;
    }
    .subtitle {
      font-size: 24px;
      color: #a8a8a8;
    }
  }
  .van-cell {
    padding: 0;
  }
  .input {
    padding: 18px 0;
    font-size: 34px;
    color: #000;
    border-bottom: 1px solid #eeeeee;
    &:-moz-placeholder {
      font-size: 32px;
      color: #aaa;
    }
  }
  .code {
    font-size: 32px;
    color: #d80b18;
  }
  .van-count-down {
    font-size: 32px;
    color: #888888;
  }
  .wait {
    display: flex;
    align-items: center;
    font-size: 32px;
    color: #888888;
  }
  .submit {
    width: 634px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 32px;
    color: #fff;
    background: #ff9900;
    border-radius: 50px;
    margin-top: 50px;
  }
}
</style>