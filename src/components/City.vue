<template>
  <div @click="goToWeather" class="city">
    <div class="city__container">
      <i v-if="edit" ref="edit" @click="removeCity" class="city__delete far fa-trash-alt"></i>
      <h4 class="city__weather-title">{{ this.city.city }}</h4>
      <div class="city__weather-info">
        <span class="city__weather-temp">{{ Math.round(this.city.currentWeather.main.temp) }} &deg;C</span>
        <img class="city__weather-icon"
             :src="require(`../assets/conditions/${this.city.currentWeather.weather[0].icon}.svg`)"
             alt="weather-icon">
      </div>
      <div class="city__video-wrapper">
        <video autoplay loop muted playsinline preload="metadata" class="city__video"
               :src="require(`../assets/videos/${this.city.currentWeather.weather[0].icon}.mp4`)"
               alt="weather-icon"></video>
      </div>
    </div>
  </div>

</template>

<script>
import db from '../firebase/firebaseInit'

export default {
  name: "City",
  props: ['city', 'edit', 'userId'],
  data() {
    return {
      id: null
    }
  },
  methods: {
    removeCity() {
      db.collection('cities')
          .where('city', '==', `${this.city.city}`)
          .where('userId', '==', `${this.userId}`)
          .get()
          .then(docs => {
            docs.forEach(doc => {
              this.id = doc.id
            })
          })
          .then(() => {
              db.collection('cities').doc(this.id).delete()
          })
    },
    goToWeather(e) {
      if (e.target === this.$refs.edit) {
        //
      } else {
        this.$router.push({name: 'Weather', params: {city: this.city.city}})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.city {
  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 20px;
    flex-basis: 50%;
    min-height: 250px;
    color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);

    // overlay
    &::after {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, .2);
    }
  }

  &__delete {
    border-radius: 0 15px 0 0;
    border: 10px solid #4D4D4D;
    background-color: #4D4D4D;
    z-index: 1;
    font-size: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  &__weather-title {
    z-index: 1;
    text-transform: capitalize;
  }

  &__weather-info {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex: 1;
    z-index: 1;
  }

  &__weather-temp {
    text-transform: capitalize;
    font-size: 24px;
    font-weight: 600;
    z-index: 1;
    margin: 0 10px 4px;
  }

  &__weather-icon {
    height: 20px;
    width: auto;
  }

  &__video-wrapper {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  &__video {
    height: 100%;
    @media (min-width: 900px) {
      height: auto;
      width: 100%;
    }
  }
}
</style>