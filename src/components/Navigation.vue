<template>
  <header v-if="addCityActive">
    <nav class="navigation">
      <div class="navigation__container">
        <h2 class="navigation__title">Add City</h2>
        <div class="navigation__actions">
          <span class="navigation__action">
            <i @click="editCities" ref="editCities" class="fa fa-edit"></i>
            Edit cities
          </span>
          <span class="navigation__action">
            <i @click="reloadApp" class="fa fa-sync"></i>
            Refresh
          </span>
          <span class="navigation__action">
            <i @click="addCity" class="fa fa-plus"></i>
            Add city
          </span>
        </div>
      </div>
    </nav>
  </header>
  <header v-else>
    <nav class="navigation">
      <div class="navigation__container" :class="{day: isDay, night: isNight}">
        <router-link class="navigation__router-link" :to="{name: 'AddCity'}">
          <i class="fa fa-arrow-left"></i>
        </router-link>
        <h2 class="navigation__title">
          {{ new Date().toLocaleString('en-GB', { weekday: 'short' }) }}
          {{ new Date().toLocaleString('en-GB', { month: 'short' }) }}
          {{ new Date().toLocaleString('en-GB', { day: '2-digit' }) }}
        </h2>
        <div class="navigation__actions">
          <span>&deg;C</span>
        </div>
      </div>
    </nav>
  </header>

</template>

<script>
export default {
  name: "Navigation",
  props: ['addCityActive', 'isDay', 'isNight'],
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
    }
  }
}
</script>

<style lang="scss" scoped>

.navigation {

  &__container {
    z-index: 9;
    position: fixed;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    background: #313640;
    padding: 16px;

    &.day {
      transition: .5s ease all;
      background-color: #3296F9;
    }

    &.night {
      transition: .5s ease all;
      background-color: #142A5F;
    }
  }

  &__router-link {
    color: #fff;
  }

  &__actions {
    display: flex;
    align-items: center;
  }

  &__action {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;

    i {
      font-size: 18px;
      padding-bottom: 4px;

      &.is-active {
        color: #D24B4B;
      }
    }
  }
}

</style>