<template>
  <ul class="pagination" :class="paginationClass">
    <li :class="{disabled:currentPage === 1}">
      <a v-on:click="previous" href="javascript:;" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li v-for="(pageNum,index) in pages" :key="index" :class="{active:pageNum===currentPage}">
      <template v-if="pageNum === currentPage">
        <span>
          {{pageNum}}
          <span class="sr-only">(current)</span>
        </span>
      </template>
      <template v-else>
        <a href="javascript:;" role="button" v-on:click="page(pageNum)">
          {{pageNum}}
        </a>
      </template>
    </li>
    <li :class="{disabled:currentPage >= total}">
      <a v-on:click="next" href="javascript:;" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "EsPage",
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number
    }
  },
  data() {
    return {
      pages: []
    };
  },
  methods: {
    page(pageNum) {
      const total = this.total;
      if (pageNum > total || pageNum < 1) return;
      this.$emit("update:currentPage", pageNum);
      if (total < 6) {
        const pages = [];
        for (var i = 0; i < total; i++) {
          pages.push(i + 1);
        }
        this.pages = pages;
      } else if (pageNum > 3 && total - pageNum > 2) {
        this.pages = [pageNum - 2, pageNum - 1, pageNum, pageNum + 1, pageNum + 2];
      } else if (pageNum > 3 && total - pageNum < 3) {
        this.pages = [total - 4, total - 3, total - 2, total - 1, total];
      } else if (pageNum < 4) {
        this.pages = [1, 2, 3, 4, 5];
      }
    },
    previous() {
      const previousVal = this.currentPage - 1;
      if (previousVal < 1) return false;
      this.page(previousVal);
      this.$emit("prev-click", previousVal);
    },
    next() {
      const nextVal = this.currentPage + 1;
      if (nextVal > this.total) return false;
      this.page(nextVal);
      this.$emit("next-click", nextVal);
    }
  },
  created() {
    this.page(this.currentPage);
  },
  computed: {
    paginationClass() {
      if (!this.total) {
        return "hide";
      }
    }
  },
  watch: {
    total() {
      this.page(this.currentPage);
    },
    currentPage(newVal) {
      this.$emit("current-change", newVal);
    }
  }
};
</script>

<style scoped>
</style>