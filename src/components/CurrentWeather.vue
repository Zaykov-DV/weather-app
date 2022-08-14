<template>
  <div class="current-weather">
    <div class="current-weather__container">
      <div class="current-weather__wrapper">
        <h4 class="current-weather__city">{{ this.currentWeather.name }}</h4>
        <div class="current-weather__info">
          <span class="current-weather__curr-temp">{{ Math.round(this.currentWeather.main.temp) }}&deg;C</span>
        </div>
        <div class="current-weather__high-low-temp">
          <div class="current-weather__high-temp">
            <i class="fas fa-chevron-up"></i>
            <span>{{ Math.round(this.currentWeather.main.temp_max) }}&deg;C</span>
          </div>
          <div class="current-weather__low-temp">
            <i class="fas fa-chevron-down"></i>
            <span>{{ Math.round(this.currentWeather.main.temp_min) }}&deg;C</span>
          </div>
        </div>
        <div class="current-weather__condition">
          <span>{{ this.currentWeather.weather[0].description }}</span>
        </div>
        <div class="current-weather__feels-like">
          <span>{{ $t('info.feels') }} {{ Math.round(this.currentWeather.main.feels_like) }}&deg;C</span>
        </div>
      </div>
      <div class="current-weather__icon">
        <img v-if="isDay" src="../assets/sun.png" alt="sun">
        <img v-if="isNight" src="../assets/moon.png" alt="moon">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CurrentWeather",
  props: ['isDay', 'isNight', 'currentWeather']
}

</script>

<style lang="scss" scoped>

.current-weather {

  &__container {
    min-height: 366px;
    position: relative;
    display: flex;
    flex-direction: column;
    color: #fff;
    padding: 20px 40px 120px;
    margin: 0 -20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
  }

  &__wrapper {
    position: relative;
    z-index: 1;
  }

  &__info {
    padding-top: 30px;
    flex: 1;
  }

  &__city {
    font-size: 24px;
    font-weight: 500;
  }

  &__curr-temp {
    margin-top: 40px;
    font-size: 80px;
    font-weight: 600;
  }

  &__high-low-temp {
    display: flex;
    gap: 16px;
  }

  &__high-temp, &__low-temp {
    display: flex;

    span {
      margin-left: 8px;
    }
  }

  &__condition {
    text-transform: capitalize;
    font-size: 24px;
    font-weight: 500;
    margin: 60px 0 8px 0;
  }

  &__feels-like {
    font-size: 14px;
    font-weight: 400;
  }

  &__icon {
    position: absolute;
    right: -150px;
    display: flex;
    align-items: center;
    overflow: hidden;
    z-index: 0;

    img {
      width: 366px;
      height: 366px;
    }
  }
}
</style>