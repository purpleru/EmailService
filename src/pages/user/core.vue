<template>
  <div>
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">我的信息：</h3>
      </div>
      <div class="panel-body">
        欢迎使用邮箱服务系统
      </div>
      <ul class="list-group">
        <!-- 2022/8/30 10:54 -->
        <li class="list-group-item clearfix">
          <strong>账户：</strong>{{userInfo.user}}
          <a @click="logout" href="javascript:;" type="button" class="btn btn-danger btn-xs pull-right">退出登录</a>
        </li>
        <li class="list-group-item"><strong>邮箱：</strong>{{userInfo.email}}</li>
        <li class="list-group-item"><strong>账户ID：</strong>{{userInfo._id}}</li>
        <li class="list-group-item"><strong>注册时间：</strong>{{userInfo.registerDate}}</li>
        <!-- <li class="list-group-item">Vestibulum at eros</li> -->
      </ul>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">其他信息：</h3>
      </div>
      <div class="panel-body">
        热爱生活，拥抱自由！
      </div>
      <div class="icons clearfix">
        <div class="icon pull-left">
          <div>
            <strong>我的接口</strong>
          </div>
          <div>
            <span class="glyphicon glyphicon-hdd" aria-hidden="true"></span>
          </div>
          <div>
            <span>{{interfaceCount}}个</span>
          </div>
        </div>

        <div class="icon pull-left">
          <div>
            <strong>邮箱服务</strong>
          </div>
          <div>
            <span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span>
          </div>
          <div>
            <span>{{serviceCount}}个</span>
          </div>
        </div>

        <div class="icon pull-left">
          <div>
            <strong>我的服务</strong>
          </div>
          <div>
            <span class="glyphicon glyphicon-credit-card" aria-hidden="true"></span>
          </div>
          <div>
            <span>0个</span>
          </div>
        </div>

        <div class="icon pull-left">
          <div>
            <strong>用户数量</strong>
          </div>
          <div>
            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
          </div>
          <div>
            <span>{{userCount}}个</span>
          </div>
        </div>
      </div>
    </div>
    <ul class="list-group">

    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      interfaceCount: 0,
      serviceCount: 0,
      userCount: 0
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$http.get("/user/info").then(({ data }) => {
        console.log(data);
        const { code, msg, user, interfaceCount, serviceCount, userCount } = data;
        if (code !== 200) {
          return this.$layer.msg(msg || "获取信息失败!");
        }
        this.userInfo = user;
        this.interfaceCount = interfaceCount;
        this.serviceCount = serviceCount;
        this.userCount = userCount;
      });
    },
    logout() {
      this.$layer.confirm("你是否确定退出登录？", { offset: "10%", title: "退出登录" }, index => {
        this.$http
          .get("/user/logout")
          .then(this.destory)
          .catch(this.destory);
        this.$layer.close(index);
      });
    },
    destory() {
      window.localStorage.removeItem("user");
      this.$router.replace("/login");
    }
  }
};
</script>

<style scoped>
.icon {
  width: 50%;
  padding: 10px;
  color: #808080;
  text-align: center;
  box-sizing: border-box;
  border-bottom: 1px solid #dddddd;
}

.icon strong {
  color: #797777;
}

.icon:nth-child(odd) {
  border-right: 1px solid #dddddd;
}

.icon:nth-of-type(1),
.icon:nth-of-type(2) {
  border-top: 1px solid #dddddd;
}

.icon:nth-last-child(1),
.icon:nth-last-child(2) {
  border-bottom: none;
}

.icon .glyphicon {
  font-size: 24px;
}
</style>