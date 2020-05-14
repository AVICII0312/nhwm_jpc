<template>
  <div class="mine_nhwm">
    <van-nav-bar title="个人中心" />
    <div class="header">
      <img :src="userInfo.avatarUrl" alt class="images" />
      <div class="name">
        <div>{{userInfo.address.phone}}</div>
      </div>
    </div>
    <div class="section">
      <van-icon name="location" class="icon" />
      <div class="info">
        <div class="title">{{userInfo.address.detail}}</div>
        <div class="subtitle">{{userInfo.address.name}} {{userInfo.address.phone}}</div>
      </div>
    </div>

    <van-cell :border="false" center class="company" @click="toCompany()">
      <img src="../assets/company.png" alt class="images" />
    </van-cell>
  </div>
</template>
<style lang="scss">
.mine_nhwm {
  background: #f6f6f6;
  height: 100vh;
  .van-nav-bar {
    height: 78px;
    line-height: 78px;
    background: #eeeeee;
    border-top: 40px solid #eee;
    box-sizing: content-box;
    .van-nav-bar__title {
      font-size: 31px;
      font-weight: bold;
      color: #333333;
    }
  }

  .header {
    padding: 24px 30px;
    background: #fff;
    display: flex;
    align-items: center;
    .images {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 2px solid #fff;
      box-shadow: 0 5px 8px 0 rgba($color: #a6a6a6, $alpha: 0.33);
      margin-right: 30px;
    }
    .name {
      font-size: 32px;
      font-weight: bold;
      color: #333;
      .tag {
        font-size: 24px;
        font-weight: normal;
        color: #999;
      }
    }
  }
  .section {
    display: flex;
    align-items: center;
    padding: 24px 28px;
    margin-top: 20px;
    background: #fff;
    .icon {
      color: #ff9900;
      margin-right: 28px;
      font-size: 36px;
    }
    .info {
      flex: 1;
      .title {
        font-size: 28px;
        font-weight: bold;
        color: #333333;
      }
      .subtitle {
        font-size: 28px;
        color: #999999;
        margin-top: 10px;
      }
    }
  }
  .company {
    position: fixed;
    left: 50%;
    bottom: 120px;
    transform: translateX(-50%);
    background: none;
    .van-cell__value--alone {
      text-align: center;
    }
    .images {
      width: 328px;
      height: 60px;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  created() {
    this.$axios
      .get("", {
        params: {
          s: "api/user/detail"
        }
      })
      .then(res => {
        this.userInfo = res.data.userInfo;
      });
  },
  methods: {
    pushRouter: function(e) {
      let current = this.$router.history.current.name;
      if (e == current) return;
      this.$router.push({ name: e }).catch(err => {
        err;
      });
    },
    getUserinfo: function() {
      this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    },
    toCompany: function() {
      window.location.href =
        "https://www.xysl.top/user/index/submit?source=金筷子h5";
    }
  }
};
</script>