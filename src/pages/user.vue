<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="javascript:;">EmailService</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse" id="bs-example-navbar-collapse-1">

          <ul class="linkbar">
            <router-link v-for="item in navbarLinks" :key="item.path" :to="item.path" tag="li" active-class="bg-primary">
              <span :class="item.iconName" aria-hidden="true"></span>
              <span class="link_text">{{item.name}}</span>
            </router-link>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>

    <div class="body">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import userChildren from "../router/user";

const navbarLinks = userChildren.map(item => {
  const { iconName, name } = item.meta;
  return {
    path: item.path,
    iconName,
    name
  };
});

export default {
  data() {
    return {
      navbarLinks
    };
  }
};
</script>

<style scoped>
.body {
  margin: 0 20px;
}

.link_text {
  margin-left: 10px;
}

.linkbar {
  margin: 0;
  padding: 0;
  list-style: none;
}

.linkbar li {
  padding: 4px 6px;
  line-height: 30px;
}

.linkbar li + li {
  border-top: 1px solid #e7e7e7;
}
</style>