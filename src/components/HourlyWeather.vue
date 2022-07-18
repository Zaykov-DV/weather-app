<template>
  <div class="hourly-weather">
    <div class="hourly-weather__container">
      <div class="hourly-weather__items" v-for="(time, index) in filteredList" :key="index">
        <HourlyTemp :time="time"/>
      </div>
    </div>
  </div>
</template>

<script>
import HourlyTemp from '@/components/HourlyTemp'

export default {
  name: "HourlyWeather",
  props: ['forecast'],
  components: {
    HourlyTemp
  },
  created() {
    console.log(this.forecast)
  },
  computed: {
    filteredList() {
      return this.forecast.hourly.slice(0, 23)
    }
  }
}
</script>

<style lang="scss" scoped>

.hourly-weather {
  &__container {
    display: flex;
    padding: 20px 0 20px 20px;
    overflow-x: scroll;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    // скрыть скроллбар
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
}

</style>