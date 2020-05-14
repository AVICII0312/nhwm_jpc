<template>
  <div class="orderdetail">
    <van-nav-bar title="订单详情" left-arrow @click-left="backRouter()" />
    <div class="order">
      <div class="title">套餐信息</div>
      <div class="row">
        <div class="name">
          <div class="subject">{{detail.goods[0].goods_name}}</div>
          <div>
            <span>x</span>
            1
          </div>
        </div>
        <div class="num">￥{{detail.pay_price}}</div>
      </div>

      <div class="row">
        <div class="name">合计</div>
        <div class="num">￥{{Number(detail.pay_price)}}</div>
      </div>
    </div>
    <div class="appoint">
      <div class="title">配送地址</div>
      <div class="row">
        <div class="left">
          <p class="address">{{detail.address.detail}}</p>
          <p class="info">{{detail.address.name}} {{detail.address.phone}}</p>
        </div>
      </div>
    </div>
    <div class="appoint">
      <div class="title">
        <div>订单信息</div>
        <div class="phone">{{detail.order_status.text}}</div>
      </div>
      <div class="row">
        <div class="left">订单号</div>
        <div class="right">{{detail.order_no}}</div>
      </div>
      <div class="row">
        <div class="left">支付方式</div>
        <div class="right">{{detail.pay_type.text}}</div>
      </div>
      <div class="row">
        <div class="left">下单时间</div>
        <div class="right">{{detail.create_time}}</div>
      </div>
      <div class="row" v-if="detail.buyer_remark.length">
        <div class="left">订单备注</div>
        <div class="right">
          <span>{{detail.buyer_remark}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.orderdetail {
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
    .van-icon {
      font-size: 31px;
      color: #333333;
    }
  }
  .order {
    background: #fff;
    padding: 30px 30px 0;
    .title {
      font-size: 32px;
      font-weight: bold;
      color: #333;
      padding-bottom: 30px;
      border-bottom: 1px solid #f3f3f3;
    }
    .row {
      padding: 30px 0;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .name {
        flex: 1;
        font-size: 28px;
        color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 90px;
        span {
          color: #666;
        }
        .subject {
          width: 460px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
      .num {
        font-size: 30px;
        font-weight: bold;
        color: #333;
      }
    }
  }
  .appoint {
    padding: 30px;
    background: #fff;
    margin-top: 20px;
    .title {
      font-size: 32px;
      font-weight: bold;
      color: #333;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .phone {
        font-size: 24px;
        font-weight: normal;
        color: #36acff;
      }
    }
    .row {
      width: 100%;
      padding: 30px 0;
      border-top: 1px solid #f3f3f3;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      &:last-child {
        padding-bottom: 0;
      }
      .left {
        font-size: 28px;
        color: #111;
        .address {
          color: #333;
        }
        .info {
          color: #666;
          margin-top: 10px;
        }
      }
      .right {
        font-size: 28px;
        color: #666;
        text-align: right;
      }
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      order_id: "",
      detail: {
        pay_price: "",
        order_no: "",
        create_time: "",
        buyer_remark: "",
        address: {
          detail: "",
          name: "",
          phone: ""
        },
        pay_type: {
          text: ""
        },
        order_status: {
          text: ""
        },
        goods: [
          {
            goods_name: ""
          }
        ]
      }
    };
  },
  created() {
    this.order_id = this.$route.params.order_id;
    this.getDetail();
  },
  methods: {
    backRouter: function() {
      this.$router.back();
    },
    getDetail: function() {
      this.$axios
        .get("", {
          params: {
            s: "/api/user.order/detail",
            order_id: this.order_id
          }
        })
        .then(res => {
          this.detail = res.data.order;
        });
    }
  }
};
</script>