<template>
  <header v-if="addCityActive || authPage">
    <nav class="navigation">
      <div class="navigation__container">
        <h2 class="navigation__title">{{ $t('nav.title') }}</h2>
        <div class="navigation__locale-changer">
          <select class="navigation__select" v-model="$i18n.locale">
            <option @click="handleClick()"
                    v-for="locale in $i18n.availableLocales"
                    :key="`locale-${locale}`"
                    :value="locale">
              {{ locale }}
            </option>
          </select>
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
        <div>
          <h2 v-if="$i18n.locale === 'en'" class="navigation__title">
            {{ new Date().toLocaleString('en-GB', {weekday: 'short'}) }}
            {{ new Date().toLocaleString('en-GB', {month: 'short'}) }}
            {{ new Date().toLocaleString('en-GB', {day: '2-digit'}) }}
          </h2>
          <h2 v-if="$i18n.locale === 'ru'" class="navigation__title">
            {{ new Date().toLocaleString('ru-RU', {day: '2-digit'}) }}
            {{ new Date().toLocaleString('ru-RU', {month: 'short'}) }}
            {{ new Date().toLocaleString('ru-RU', {weekday: 'short'}) }}
          </h2>
        </div>
        <div class="navigation__locale-changer">
          <select class="navigation__select" v-model="$i18n.locale">
            <option v-for="locale in $i18n.availableLocales"
                    :key="`locale-${locale}`"
                    :value="locale">{{ locale }}
            </option>
          </select>
        </div>
      </div>
    </nav>
  </header>

</template>

<script setup>

defineProps({
  addCityActive: {
    type: Boolean,
    default: false
  },
  isDay: {
    type: Boolean,
    default: false
  },
  isNight: {
    type: Boolean,
    default: false
  },
  authPage: {
    type: Boolean,
    default: false
  },
})

</script>

<style lang="scss">

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

    &_footer {
      bottom: 0;
      padding: 8px 16px;
    }

    &.day {
      transition: .5s ease all;
      background-color: #3296F9;
    }

    &.night {
      transition: .5s ease all;
      background-color: #142A5F;
    }
  }

  &__title {
    text-transform: capitalize;
  }

  &__router-link {
    color: #fff;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }

  &__action {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    text-align: center;

    i {
      font-size: 18px;
      padding-bottom: 4px;
    }

    &.is-active {
      color: #D24B4B;
    }
  }

  &__select {
    display: block;
    font-size: 16px;
    font-family: sans-serif;
    font-weight: 700;
    color: #313640;;
    line-height: 1.3;
    padding: .6em 1.4em .5em .8em;
    width: 100%;
    max-width: 100%;
    margin: 0;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0, 0, 0, .04);
    border-radius: .5em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;


    &::-ms-expand {
      display: none;
    }

    &:hover {
      border-color: #313640;
    }

    &:focus {
      border-color: #313640;
      color: #313640;
      outline: none;
    }
  }
}

</style>