<template>
  <footer v-if="addCityActive">
    <nav class="navigation">
      <div class="navigation__container navigation__container_footer">
        <div class="navigation__actions">
          <span class="navigation__action" ref="isEdit">
            <i @click="editCities" class="fa fa-edit"></i>
            {{ $t('nav.edit') }}
          </span>
          <span class="navigation__action">
            <i @click="reloadApp" class="fa fa-sync"></i>
            {{ $t('nav.refresh') }}
          </span>
          <span class="navigation__action">
            <i @click="$emit('add-city')" class="fa fa-plus"></i>
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

<script setup>
import { getAuth, signOut } from "firebase/auth";
import { defineProps, defineEmits, ref } from 'vue'
import { useRouter } from "vue-router";

defineProps({
  addCityActive: Boolean,
})

const emit = defineEmits(['edit-cities', 'add-city'])

const isEdit = ref(null)
const router = useRouter()

const reloadApp = () => {
  location.reload()
}

const editCities = () => {
  isEdit.value.classList.toggle('is-active')
  emit('edit-cities')
}

const handleSignOut = () => {
  const auth = getAuth()

  signOut(auth)
      .then(() => {
    router.push({name: 'Login'})
  })
}

</script>