<template>
  <div class="pay_nhwm">
    <van-nav-bar title="确认订单" left-arrow @click-left="backRouter()" />
    <div class="address">
      <div class="info">
        <div class="detail">{{userInfo.address.detail}}</div>
        <div class="person">
          <span>{{userInfo.address.name}}</span>
          <span>{{userInfo.address.phone}}</span>
        </div>
      </div>
    </div>
    <div class="food_list">
      <div class="row">
        <div class="name">
          <div class="title">{{food.goods_name}}</div>
          <div>
            <span>x</span>
            1
          </div>
        </div>
        <div class="num">￥{{food.goods_price}}</div>
      </div>
      <div class="row">
        <div class="name">合计</div>
        <div class="total">
          <span class="total_num">￥{{Number(food.goods_price)}}</span>
        </div>
      </div>
    </div>

    <div class="remarks">
      <!-- <van-field
        v-model="message"
        rows="1"
        input-align="right"
        label-class="title"
        autosize
        label="订单备注"
        type="textarea"
        placeholder="请给商家留言"
      />-->
      <div class="title">订单备注</div>

      <div class="textarea">
        <!--pre 文本通常会保留空格和换行符。-->
        <pre class="content">{{remark}}</pre>
        <textarea v-model="remark" @input="changeInput($event)" placeholder="请给商家留言"></textarea>
      </div>
    </div>
    <div class="pay_list">
      <van-cell :border="false">
        <div class="pay_cell">
          <div>
            <i class="iconfont icon-nonghangzititubiao- icon zyzf"></i>掌银支付
          </div>
          <!-- <van-radio :name="30" /> -->
        </div>
      </van-cell>
    </div>
    <div class="tips">
      <div class="title">
        <img src="../assets/tip.png" alt />
        <span>温馨提示</span>
      </div>
      <div class="content">已付款的订单暂时不能退款，若有问题可以联系商家电话深入沟通。</div>
    </div>
    <div class="footer">
      <div class="left">
        <div class="price">
          <div class="num">￥{{food.goods_price}}</div>
        </div>
      </div>
      <div class="right" @click="Pay()">去支付</div>
    </div>
  </div>
</template>
<style lang="scss">
.pay_nhwm {
  height: 100vh;
  background: #f6f6f6;
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
    .van-icon {
      font-size: 31px;
      color: #333333;
    }
  }
  .address {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px;
    background: #fff;
    .info {
      flex: 1;
      .none {
        font-size: 34px;
        color: #ababab;
      }
      .detail {
        font-size: 28px;
        font-weight: bold;
        color: #333;
      }
      .person {
        font-size: 28px;
        color: #999;
        span {
          margin-right: 40px;
        }
      }
    }
  }

  .food_list {
    margin-top: 20px;
    background: #fff;
    padding: 0 30px;
    .row {
      padding: 30px 0;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #f3f3f3;
      &:last-child {
        border: none;
      }
      .name {
        flex: 1;
        font-size: 28px;
        color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 90px;
        .title {
          width: 460px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        span {
          font-size: 20px;
        }
      }
      .num {
        font-size: 30px;
        font-weight: bold;
        color: #333;
      }
    }
    .total {
      text-align: right;
      font-size: 28px;
      color: #333;
      span:nth-child(odd) {
        margin-left: 20px;
      }
      .sale_num {
        font-size: 26px;
        color: #d80b18;
      }
      .total_num {
        font-size: 30px;
        font-weight: bold;
      }
    }
  }
  .van-field__label {
    width: 130px;
  }
  .remarks {
    padding: 30px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    .title {
      flex-shrink: 0;
      font-size: 28px;
      font-weight: bold;
      color: #333;
      margin-right: 64px;
    }
    .weui-textarea {
      font-size: 28px;
      color: #333;
    }
    .textarea {
      position: relative;
      min-height: 40px;
      line-height: 40px;
      width: 100%;
      .content {
        display: block;
        visibility: hidden;
        font-size: 28px;
        color: #333333;
        line-height: 1.3;
        word-wrap: break-word;
        padding: 0;
      }
      textarea {
        overflow: hidden;
        resize: none;
        width: 100%;
        height: 100%;
        border: 0;
        font-size: 28px;
        color: #333333;
        line-height: 1.3;
        text-align: right;
        padding: 0;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
  .pay_list {
    margin-top: 20px;
    .pay_cell {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .icon {
        font-size: 30px;
        margin-right: 10px;
        &.wxzf {
          color: #50b674;
        }
        &.zyzf {
          color: #289693;
        }
      }
    }
  }
  .tips {
    padding: 30px;
    background: #fff;
    margin-top: 20px;
    .title {
      font-size: 28px;
      font-weight: bold;
      color: #333333;
      display: flex;
      align-items: center;
      img {
        width: 24px;
        height: 31px;
        margin-right: 10px;
      }
    }
    .content {
      font-size: 26px;
      color: #fcb200;
      margin-top: 10px;
    }
  }
  .footer {
    width: 100%;
    height: 98px;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    z-index: 2;
    .left {
      flex: 1;
      padding: 10px 28px;
      background: #3b3b3b;
      display: flex;
      align-items: center;
      .price {
        font-size: 40px;
        color: #fff;
      }
    }
    .right {
      width: 260px;
      line-height: 98px;
      text-align: center;
      font-size: 30px;
      font-weight: bold;
      color: #fff;
      background: #ff9900;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      remark: "", //输入中的文字
      food: {},
      message: "",
      userInfo: {
        address: {
          detial: ""
        }
      }
    };
  },
  created() {
    this.$axios
      .get("", {
        params: {
          s: "/api/user/detail"
        }
      })
      .then(res => {
        this.userInfo = res.data.userInfo;
      });
    this.food = this.$route.params.food;
  },
  methods: {
    changeInput($event) {
      this.value = $event.target.value;
    },
    backRouter: function() {
      this.$router.back();
    },
    Pay: function() {
      this.$axios
        .post("", {
          params: {
            s: "/api/order/buyNow",
            goods_id: this.food.goods_id,
            goods_sku_id: 0,
            remark: this.remark
          }
        })
        .then(res => {
          if (res.code != 1) return;
          if (this.userInfo.user_type.value == 1) {
            sessionStorage.setItem("active", "Orderlist");
            this.$router.replace({ name: "Orderlist" }).catch(err => {
              err;
            });
          } else {
            window.location.href = res.data.payment;
          }
        });
    }
  }
};
</script>