<template>
  <article class='dashboard' id='vue-dashboard'>
    <section>Filter: <input type="text" v-focus v-model="list_filter"/><del>(not supported to search tag)</del>support!</section>
    <section class="tags-container">
      <span class="tag del" @click="setTag('')"> x </span>
      <span v-for="(name, idx) in filter_key_words" :key="idx"
        class="tag" @click="setTag(name)">
        {{name}}
        </span>
      </section>    
    <li v-for="(view, idx) in view_filter_list" :key="idx">
      <router-link v-if="view.meta.paths.length === 1" :to="{ path: view.path, name: view.name }">
        {{ view.meta ? view.meta.name || view.name : view.name }}
      </router-link>
      <router-link v-else :to="{ path: view.path, name: view.name }">
        <template v-for="(path, idx) in view.meta.paths">
            {{idx === view.meta.paths.length - 1 ? view.meta.name : '[' + path + ']'}}
        </template>
      </router-link>
    </li>
  </article>
</template>

<script>
import view_routes from '@v/router/view'

export default {
  data: function() {
    return {
      list_filter: "",
      view_list: []
    }
  },
  computed: {
    view_filter_list: function() {
      return this.view_list.filter(view => view.name.search(this.list_filter)+1)
    },
    filter_key_words: function() {
      const ret = new Set()
      this.view_list.forEach(view => {
        ret.add(view.meta.paths[0].split(' ')[1] || view.meta.paths[0].split(' ')[0] )
      });
      return ret
    }
  },
  methods: {
    setTag: function(name) {
      this.list_filter = name
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    },
  },
  created: function() {

  },
  mounted: async function() {
    // import('../router').then(module => {
    //   this.view_list = module.view_routes
    // })
    import('../router/view').then(module => {
      console.log(module)
      this.view_list = module.default
    })
  }
}
</script>

<style>

</style>

<style lang="scss" scoped>
.tag {
  font-family: Arial, Helvetica, sans-serif;
  display: inline-block;
  margin: 4px;
  padding: 4px;
  border-radius: 1px;
  border: 1px solid #999;
  color: #999;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    border: 1px solid #333;
    color: #333;
  }

  &.del {
    padding: 4px 12px;
  }
}
// .tags-container {
//   box-sizing: border-box;
//   height: 20px;
//   padding: 40px;
// }
</style>
