<template>
  <div id="login">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">登录</h3>
      </div>

      <div class="panel-body">
        <div class="alert alert-info" :class="{'alert-danger':isDanger}" role="alert">
          <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {{alertMsg}}
        </div>
        <form v-on:submit.prevent>
          <div class="form-group">
            <label for="user">账户</label>
            <input v-model.trim="formData.user" type="text" class="form-control" id="user" placeholder="请输入账户">
          </div>
          <div class="form-group">
            <label for="password">密码：</label>
            <input v-model.trim="formData.password" type="password" class="form-control" id="password" placeholder="请输入密码">
          </div>
          <div class="clearfix">
            <a v-on:click="login" href="javascript:;" class="btn btn-primary pull-right">登录</a>
            <a href="javascript:;" class="btn btn-default pull-right">注册</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import md5 from "md5";

export default {
  mounted() {},
  data() {
    return {
      alertMsg: "欢迎使用EmailService服务系统!",
      isDanger: false,
      formData: {
        user: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      const { user, password } = this.formData;

      if (user.length === 0 || password.length === 0) {
        this.isDanger = true;
        this.alertMsg = "请输入完整!";
        return false;
      } else if (user.length < 4 || user.length > 20) {
        this.isDanger = true;
        this.alertMsg = "账户输入格式不正确!";
        return false;
      } else if (password.length < 6 || password.length > 60) {
        this.isDanger = true;
        this.alertMsg = "密码输入格式不正确!";
        return false;
      }

      this.$http
        .post(
          "/user/login",
          qs.stringify({
            user,
            password: md5(password)
          }),
          {
            beforeSend: () => {
              this.isDanger = false;
              this.alertMsg = "正在努力登录中...";
            }
          }
        )
        .then(({ data }) => {
          const { code, msg } = data;

          if (code === 200) {
            this.$router.replace("/user");
          } else {
            this.isDanger = true;
            this.alertMsg = msg || "登录失败,请稍后再试!";
          }
        });
    }
  }
};
</script>

<style scoped>
#login {
  margin: 20px;
}

.btn {
  margin-left: 10px;
}
</style>