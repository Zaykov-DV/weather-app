<template>
  <div class="hourly-temp">
    <div class="hourly-temp__container">
      <p class="hourly-temp__date" v-if="$i18n.locale === 'en'">{{ new Date(this.time.dt * 1000).toLocaleString('en-us', {hour: 'numeric'}) }}</p>
      <p class="hourly-temp__date" v-if="$i18n.locale === 'ru'">{{ new Date(this.time.dt * 1000).toLocaleString('ru-RU', {hour: 'numeric'}) }}</p>
      <span>
      <img class="hourly-temp__icon"
           :src="require(`../assets/conditions/${this.time.weather[0].icon}.svg`)"
           alt="temp-icon">
    </span>
      <span class="hourly-temp__temp">{{Math.round(this.time.temp)}}&deg;C</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HourlyTemp",
  props: ['time']
}
</script>

<style lang="scss" scoped>

.hourly-temp {

  &__container {
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    min-width: 45px;
    margin-right: 30px;
  }

  &__date {
    font-weight: 300;
    margin-bottom: 12px;
  }

  &__temp {
    font-weight: 500;
    margin-bottom: 12px;
  }

  &__icon {
    width: auto;
    height: 22px;
    display: block;
  }

}

</style>