<template>
  <div id="home" class="home">
    <router-view></router-view>
    <van-tabbar v-model="active" @change="tabChange">
      <van-tabbar-item name="Menu">
        <span>点菜</span>
        <template #icon>
          <i class="iconfont icon-gongjulan-diancaidan icon"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="search" name="Orderlist">
        <span>订单</span>
        <template #icon>
          <i class="iconfont icon-dingdan1 icon"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="search" name="Mine">
        <span>我的</span>
        <template #icon>
          <i class="iconfont icon-wode icon"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<style lang="scss" scoped>
.van-tabbar {
  height: 100px;

  .van-tabbar-item {
    font-size: 22px;
    color: #999;
  }
  .van-tabbar-item--active {
    color: #ff9900;
  }
  .icon {
    font-size: 50px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      active: "Menu"
    };
  },
  beforeCreate() {
    this.$axios
      .get("", {
        params: {
          s: "api/user/detail"
        }
      })
      .then(res => {
        if (res.code == -1) {
          this.$router.replace({ name: "Login" }).catch(err => {
            err;
          });
        } else {
          sessionStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
        }
      });
  },
  created() {
    if (!this.$cookie.get("token")) {
      this.$router.replace({ name: "Login", params: {} });
    } else {
      if (window.sessionStorage.getItem("active")) {
        this.$router
          .push({ name: window.sessionStorage.getItem("active") })
          .catch(err => {
            err;
          });
      } else {
        this.$router.push({ name: "Menu" }).catch(err => {
          err;
        });
      }
    }
    this.active = this.$router.history.current.name;
  },

  methods: {
    tabChange: function(e) {
      let storeage = window.sessionStorage;
      let current = this.$router.history.current.name;
      if (e == current) return;
      sessionStorage.setItem("active", e);
      this.$router.replace({ name: e }).catch(err => {
        err;
      });
    }
  }
};
</script>