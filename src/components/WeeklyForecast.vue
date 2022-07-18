<template>
  <div class="weekly-forecast">
    <div class="weekly-forecast__container">
      <div class="weekly-forecast__items" v-for="(day, index) in filteredList" :key="index">
        <DailyForecast :day="day" />
      </div>
    </div>
  </div>
</template>

<script>
import DailyForecast from '@/components/DailyForecast'
export default {
  name: "WeeklyForecast",
  props: ['forecast'],
  components: {DailyForecast},
  computed: {
    filteredList() {
      return this.forecast.daily.slice(1, 8)
    }
  }
}
</script>

<style lang="scss" scoped>
.weekly-forecast {

  &__container {
    padding: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
  }

  &__items {
    margin-bottom: 10px;
  }
}
</style>