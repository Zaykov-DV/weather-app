<template>
  <div class="daily-forecast">
    <div class="daily-forecast__container">
      <div class="daily-forecast__day">
        <span>{{ new Date(this.day.dt * 1000).toLocaleString('en-us', { weekday: 'long' }) }}</span>
      </div>
      <div class="daily-forecast__condition">
        <img class="daily-forecast__icon"
             :src="require(`../assets/conditions/${this.day.weather[0].icon}.svg`)"
             alt="temp-icon">
      </div>
      <div class="daily-forecast__temperature">
        <b class="daily-forecast__high-temp">{{Math.round(this.day.temp.max)}}&deg;C</b> &nbsp;
      </div>
      <div class="daily-forecast__temperature">
        <span class="daily-forecast__low-temp">{{Math.round(this.day.temp.min)}}&deg;C</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DailyForecast",
  props: ['day'],
}
</script>

<style lang="scss" scoped>

.daily-forecast {

  &__container {
    display: grid;
    grid-template-columns: 3fr 2fr 1fr 1fr;
    color: #fff;
  }

  &__condition {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    width: 20px;
    height: auto;
  }

  &__temperature {
  }
}

</style>