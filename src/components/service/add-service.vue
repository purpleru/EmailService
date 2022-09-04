<template>
  <div>
    <div ref="modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="AddServiceModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">添加邮箱服务</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="add_service_host">主机地址</label>
                <input v-model="sendData.host" :disabled="noEdit" type="text" name="host" class="form-control" id="add_service_host" placeholder="请输入host地址">
              </div>
              <div class="form-group">
                <label for="add_service_sendName">默认发信名称</label>
                <input v-model="sendData.sendName" :disabled="noEdit" type="text" name="sendName" class="form-control" id="add_service_sendName" placeholder="请输入默认发信名称">
              </div>
              <div class="form-group">
                <label for="add_service_port">端口号<small>（默认25）</small></label>
                <input v-model="sendData.port" :disabled="noEdit" type="text" name="port" class="form-control" id="add_service_port" placeholder="请输入1-65535端口号">
              </div>
              <div class="form-group">
                <label for="add_service_user">邮箱账户</label>
                <input v-model="sendData.user" :disabled="noEdit" type="text" name="user" class="form-control" id="add_service_user" placeholder="请输入邮箱账户">
              </div>
              <div class="form-group">
                <label for="add_service_password">邮箱密码</label>
                <input v-model="sendData.password" :disabled="noEdit" type="password" name="password" class="form-control" id="add_service_password" placeholder="请输入邮箱密码">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button v-on:click="add" type="button" class="btn btn-primary">立即添加</button>
          </div>
        </div>
      </div>
    </div>
    <validate-service ref="validateService" :closeService="closeService" :reset="reset" v-bind:noEdit.sync="noEdit" v-bind:sendData="sendData"></validate-service>
  </div>
</template>

<script>
import ValidateService from "./validate-service";
import Joi from "joi";
const ServiceJoiSchema = Joi.object({
  host: Joi.string()
    .required()
    .$.min(4)
    .max(100)
    .rule({ message: "主机字符长度最小为4并且不能超过100" })
    .messages({
      "string.empty": "请输入主机地址"
    }),

  user: Joi.string()
    .required()
    .$.min(4)
    .max(100)
    .rule({ message: "账户长度最小为4并且不能超过100" })
    .messages({
      "string.empty": "请输入邮箱账户"
    }),
  password: Joi.string()
    .required()
    .$.min(4)
    .max(100)
    .rule({ message: "密码长度最小为4并且不能超过100" })
    .messages({
      "string.empty": "请输入邮箱密码"
    }),

  port: Joi.number()
    .required()
    .$.min(1)
    .max(65535)
    .rule({ message: "端口的值应该为1-65535之间的值" })
    .messages({
      "string.empty": "请输入端口号",
      "number.base": "端口的值应该为1-65535之间的值"
    }),
  sendName: Joi.string()
    .required()
    .$.min(4)
    .max(80)
    .rule({ message: "发信名称长度最小为4并且不能超过80长度" })
    .messages({
      "string.empty": "请输入默认发送名称"
    })
});

export default {
  name: "AddService",
  data() {
    return {
      sendData: {
        host: "",
        port: "25",
        sendName: "",
        user: "",
        password: ""
      },
      noEdit: false,
      index: ""
    };
  },
  methods: {
    modal(val) {
      $(this.$refs.modal).modal(val);
    },
    closeService() {
      this.$layer.close(this.index);
    },
    reset() {
      this.sendData = {
        host: "",
        port: "",
        sendName: "",
        user: "",
        password: ""
      };
      this.noEdit = false;
    },
    add() {
      const { error, value } = ServiceJoiSchema.validate(this.sendData);
      if (error) {
        return this.$layer.msg(error.message, { offset: "50px", anim: 6 });
      }
      console.log(this.sendData);

      this.index = this.$layer.open({
        success: () => {
          this.modal("hide");
        },
        type: 1,
        content: $(this.$refs.validateService.$el),
        area: "80%",
        offset: "50px"
      });
    }
  },
  components: {
    ValidateService
  }
};
</script>

<style>
</style>