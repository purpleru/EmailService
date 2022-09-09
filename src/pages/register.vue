<template>
  <div id="register" :class="{'register-hide':!isShow}">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">注册账号</h3>
      </div>

      <div class="panel-body">
        <form @submit.prevent>
          <div class="form-group">
            <label for="registerUser">注册账号</label>
            <input v-model="register.user" type="text" class="form-control" name="user" id="registerUser" placeholder="请输入注册账号">
          </div>
          <div class="form-group">
            <label for="registerPassword">密码</label>
            <input v-model="register.password" type="password" class="form-control" name="password" id="registerPassword" placeholder="请输入密码">
          </div>
          <div class="form-group">
            <label for="registerEnterPassword">确认密码</label>
            <input v-model="register.enterPassword" type="password" class="form-control" id="registerEnterPassword" placeholder="请再次输入密码">
          </div>
          <div class="form-group">
            <label for="registerEmail">邮箱地址</label>
            <input v-model="register.email" type="email" class="form-control" name="email" id="registerEmail" placeholder="请输入邮箱地址">
          </div>
          <div>
            <router-link to="/login" class="btn btn-link">已有账号?马上去登录!</router-link>
          </div>
          <!-- <a href="javascript:;" class="btn btn-default">关闭</a> -->
          <a @click="registerHandler" href="javascript:;" class="clearfix btn btn-primary pull-right">立即注册</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import md5 from "md5";
import Joi from "joi";
const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
const registerValidate = Joi.object({
  user: Joi.string()
    .required()
    .alphanum()
    .message("账户名称不符合规则")
    .$.min(4)
    .max(16)
    .rule({ message: "账户长度最小为4并且不能超过16" })
    .messages({
      "string.empty": "请输入注册账号"
    }),
  password: Joi.string()
    .required()
    .pattern(/^[A-z0-9(\.\+\=\*\-\$\@)]{6,20}/)
    .error(new Error("密码不符合验证规则")),
  enterPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "string.base": "请输入有效的密码", // typeof enterPassword !== 'string || enterPassword === null
      "any.required": "请输入确认密码", // undefined
      "any.only": "确认密码和输入密码不一致!" // enterPassword !== password
    }),
  email: Joi.string()
    .required()
    .pattern(emailReg)
    .error(new Error("邮箱不符合验证规则"))
});

export default {
  props: {
    isShow: {
      type: Boolean,
      default: true
    }
  },
  name: "EsRegister",
  data() {
    return {
      register: {
        user: "",
        password: "",
        enterPassword: "",
        email: ""
      }
    };
  },
  methods: {
    async registerHandler() {
      const { error, value } = registerValidate.validate(this.register);
      if (error) {
        return this.$layer.msg(error.message, { offset: "5%" });
      }
      try {
        var { data } = await this.$http.post("/user/register", value);
      } catch (err) {
        console.log(err);
        return this.$layer.msg("注册失败,请稍后再试!", { offset: "5%" });
      }
      console.log(data);

      if (data.code !== 200) {
        return this.$layer.msg(data.msg || "注册失败,请稍后再试!", { offset: "5%" });
      }

      if (this.$listeners["register-success"]) {
        this.$emit("register-success", {
          data,
          registerForm: value
        });
      } else {
        this.$router.push("/login");
      }
      this.$layer.msg("注册成功!", { offset: "5%" });
      this.reset();
    },
    reset() {
      this.register = {
        user: "",
        password: "",
        enterPassword: "",
        email: ""
      };
    }
  }
};
</script>

<style scoped>
#register {
  margin: 20px;
}

.register-hide {
  display: none;
}

.btn + .btn {
  margin-left: 10px;
}
</style>