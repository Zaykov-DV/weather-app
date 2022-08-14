<template>
  <footer v-if="addCityActive">
    <nav class="navigation">
      <div class="navigation__container navigation__container_footer">
        <div class="navigation__actions">
          <span class="navigation__action">
            <i @click="editCities" ref="editCities" class="fa fa-edit"></i>
            {{ $t('nav.edit') }}
          </span>
          <span class="navigation__action">
            <i @click="reloadApp" class="fa fa-sync"></i>
            {{ $t('nav.refresh') }}
          </span>
          <span class="navigation__action">
            <i @click="addCity" class="fa fa-plus"></i>
            {{ $t('nav.add') }}
          </span>
          <span class="navigation__action">
            <i @click="handleSignOut" class="fa fa-sign-out-alt"></i>
            {{ $t('nav.exit') }}
          </span>
        </div>
      </div>
    </nav>
  </footer>
</template>

<script>
import { signOut } from "firebase/auth";

export default {
  name: "Footer",
  props: ['addCityActive', 'auth'],
  methods: {
    addCity() {
      this.$emit('add-city')
    },
    reloadApp() {
      location.reload()
    },
    editCities() {
      this.$refs.editCities.classList.toggle('is-active')
      this.$emit('edit-cities')
    },
    handleSignOut() {
      signOut(this.auth).then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped>

</style>