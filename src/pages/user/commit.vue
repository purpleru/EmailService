<template>
  <div>
    <div class="btns text-right">
      <a v-on:click="readme" href="javascript:;" class="btn btn-warning">
        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
      </a>
    </div>
    <table class="table table-striped">
      <thead>
        <tr class="row">
          <th class="col-xs-4 text-center">发信名称</th>
          <th class="col-xs-4 text-center">收信人邮箱</th>
          <th class="col-xs-4 text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="commit in commits" :key="commit._id" class="row text-center">
          <td class="col-xs-4">
            {{commit.sendName}}
          </td>
          <td class="col-xs-4">
            {{commit.addressee}}
          </td>
          <td class="col-xs-4">
            <a v-on:click="showModal(commit)" class="btn btn-info btn-xs" href="javascript:;" role="button">查看接口</a>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade" ref="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">接口详细
              <small>
                <span v-on:click="readme" class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              </small>
            </h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>接口地址 </label>
                <div class="input-group">
                  <input v-bind:value="address" type="text" class="form-control" disabled placeholder="接口地址">
                  <span class="input-group-btn">
                    <a v-on:click="copy" href="javascript:;" class="btn btn-info" type="button">复制地址</a>
                  </span>
                </div>
              </div>

              <div class="form-group">
                <label>默认发信标题</label>
                <input v-bind:value="info.title" type="text" class="form-control" disabled placeholder="默认发信标题">
              </div>

              <div class="form-group">
                <label>默认发信名称</label>
                <input v-bind:value="info.sendName" type="text" class="form-control" disabled placeholder="默认发信名称">
              </div>

              <div class="form-group">
                <label>收信人邮箱地址</label>
                <input v-bind:value="info.addressee" type="email" class="form-control" disabled placeholder="收信人邮箱地址">
              </div>

              <div class="form-group">
                <label>发信方邮箱地址</label>
                <input v-bind:value="info.email" type="email" class="form-control" disabled placeholder="发信方邮箱地址">
              </div>

              <div class="form-group">
                <label>邮箱服务拥有者</label>
                <input v-bind:value="info.user" type="text" class="form-control" disabled placeholder="邮箱服务拥有者">
              </div>

            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
          </div>
        </div>
      </div>
    </div>

    <es-readme ref="readme" v-bind:isShow="false" v-bind:address="address"></es-readme>
  </div>
</template>

<script>
import EsReadme from "../../components/commit/readme";
export default {
  name: "commit",
  data() {
    return {
      commits: [],
      info: {
        address: "",
        title: "",
        sendName: "",
        addressee: "",
        email: "",
        user: ""
      }
    };
  },
  components: {
    EsReadme
  },
  methods: {
    readme() {
      this.$layer.open({
        type: 1,
        area: "80%",
        offset: "50px",
        content: $(this.$refs.readme.$el),
        title: "文档说明"
      });
    },
    async getCommits() {
      const { data } = await this.$http.get("/user/commits", {});
      if (data.code !== 200) {
        return this.$layer.msg(data.msg || "获取接口列表失败!");
      }
      this.commits = data.commits;
      console.log(data);
    },
    showModal(commit = {}) {
      this.getCommitInfo(commit._id);
      $(this.$refs.modal).modal("show");
    },
    async getCommitInfo(id) {
      const { data } = await this.$http.get("user/interface/" + id, {});
      if (data.code !== 200) {
        return this.$layer.msg(data.msg || "获取接口信息失败!");
      }
      const {
        info: { addressee, email, sendName, title, user, _id }
      } = data;
      this.info = {
        address: _id,
        title,
        sendName,
        addressee,
        user: user.user,
        email: email && email.author.user
      };
      // console.log(data);
    },
    copy() {
      window.navigator.clipboard
        .writeText(this.address)
        .then(() => {
          this.$layer.msg("复制成功!");
        })
        .catch(() => {
          this.$layer.msg("复制失败!");
        });
    }
  },
  mounted() {
    this.getCommits();
  },
  computed: {
    address() {
      var origin = window.location.origin,
        id = ":id";
      if (this.info.address) {
        id = this.info.address;
      }
      return origin + "/other/commit/" + id;
    }
  }
};
</script>

<style scoped>
.btns {
  padding: 4px;
}
</style>