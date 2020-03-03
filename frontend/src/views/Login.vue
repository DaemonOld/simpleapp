<template>
  <div class="login">
    <b-form class="login__form p-5" @submit.prevent="submitLogin">
      <h1 class="text-center h3 mb-3 font-weight-normal">Авторизация</h1>
      <label class="sr-only" for="form-input-username">Имя ползователя</label>
      <b-input
        id="form-input-username"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Имя ползователя"
        v-model="username"
      ></b-input>
      <b-form-invalid-feedback :state="false" v-for="(error, index) in usernameErrors" :key="index">
        {{ error }}
      </b-form-invalid-feedback>

      <label class="sr-only" for="form-input-password">Пароль</label>
      <b-input
        id="form-input-password"
        type="password"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Пароль"
        v-model="password"
      ></b-input>
      <b-form-invalid-feedback :state="false" v-for="(error, index) in passwordErrors" :key="index">
        {{ error }}
      </b-form-invalid-feedback>

      <b-button type="submit" class="mt-3" variant="primary" block>Войти</b-button>
    </b-form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'login',
  mixins: [validationMixin],
  validations: {
    username: { required, maxLength: maxLength(150) },
    password: { required, minLength: minLength(5), maxLength: maxLength(255) },
  },
  data: () => ({
    username: 'admin',
    password: 'admin',
  }),
  computed: {
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Пароль должен быть не менее 5 символов')
      !this.$v.password.maxLength && errors.push('Пароль должен быть меньше 255 знаков')
      !this.$v.password.required && errors.push('Обязательное поле')
      return errors
    },
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.maxLength && errors.push('Имя ползователя может быть не более 150 символов')
      !this.$v.username.required && errors.push('Обязательное поле.')
      return errors
    },
  },
  methods: {
    ...mapActions(['login']),
    async submitLogin () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        username: this.username,
        password: this.password
      }

      try {
        await this.login(formData)
        this.$router.push('/')
      } catch (e) {
        this.$bvToast.toast(`${e}`, {
          title: 'Ошибка',
          variant: 'danger',
          solid: true
        })
      }
    }
  },
  components: {
  }
}
</script>

<style lang="stylus">
.login
  height 100%
  display flex
  justify-content center
  align-items center

.login__form
  box-shadow 0 0 2px rgba(0, 0, 0, 0.5)
  border-radius 5px
  width 350px
  max-width 350px
</style>