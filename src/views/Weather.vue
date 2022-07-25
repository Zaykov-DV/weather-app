<template>
  <div class="weather">
    <div class="weather__container" :class="{day: isDay, night: isNight}">
      <div v-if="loading" class="loading">
        <span></span>
      </div>

      <div v-else class="weather__content">
        <CurrentWeather :isDay="isDay"
                        :isNight="isNight"
                        :currentWeather="currentWeather"/>
        <HourlyWeather :forecast="forecast"/>
        <WeeklyForecast :forecast="forecast"/>
        <AdditionalInfo :currentWeather="currentWeather"/>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import db from '../firebase/firebaseInit'
import CurrentWeather from '@/components/CurrentWeather'
import HourlyWeather from '@/components/HourlyWeather'
import WeeklyForecast from '@/components/WeeklyForecast'
import AdditionalInfo from '@/components/AdditionalInfo'

export default {
  name: "Weather",
  props: ['APIkey', 'isDay', 'isNight', 'userid'],
  components: {
    CurrentWeather,
    HourlyWeather,
    WeeklyForecast,
    AdditionalInfo
  },
  data() {
    return {
      forecast: null,
      currentWeather: null,
      loading: true,
      currentTime: null
    }
  },
  created() {
    this.getWeather()
  },
  beforeUnmount() {
    this.$emit('resetDays')
  },
  methods: {
    getWeather() {
      db.collection('cities')
          .where('city', '==', `${this.$route.params.city}`)
          .get()
          .then((docs) => {
            docs.forEach(doc => {
              this.currentWeather = doc.data().currentWeather
              axios
                  .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${doc.data().currentWeather.coord.lat}&lon=${doc.data().currentWeather.coord.lon}&exclude=current,minutley,alerts&units=metric&appid=${this.APIkey}`)
                  .then(res => this.forecast = res.data)
                  .then(() => {
                    this.loading = false
                    this.getCurrentTime()
                  })
            })
          })
    },
    getCurrentTime() {
      const dateObject = new Date();
      this.currentTime = dateObject.getHours();
      const sunrise = new Date(this.currentWeather.sys.sunrise * 1000).getHours()
      const sunset = new Date(this.currentWeather.sys.sunset * 1000).getHours()
      if (this.currentTime > sunrise && this.currentTime < sunset) {
        this.$emit('is-day')
      } else {
        this.$emit('is-night')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.loading {
  @keyframes spin {
    to {
      transform: rotateZ(360deg);
    }
  }

  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;

  span {
    display: block;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border: 2px solid transparent;
    border-top-color: #142A5F;
    border-radius: 50%;
    animation: spin ease 1000ms infinite;
  }
}

.weather {
  height: 100%;

  &__container {
    padding-top: 62px;
    transition: 500ms ease;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 100%;
    height: 100%;

    &.day {
      transition: .5s ease all;
      background-color: #3296F9;
    }

    &.night {
      transition: .5s ease all;
      background-color: #142A5F;
    }
  }
}
</style>