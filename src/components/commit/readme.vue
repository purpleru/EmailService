<template>
  <div v-bind:class="readmeClass" class="readme">
    <p>
      使用前，请先确保是否在<strong>邮箱服务</strong>中生成了接口，如果没有生成接口，现在立马
      <a class="btn-link">点我去生成接口</a>
    </p>
    <p>
      <strong>接口地址:</strong>
      <code>{{address}}</code>
    </p>
    <p>
      <strong>请求类型:</strong>
      <code>POST</code>
    </p>
    <!-- <p>
      <strong>请求参数:</strong>
      <code>8888</code>
      <code>8888</code>
      <code>8888</code>
      <code>8888</code>
    </p> -->
    <ul class="list-unstyled">
      <li>
        <strong>请求参数:</strong>
        <ul>
          <li>
            <p>
              <code>title</code>
              <small>邮件标题（必填）</small>
            </p>
          </li>
          <li>
            <p>
              <code>content</code>
              <small>邮件内容（必填）</small>
            </p>
          </li>
          <li>
            <p>
              <code>sendName</code>
              <small>发信名称</small>
            </p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    address: {
      type: String,
      default: "从邮箱服务中生成的接口地址"
    }
  },
  data() {
    return {};
  },
  computed: {
    readmeClass() {
      return {
        "es-hide": !this.isShow
      };
    }
  }
};
</script>

<style scoped>
.readme {
  padding: 15px;
}

code {
  margin-right: 6px;
}

.es-hide {
  display: none;
}

strong {
  white-space: nowrap;
}
</style>