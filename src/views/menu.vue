<template>
  <div class="menu_nhwm">
    <van-nav-bar title="我要点餐" />
    <template v-if="list.length">
      <div class="section_group">
        <div class="section" v-for="item in list" @click="selectFood(item)" v-bind:key="item.key">
          <img class="thumb" :src="item.goods_image" alt />
          <div class="left">
            <div class="content">
              <div class="title">{{item.goods_name}}</div>
              <div class="price">￥{{item.goods_price}}</div>
            </div>
            <div class="button" @click.stop="toPay(item)">去下单</div>
          </div>
        </div>
      </div>
    </template>
    <div class="no_content" v-else>
      <img src="../assets/no_menu.png" alt />
    </div>
    <div class="food_pop" v-if="food_pop" v-points @click.self="food_pop=false">
      <div class="content">
        <img :src="food.goods_image" class="food_img" />
        <div class="name">{{food.goods_name}}</div>
        <div class="main">
          <div class="price">
            <span class="now">￥{{food.goods_price}}</span>
          </div>
          <div class="button" @click.stop="toPay(food)">去下单</div>
        </div>
        <div class="tip">{{food.content}}</div>
      </div>
      <van-icon name="close cancel" @click="food_pop=false" />
    </div>
  </div>
</template>
<style lang="scss">
.menu_nhwm {
  height: 100vh;
  background: #f5f5f5;
  .van-nav-bar {
    height: 78px;
    line-height: 78px;
    background: #eeeeee;
    border-top: 40px solid #eee;
    box-sizing: content-box;
  }
  .van-nav-bar__title {
    font-size: 31px;
    font-weight: bold;
    color: #333333;
  }
  .section_group {
    width: 100%;
    border-bottom: 120px solid #f5f5f5;
    background: #fff;
    .section {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 30px 30px 0;
      &:last-child .left {
        border: none;
      }
      .thumb {
        width: 160px;
        height: 160px;
        border-radius: 6px;
        margin-right: 20px;
        background: red;
      }
      .left {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #f3f3f3;
        padding-bottom: 30px;
        .content {
          flex: 1;
          height: 160px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 10px 0;

          .title {
            width: 310px;
            font-size: 30px;
            font-weight: bold;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .price {
            font-size: 32px;
            font-weight: bold;
            color: #ff4b10;
          }
        }
        .button {
          width: 132px;
          height: 56px;
          line-height: 56px;
          font-size: 28px;
          font-weight: bold;
          border-radius: 28px;
          text-align: center;
          color: #ffffff;
          background: linear-gradient(119deg, #ff7f23, #ff4e11);
        }
      }
    }
  }
  .no_content {
    height: 100vh;
    background: #fff;
    position: relative;
    img {
      width: 300px;
      height: 300px;
      position: absolute;
      left: 50%;
      top: 300px;
      transform: translateX(-50%);
    }
  }
  .food_pop {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba($color: #000000, $alpha: 0.2);
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .content {
      width: 660px;
      padding: 24px;
      background: #fff;
      border-radius: 8px;
      .food_img {
        width: 100%;
        height: 550px;
      }
      .name {
        font-size: 34px;
        font-weight: bold;
        color: #333;
        margin-top: 16px;
      }
      .main {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 20px 0;
        .price {
          display: flex;
          align-items: baseline;
          .now {
            font-size: 40px;
            font-weight: bold;
            color: #ff4b10;
          }
          .part {
            font-size: 26px;
            color: #999;
          }
        }
        .button {
          width: 132px;
          height: 56px;
          line-height: 56px;
          font-size: 28px;
          font-weight: bold;
          border-radius: 28px;
          text-align: center;
          color: #ffffff;
          background: linear-gradient(119deg, #ff7f23, #ff4e11);
        }
      }
      .tip {
        font-size: 26px;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .cancel {
      font-size: 70px;
      color: #fff;
      margin-top: 40px;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      active: "Ordering",
      food_pop: false,
      list: [],
      food: {},
      userInfo: {}
    };
  },

  created() {
    this.active = this.$router.history.current.name;
    this.$axios
      .get("", {
        params: {
          s: "/api/goods/lists"
        }
      })
      .then(res => {
        this.list = res.data.list;
      });
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
    tabChange: function(e) {
      let storeage = window.sessionStorage;
      let current = this.$router.history.current.name;
      if (e == current) return;
      this.$router.replace({ name: e }).catch(err => {
        err;
      });
    },
    selectFood: function(food) {
      this.food = food;
      this.food_pop = true;
    },
    toPay: function(food) {
      console.log(food);
      if (this.userInfo.discount == 0) {
        this.$toast("今日下单优惠套餐已用完，明日仍可享受，亲可以明天来哦");
        return;
      }
      this.$router.push({ name: "Pay", params: { food } }).catch(err => {
        err;
      });
    }
  }
};
</script>