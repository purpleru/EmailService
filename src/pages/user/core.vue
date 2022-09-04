<template>
  <div>
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">我的信息：</h3>
      </div>
      <div class="panel-body">
        Basic panel example
      </div>
      <ul class="list-group">
        <li class="list-group-item"><strong>账户：</strong>admin</li>
        <li class="list-group-item"><strong>邮箱：</strong>123456@qq.com</li>
        <li class="list-group-item"><strong>注册时间：</strong>2022/8/30 10:54</li>
        <li class="list-group-item">Porta ac consectetur ac</li>
        <li class="list-group-item">Vestibulum at eros</li>
      </ul>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">其他信息：</h3>
      </div>
      <div class="panel-body">
        我们
      </div>
      <div class="icons clearfix">
        <div class="icon pull-left">
          <div>
            <strong>我的接口</strong>
          </div>
          <div>
            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          </div>
          <div>
            <span>0个</span>
          </div>
        </div>

        <div class="icon pull-left">
          <div>
            <strong>邮箱服务</strong>
          </div>
          <div>
            <span class="glyphicon glyphicon-film" aria-hidden="true"></span>
          </div>
          <div>
            <span>8个</span>
          </div>
        </div>

        <div class="icon pull-left">
          <div>
            <strong>邮箱服务</strong>
          </div>
          <div>
            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          </div>
          <div>
            <span>8个</span>
          </div>
        </div>

        <div class="icon pull-left">
          <div>
            <strong>邮箱服务</strong>
          </div>
          <div>
            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          </div>
          <div>
            <span>8个</span>
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
        userInfo:{

        }
    };
  },
  mounted() {},
  methods: {
    getInfo() {
      this.$http.get("/user/info").then(res => {
        console.log(res);
      });
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

.icon strong{
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