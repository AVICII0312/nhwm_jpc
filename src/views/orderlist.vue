<template>
  <div class="orderlist_nhwm">
    <van-nav-bar title="订单" />
    <van-tabs v-model="selected" lazy-render fixed line-width="24" @change="tabChange">
      <van-tab id="1" title="全部">
        <template v-if="list.length">
          <div class="list">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :immediate-check="false"
              @load="onLoad"
            >
              <div
                class="section"
                v-for="item in list"
                v-bind:key="item.key"
                @click="toDetail(item.order_id)"
              >
                <div class="top">
                  <div class="images">
                    <img :src="item.goods[0].image.file_path" alt=" " class="images" />
                  </div>
                  <div class="info">
                    <div class="detail">
                      <div class="title">{{item.goods[0].goods_name}}</div>
                      <div class="statue">
                        <div class="await" v-if="item.order_status.value==10">待配送</div>
                        <div
                          class="await"
                          style="color:#d80b18;"
                          v-if="item.order_status.value==30"
                        >已送达</div>
                      </div>
                    </div>
                    <div class="subtitle">
                      <div class="price">￥{{item.pay_price}}</div>
                      <div class="tag">{{item.create_time}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </van-list>
          </div>
        </template>
        <div class="vacancy" v-else>
          <img src="../assets/no_order.png" alt />
        </div>
      </van-tab>
      <van-tab id="2" title="待配送">
        <template v-if="list.length">
          <div class="list">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :immediate-check="false"
              @load="onLoad"
            >
              <div
                class="section"
                v-for="item in list"
                v-bind:key="item.key"
                @click="toDetail(item.order_id)"
              >
                <div class="top">
                  <div class="images">
                    <img :src="item.goods[0].image.file_path" alt=" " class="images" />
                  </div>
                  <div class="info">
                    <div class="detail">
                      <div class="title">{{item.goods[0].goods_name}}</div>
                      <div class="statue">
                        <div class="await" v-if="item.order_status.value==10">待配送</div>
                        <div
                          class="await"
                          style="color:#d80b18;"
                          v-if="item.order_status.value==30"
                        >已送达</div>
                      </div>
                    </div>
                    <div class="subtitle">
                      <div class="price">￥{{item.pay_price}}</div>
                      <div class="tag">{{item.create_time}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </van-list>
          </div>
        </template>
        <div class="vacancy" v-else>
          <img src="../assets/no_order.png" alt />
        </div>
      </van-tab>
      <van-tab id="3" title="已送达">
        <template v-if="list.length">
          <div class="list">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :immediate-check="false"
              @load="onLoad"
            >
              <div
                class="section"
                v-for="item in list"
                v-bind:key="item.key"
                @click="toDetail(item.order_id)"
              >
                <div class="top">
                  <div class="images">
                    <img :src="item.goods[0].image.file_path" alt=" " class="images" />
                  </div>
                  <div class="info">
                    <div class="detail">
                      <div class="title">{{item.goods[0].goods_name}}</div>
                      <div class="statue">
                        <div class="await" v-if="item.order_status.value==10">待配送</div>
                        <div
                          class="await"
                          style="color:#d80b18;"
                          v-if="item.order_status.value==30"
                        >已送达</div>
                      </div>
                    </div>
                    <div class="subtitle">
                      <div class="price">￥{{item.pay_price}}</div>
                      <div class="tag">{{item.create_time}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </van-list>
          </div>
        </template>
        <div class="vacancy" v-else>
          <img src="../assets/no_order.png" alt />
        </div>
      </van-tab>
    </van-tabs>
    <!-- tab-container -->
  </div>
</template>
<style lang="scss">
.orderlist_nhwm {
  background: #f6f6f6;
  height: 100vh;
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
  .van-tabs--line .van-tabs__wrap {
    height: 100%;
    background: #fff;
  }
  .van-tabs__nav--line {
    padding-bottom: 0;
  }
  .van-tabs__line {
    bottom: 0;
    background: #ff9900;
  }
  .van-tab {
    padding: 28px 6px 20px;
    font-size: 30px;
    color: #666;
    &.van-tab--active {
      font-weight: bold;
      color: #ff9900;
    }
  }
  .list {
    padding-bottom: 120px;
    .section {
      background: #fff;
      padding: 30px;
      &:not(&:first-child) {
        border-top: 20px solid #f6f6f6;
      }
      width: 100%;
      .top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        .images {
          width: 100px;
          height: 100px;
          border-radius: 6px;
          margin-right: 20px;
          position: relative;
          overflow: hidden;
          .tag {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            background: rgba($color: #000000, $alpha: 0.6);
            color: #fff;
            text-align: center;
            font-size: 24px;
          }
        }
      }
      .bottom {
        flex: 1;
      }
      .info {
        flex: 1;
        .detail {
          display: flex;
          justify-content: space-between;
          .title {
            width: 430px;
            font-size: 32px;
            font-weight: bold;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
        .statue {
          text-align: center;
          font-size: 26px;
          .await {
            color: #42a3e5;
          }
        }
      }
      .subtitle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
        .price {
          font-size: 28px;
          font-weight: bold;
          color: #333333;
        }
        .tag {
          margin-top: 6px;
          font-size: 26px;
          color: #999;
        }
      }
    }
  }
  .vacancy {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 330px;
      height: 330px;
      margin-top: 240px;
    }
  }
  .van-list__finished-text {
    font-size: 22px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      selected: 2,
      total: 0,
      page: 1,
      loading: false,
      finished: false,
      ispage: false,
      useCounter: true,
      counter: 0,
      dataType: "all",
      list: [
        {
          order_id: 10156,
          order_no: "2020042254100571",
          total_price: "2.00",
          order_price: "2.00",
          order_status: {
            text: "待接单",
            value: 10
          },
          create_time: "2020-04-22 16:41:42",
          goods: [
            {
              order_goods_id: 10152,
              goods_id: 10090,
              goods_name: "套餐一",
              goods_sku_id: 10115,
              goods_price: "2.00",
              grade_goods_price: "0.00",
              grade_total_money: "0.00",
              total_price: "2.00",
              total_pay_price: "2.00",
              image: {
                file_path:
                  "http://127.0.0.1:8094/uploads/20190611091714f583e8315.jpg"
              }
            }
          ]
        }
      ]
    };
  },
  created() {
    if (window.sessionStorage.getItem("selected")) {
      this.selected = Number(window.sessionStorage.getItem("selected"));
      this.env(() => {
        this.tabChange(this.selected);
      });
    }
  },

  destroyed() {
    window.sessionStorage.setItem("selected", this.selected);
  },
  methods: {
    toDetail(e) {
      this.$router.push({ name: "Orderdetail", params: { order_id: e } });
    },
    getList: function() {
      console.log(this.dataType, this.selected);
      let _this = this;
      this.$axios("", {
        params: {
          s: "api/user.order/lists",
          dataType: this.dataType,
          page: this.page
        }
      }).then(res => {
        let resList = res.data.list.data,
          dataList = _this.list;
        // 数据的页数
        if (_this.ispage == true) {
          _this.list = dataList.concat(resList);
        } else {
          _this.list = [];
          _this.list = _this.list.concat(resList);
          _this.total = res.data.list.total;
        }
        this.$nextTick(() => {
          this.loading = false;
        });
      });
    },
    tabChange: function(name) {
      switch (Number(name + 1)) {
        case 1:
          this.dataType = "all";
          break;
        case 2:
          this.dataType = "sending";
          break;
        case 3:
          this.dataType = "complete";
          break;
      }
      this.total = 0;
      this.page = 1;
      this.loading = false;
      this.finished = false;
      this.ispage = false;
      this.getList();
    },
    env(callback) {
      callback && callback();
      this.useCounter && this.counter++;
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.page = ++this.page;
      this.loading = true;
      this.$nextTick(() => {
        if ((this.page - 1) * 4 >= this.total) {
          this.finished = true;
          this.ispage = false;
        } else {
          this.ispage = true;
          this.getList();
        }
      });
    }
  }
};
</script>