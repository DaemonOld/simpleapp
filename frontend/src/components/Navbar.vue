<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand>SimpleApp</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            {{ user.username }}
          </template>
          <b-dropdown-item @click="submitLogout">Выйти</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'navbar',
  computed: {
    ...mapGetters(['user', 'isAuthenticated', 'token'])
  },
  methods: {
    ...mapActions(['logout']),
    async submitLogout() {
        await this.logout()
        this.$router.push('/login?message=logout')
    }
  }
}
</script>