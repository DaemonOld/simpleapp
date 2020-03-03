<template>
  <div>
    <b-button class='btn-open-model' variant="primary" v-b-modal.modal-add-object>Добавить новый объект</b-button>
    <b-modal
      id="modal-add-object"
      ref="objectAddModal"
      title="Добавление объекта"
      hide-footer  
    >
      <form ref="form" @submit.stop.prevent="submitObject">
        <b-form-group id="object-type-select" label="Тип объекта:" label-for="object-type-select">
          <b-form-select
            id="object-type-select"
            v-model="selected" 
            :options="options"
            required
          ></b-form-select>
        </b-form-group>
        <b-form-group
          label="Описание:"
          label-for="description-textarea"
          invalid-feedback="Description is required"
        >
          <b-form-textarea
            id="description-textarea"
            v-model="text"
            placeholder="Текст"
            rows="3"
            max-rows="6"
            required
          ></b-form-textarea>
        </b-form-group>
        <div class="text-right">
          <b-button type="submit" variant="primary">Добавить объект</b-button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    text: '',
    selected: null,
  }),
  computed: {
    ...mapGetters(['objects', 'objectTypes']),
    options() {
      return this.objectTypes.map((objType) => {
        return {
          value: objType.id,
          text: objType.name
        }
      })
    },
  },
  methods: {
    ...mapActions(['fetchObcjetTypes', 'addObject']),
    async submitObject() {
      const formData = new FormData()

      formData.append("object_type", this.selected)
      formData.append("description", this.text)

      try {
        const object = await this.addObject(formData)
        this.$bvToast.toast('Объект добавлен.', {
          title: 'Успех',
          variant: 'success',
          solid: true
        })
        this.selected = null
        this.text = ''
        this.$refs.objectAddModal.hide()
        this.addMarker(object)
      } catch (e) {
        this.$bvToast.toast(`${e}`, {
          title: 'Ошибка',
          variant: 'danger',
          solid: true
        })
      }
    },
    addMarker(object) {
      this.$emit('add-marker', object)
    }
  },
  async mounted() {
    await this.fetchObcjetTypes()
    this.selected = this.options[0].value
  }
}
</script>

<style lang="stylus">
.btn-open-model
  position absolute
  top 0
  right 0
  z-index 999
  padding .3em
  margin .3em
</style>