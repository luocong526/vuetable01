<template>
  <div id="app">
	  <!-- table组件-->
	<!-- <router-link class="list-group-item" active-class="active" :to="{name:'adduser'}">News</router-link> -->
	<tablePage/>
	<!-- <sumtest01/>
	<sumtest02/>
	<hr />
	<personlist/>
	<hr />
	<axiosVue/> -->
  </div>
</template>

<script>
//引入table组件
import tablePage from './components/tablePage.vue'

// import sumtest01 from './components/vuex/sumtest01.vue'
// import sumtest02 from './components/vuex/sumtest02.vue'
// import personlist from './components/vuex/personlist.vue'
// import axiosVue from './components/vuex/axiosVue.vue'

export default {
  name: 'App',
  components: {
	tablePage
	// sumtest01,
	// sumtest02,
	// personlist,
	// axiosVue
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
