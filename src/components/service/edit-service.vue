<template>

  <div>
    <div ref="modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="AddServiceModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">邮箱服务</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="editServiceHost">主机地址</label>
                <input v-model="editData.host" :disabled="noEdit" type="text" name="host" class="form-control" id="editServiceHost" placeholder="请输入host地址">
              </div>
              <div class="form-group">
                <label for="editServiceSendName">默认发信名称</label>
                <input v-model="editData.sendName" :disabled="noEdit" type="text" name="sendName" class="form-control" id="editServiceSendName" placeholder="请输入默认发信名称">
              </div>
              <div class="form-group">
                <label for="editServicePort">端口号<small>（默认25）</small></label>
                <input v-model="editData.port" :disabled="noEdit" type="text" name="port" class="form-control" id="editServicePort" placeholder="请输入1-65535端口号">
              </div>
              <div class="form-group">
                <label for="editServiceUser">邮箱账户</label>
                <input v-model="editData.user" :disabled="noEdit" type="text" name="user" class="form-control" id="editServiceUser" placeholder="请输入邮箱账户">
              </div>
              <div class="form-group">
                <label for="editServicePassword">邮箱密码</label>
                <input v-model="editData.password" :disabled="noEdit" type="password" name="password" class="form-control" id="editServicePassword" placeholder="请输入邮箱密码">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <!-- <button type="button" class="btn btn-primary">保存修改</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditService",
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      noEdit: true
    };
  },
  methods: {
    modal(val) {
      $(this.$refs.modal).modal(val);
    }
  },
  computed: {
    editData() {
      const {
        data: { host, port, sendName, user, password }
      } = this;
      return {
        host,
        port,
        sendName,
        user,
        password
      };
    }
  },
  mounted() {
    console.log(this);
  }
};
</script>

<style>
</style>