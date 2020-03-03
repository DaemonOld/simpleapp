<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['logout']),
  },
  created() {
    axios.interceptors.response.use(response => {
     return response;
    }, error => {
      if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
        this.logout()
        this.$router.push('/login?message=logout')
      }
      return error;
    })
  }
}
</script>

<style lang="stylus">
html, body, #app
    height 100%
</style>