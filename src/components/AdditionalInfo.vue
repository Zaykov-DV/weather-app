<template>
  <div class="add-info">
    <div class="add-info__container">
      <div class="add-info__item">
        <p class="add-info__title">{{ $t('info.sunrise') }}</p>
        <h4>{{ new Date(currentWeather.sys.sunrise * 1000).toLocaleString('en-us', {timeStyle: 'short'}) }}</h4>
      </div>
      <div class="add-info__item">
        <p class="add-info__title">{{ $t('info.sunset') }}</p>
        <h4>{{ new Date(currentWeather.sys.sunset * 1000).toLocaleString('en-us', {timeStyle: 'short'}) }}</h4>
      </div>
      <div class="add-info__item">
        <p class="add-info__title">{{ $t('info.humidity') }}</p>
        <h4>{{currentWeather.main.humidity}}%</h4>
      </div>
      <div class="add-info__item">
        <p class="add-info__title">{{ $t('info.cloudness') }}</p>
        <h4>{{currentWeather.clouds.all}}%</h4>
      </div>
      <div class="add-info__item">
        <p class="add-info__title">{{ $t('info.wind') }}</p>
        <h4>{{Math.round(currentWeather.wind.speed)}}mph</h4>
      </div>
      <div class="add-info__item">
        <p class="add-info__title">{{ $t('info.pressure') }}</p>
        <h4>{{currentWeather.main.pressure}} hPa</h4>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue";

defineProps({
  currentWeather: Object
})
</script>

<style lang="scss" scoped>
.add-info {
  &__container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    padding: 20px;
  }

  &__item {
    color: #fff;
  }

  &__title {
    margin-bottom: 2px;
  }
}
</style>