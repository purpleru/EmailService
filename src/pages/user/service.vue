<template>
  <div>
    <p>
      <button v-on:click="add" type="button" class="btn btn-primary">添加一个邮箱服务</button>
    </p>
    <table class="table table-striped">
      <thead>
        <tr>
          <th class="text-center">主机地址</th>
          <th class="text-center">邮箱账户</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in services" v-bind:key="service._id">
          <td class="text-center">
            {{service.host}}
          </td>
          <td class="text-center">
            {{service.author.user}}
          </td>
          <td class="text-center">
            <a v-on:click="showModal(service)" class="btn btn-primary btn-xs" href="javascript:;" role="button">生成接口</a>
            <a v-on:click="edit(service)" class="btn btn-info btn-xs" href="javascript:;" role="button">详细信息</a>
          </td>
        </tr>
      </tbody>
    </table>


    <!-- Modal -->
    <div ref="modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">生成服务接口</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="service_id">服务邮箱ID</label>
                <input v-bind:value="commit.id" type="text" class="form-control" id="service_id" disabled placeholder="id">
              </div>
              <div class="form-group">
                <label for="service_user">服务邮箱账户</label>
                <input v-bind:value="commit.user" type="text" class="form-control" id="service_user" disabled placeholder="服务邮箱账户">
              </div>
              <div class="form-group">
                <label for="service_title">默认发信标题</label>
                <input v-model.trim="commit.title" type="text" class="form-control" id="service_title" placeholder="请输入发信标题">
              </div>
              <div class="form-group">
                <label for="service_sendName">默认发信名称</label>
                <input v-model.trim="commit.sendName" type="text" class="form-control" id="service_snedName" placeholder="请输入发信名称">
              </div>
              <div class="form-group">
                <label for="service_addressee">收信人邮箱</label>
                <input v-model.trim="commit.addressee" type="email" class="form-control" id="service_addressee" placeholder="请输入收信人邮箱">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button v-on:click="go" type="button" class="btn btn-primary">立即生成接口</button>
          </div>
        </div>
      </div>
    </div>
    <add-service ref="service"></add-service>
    <edit-service ref="edit" :data="editData"></edit-service>
  </div>
</template>

<script>
import Joi from "joi";
import AddService from "../../components/service/add-service";
import EditService from "../../components/service/edit-service";
const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
const CommitJoiSchema = Joi.object({
  title: Joi.string()
    .required()
    .$.min(4)
    .max(150)
    .rule({ message: "默认发信标题最小为4最大为150" }),
  sendName: Joi.string()
    .required()
    .$.min(2)
    .max(80)
    .rule({ message: "默认发信标题最小为2最大为80" }),
  addressee: Joi.string()
    .required()
    .regex(emailReg)
    .message("收信人邮箱地址不符合验证规则!")
});

export default {
  data() {
    return {
      commit: {
        id: "",
        user: "",
        addressee: "",
        sendName: "",
        title: ""
      },
      editData: {},
      services: [],
      currentPage: 1
    };
  },
  methods: {
    edit(service = {}) {
      const { author, host, port, sendName } = service;
      this.editData = {
        host,
        port,
        sendName,
        user: author.user,
        password: "******"
      };
      this.$refs.edit.modal("show");
    },
    add() {
      this.$refs.service.modal("show");
    },
    showModal(service) {
      this.commit.id = service._id;
      this.commit.user = service.author.user;
      $(this.$refs.modal).modal("show");
    },
    getServices() {
      this.$http
        .get("/user/emails", {
          params: {
            currentPage: this.currentPage
          }
        })
        .then(({ data }) => {
          const { code, lists, msg } = data;
          if (code !== 200) {
            return this.$layer.msg(msg || "获取邮箱服务列表失败!");
          }
          this.services = lists;
          console.log(this.services);
        });
    },
    async go() {
      const { title, sendName, addressee, id } = this.commit;

      const { error, value: data } = CommitJoiSchema.validate({
        title,
        sendName,
        addressee
      });
      if (error) {
        return this.$layer.msg(error.message, { offset: "50px" });
      }

      const {
        data: { code, msg }
      } = await this.$http.request({
        method: "POST",
        url: "/user/interface",
        params: {
          id
        },
        data
      });

      if (code !== 200) {
        return this.$layer.msg(msg || "生成失败,请稍后再试！", {
          offset: "50px",
          icon: 5
        });
      }

      this.commit = {
        id: "",
        user: "",
        addressee: "",
        snedName: "",
        title: ""
      };

      $(this.$refs.modal).modal("hide");

      this.$layer.msg("恭喜你接口生成成功，请前往我的接口中查看使用！", {
        offset: "50px",
        icon: 1
      });

      console.log(this.commit);
    }
  },
  mounted() {
    this.getServices();
  },
  components: {
    AddService,
    EditService
  }
};
</script>

<style scoped>
table {
  table-layout: fixed;
}

table td,
table th {
  word-wrap: break-word;
}

.btn {
  margin-left: 10px;
}

.pagination {
  margin: 0;
  margin-right: 10px;
}
</style>