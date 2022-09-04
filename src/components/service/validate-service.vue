<template>
  <div class="validate-service clearfix">
    <p class="indent">为了确保此邮箱服务的可用性，现在我们将使用此邮箱服务发送一封测试的邮件！</p>
    <div v-show="msg" class="alert" :class="alertClass" role="alert">
      <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
      验证结果:{{msg}}
      <p>Tip:{{tip}}</p>
    </div>
    <form v-on:submit.prevent>
      <div class="form-group">
        <label for="testServiceEmail">邮箱地址</label>
        <input v-model="email" type="email" :disabled="noEdit" class="form-control" id="testServiceEmail" placeholder="请输入您的邮箱地址">
      </div>
      <a v-show="!isSuccess" v-on:click.capture="validate" href="javascript:;" :class="{disabled:disabled}" class="btn btn-primary pull-right">{{text}}</a>
      <div v-show="isSuccess" class="pull-right">
        <a v-on:click="commit" href="javascript:;" class="btn btn-success pull-right">马上添加</a>
        <a href="javascript:;" class="btn btn-default pull-right">放弃</a>
      </div>
    </form>
  </div>
</template>

<script>
const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
export default {
  name: "ValidateService",
  props: ["sendData", "noEdit", "reset", "closeService"],
  data() {
    return {
      email: "",
      text: "发送",
      timer: "",
      disabled: false,
      msg: "",
      isSuccess: false,
      tip: "验证此邮箱服务失败,请检查主机/端口/账户/密码等是否输入正确!"
    };
  },
  methods: {
    limit(time = 60) {
      this.disabled = true;
      var time = time;
      const handler = () => {
        --time;
        time = time < 10 ? "0" + time : time;
        this.text = time + "s";
        if (time <= 0) {
          this.disabled = false;
          this.text = "重新测试";
          clearInterval(this.timer);
        }
      };
      this.timer = setInterval(handler, 1000);
      handler();
    },
    async validate() {
      if (this.disabled) return;
      if (!emailReg.test(this.email)) {
        return this.$layer.msg("邮箱地址不符合验证规则", { offset: "10%" });
      }
      this.msg = "";
      layer.msg("正在发送...", { icon: 6, offset: "10%", time: 1000 });
      this.limit(30);
      try {
        var { data } = await this.$http.post("/other/validate", Object.assign({ email: this.email }, this.sendData));
      } catch (err) {
        console.log(err);
        this.msg = "验证此邮箱服务失败,请稍后再试!";
        return false;
      }

      if (data.code !== 200) {
        this.msg = data.msg || "验证此邮箱服务失败!";
        return false;
      }

      this.msg = data.msg;
      this.tip = "恭喜你验证成功,现在你可以选择继续添加或放弃?";
      this.isSuccess = true;
      layer.msg("验证成功!", { icon: 1, offset: "10%" });
      this.$emit("update:noEdit", true);
    },
    async commit() {
      console.log(this.sendData);
      try {
        var { data } = await this.$http.post("/user/email", this.sendData);
      } catch (err) {
        console.log(err);
        return this.$layer.msg("添加失败,请稍后再试!", { icon: 2, offset: "10%" });
      }
      if (data.code !== 200) {
        return this.$layer.msg(data.msg || "添加此服务到服务器中失败!", { icon: 5, offset: "10%" });
      }
      this.closeService();
      this.resetData();
      this.reset();
      this.$layer.msg("添加成功!", { icon: 1, offset: "10%" });
    },
    resetData() {
      this.email = "";
      this.text = "发送";
      this.timer = "";
      this.disabled = false;
      this.msg = "";
      this.isSuccess = false;
      this.tip = "验证此邮箱服务失败,请检查主机/端口/账户/密码等是否输入正确!";
    }
  },
  computed: {
    alertClass() {
      if (this.isSuccess) {
        return "alert-success";
      }
      return "alert-danger";
    }
  }
};
</script>

<style scoped>
.validate-service {
  display: none;
  padding: 10px;
}

.indent {
  text-indent: 2em;
}
.btn {
  margin-left: 10px;
}
</style>