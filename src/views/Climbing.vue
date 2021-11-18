<template>
<div class="container">
    <div id="search-box" class="container p-4 mt-3">
      <div class="mx-auto">
        <div class="mb-3">
          <label class="mb-1" for="city-search">City</label>
          <input
            @keyup="getCity"
            v-model="searchStr"
            class="form-control"
            id="city-search"
            type="text"
            placeholder="Enter city ..."
          >
          <div v-if="locations.length > 0" id="search-dropdown" class="border">
            <div
              @click="selectCity(loc)"
              id="search-dropdown-item"
              class="p-2 mx-0"
              v-for="loc in locations"
              :key="loc.display_name"
            >
              {{ loc.display_name }}
            </div>
          </div>
          <button
            @click="getPosition"
            class="btn btn-sm btn-secondary mt-2"
          >
          Get current position
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mb-1 bi bi-geo-alt" viewBox="0 0 16 16">
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg>
          </button>
        </div>

        <label for="radius" class="mt-4 form-label">Radius: <span id="radius-value">{{ this.radius }}</span> km</label>
        <input autocomplete="off" v-model="radius" type="range" class="form-range px-1" min="0" max="300" step="1" id="radius">
        <button @click="getCrags" class="btn btn-primary mt-2">
          Search crags
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mb-1 bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
        <button class="btn btn-secondary ms-2 mt-2" @click="toggleSearchBox()">Hide crags</button>
      </div>

      <div class="mt-5" v-if="showSearchBox">
        <div class="h4 text-primary">{{nearCrags.length}} Crags near you</div>
        <table class="table">
          <thead>
            <tr>
            <th>Crag</th>
            <th>Weather forecast</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="crag in orderedCrags" :key="crag.Crag">
              <td>
                <a :href="`http://8a.nu${crag.href}`">{{ crag.Crag }}</a>
                <div class="fw-lighter">{{ crag.distance.toFixed(1) }} km away</div>
                <div class="fw-lighter">{{ crag.rating }}</div>
              </td>
              <td>
                <div class="row">
                  <div class="col">
                    <div>Today</div>
                    <div>
                      <img :src="`http://openweathermap.org/img/wn/${crag.weather.daily[0].weather[0].icon}@2x.png`" alt="weather icon">
                    </div>
                    <div class="fw-light">
                      Temperature min {{ crag.weather.daily[0].temp.min.toFixed(0) }} °C / max {{ crag.weather.daily[0].temp.max.toFixed(0) }} °C
                    </div>
                    <div class="fw-light">
                      Rain: {{ (crag.weather.daily[0].pop*100).toFixed(0) }} % / {{ crag.weather.daily[0].rain }} L
                    </div>
                    <div class="fw-light">
                      Humidity: {{ crag.weather.daily[0].humidity.toFixed(0) }} %
                    </div>
                    <div class="fw-light">
                      Wind speed: {{ (crag.weather.daily[0].wind_speed*2.6).toFixed(1) }} km/h
                    </div>
                  </div>
                  <div class="col">
                    <div>{{ this.forecastDates[0] }}</div>
                    <div>
                      <img :src="`http://openweathermap.org/img/wn/${crag.weather.daily[1].weather[0].icon}@2x.png`" alt="weather icon">
                    </div>
                    <div class="fw-light">
                      Temperature min {{ crag.weather.daily[1].temp.min.toFixed(0) }} °C / max {{ crag.weather.daily[1].temp.max.toFixed(0) }} °C
                    </div>
                    <div class="fw-light">
                      Rain: {{ (crag.weather.daily[1].pop*100).toFixed(0) }} % / {{ crag.weather.daily[1].rain }} L
                    </div>
                    <div class="fw-light">
                      Humidity: {{ crag.weather.daily[1].humidity.toFixed(0) }} %
                    </div>
                    <div class="fw-light">
                      Wind speed: {{ (crag.weather.daily[1].wind_speed*2.6).toFixed(1) }} km/h
                    </div>
                  </div>
                  <div class="col">
                    <div>{{ this.forecastDates[1] }}</div>
                    <div>
                      <img :src="`http://openweathermap.org/img/wn/${crag.weather.daily[2].weather[0].icon}@2x.png`" alt="weather icon">
                    </div>
                    <div class="fw-light">
                      Temperature min {{ crag.weather.daily[2].temp.min.toFixed(0) }} °C / max {{ crag.weather.daily[2].temp.max.toFixed(0) }} °C
                    </div>
                    <div class="fw-light">
                      Rain: {{ (crag.weather.daily[2].pop*100).toFixed(0) }} % / {{ crag.weather.daily[2].rain }} L
                    </div>
                    <div class="fw-light">
                      Humidity: {{ crag.weather.daily[2].humidity.toFixed(0) }} %
                    </div>
                    <div class="fw-light">
                      Wind speed: {{ (crag.weather.daily[2].wind_speed*2.6).toFixed(1) }} km/h
                    </div>
                  </div>
                  <div class="col">
                    <div>{{ this.forecastDates[2] }}</div>
                    <div>
                      <img :src="`http://openweathermap.org/img/wn/${crag.weather.daily[3].weather[0].icon}@2x.png`" alt="weather icon">
                    </div>
                    <div class="fw-light">
                      Temperature min {{ crag.weather.daily[3].temp.min.toFixed(0) }} °C / max {{ crag.weather.daily[3].temp.max.toFixed(0) }} °C
                    </div>
                    <div class="fw-light">
                      Rain: {{ (crag.weather.daily[3].pop*100).toFixed(0) }} % / {{ crag.weather.daily[3].rain }} L
                    </div>
                    <div class="fw-light">
                      Humidity: {{ crag.weather.daily[3].humidity.toFixed(0) }} %
                    </div>
                    <div class="fw-light">
                      Wind speed: {{ (crag.weather.daily[3].wind_speed*2.6).toFixed(1) }} km/h
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="container-fluid">
      <div id="mapid" class="mx-auto"></div>
    </div>
  </div>
</template>

<script>
import crags from '@/crags.json'
import axios from 'axios'
import _ from 'lodash'

export default {
  data () {
    return {
      crags: crags,
      nearCrags: [],
      radius: 5,
      currentPosition: { lat: '', lon: '' },
      showSearchBox: true,
      searchStr: '',
      locations: [],
      forecastDates: []
    }
  },
  methods: {
    getCrags () {
      this.nearCrags = []
      this.crags.map(elem => {
        const distance = this.calculateDistance(this.currentPosition.lat, this.currentPosition.lon, elem.lat, elem.long)
        if (this.radius > distance) {
          elem.distance = distance
          const url = `/get_weather/${elem.lat}/${elem.long}`
          axios.get(url)
            .then(response => {
              elem.weather = response.data

              // Get Ranking from API
              axios
                .get(`/get_climbing_rating?distance=${distance}&pop=${elem.weather.daily[0].pop}&temp=${elem.weather.daily[0].temp.max}&wind=${elem.weather.daily[0].wind_speed}&humidity=${elem.weather.daily[0].humidity}`)
                .then(response => {
                  elem.rating = response.data
                })

              this.nearCrags.push(elem)
            })
        }
      })
    },
    toggleSearchBox () {
      this.showSearchBox = !this.showSearchBox
    },
    calculateDistance (lat1, lon1, lat2, lon2) {
      // calculate disantce between two gps coordinates with haversine formula
      const R = 6371e3 // metres
      const phi1 = lat1 * Math.PI / 180 // φ, λ in radians
      const phi2 = lat2 * Math.PI / 180
      const deltaPhi = (lat2 - lat1) * Math.PI / 180
      const deltaLambda = (lon2 - lon1) * Math.PI / 180

      const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
                Math.cos(phi1) * Math.cos(phi2) *
                Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const d = R * c / 1000 // in kilometers

      return d
    },
    getCoordinates () {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
    },
    async getPosition () {
      // Get current GPS location
      const coordinates = { lat: '', lon: '' }
      const position = await this.getCoordinates()
      coordinates.lat = position.coords.latitude
      coordinates.lon = position.coords.longitude
      this.currentPosition = coordinates

      axios
        .get(`/get_city_by_posititon/${coordinates.lat}/${coordinates.lon}`)
        .then(response => {
          this.searchStr = response.data.display_name
        })
    },
    getCity () {
      if (this.searchStr.length > 3) {
        axios
          .get(`/get_city/${this.searchStr}`)
          .then(response => {
            this.locations = response.data
          })
      } else {
        this.locations = []
      }
    },
    selectCity (value) {
      const coordinates = { lat: '', lon: '' }
      coordinates.lat = value.lat
      coordinates.lon = value.lon

      this.currentPosition = coordinates
      this.searchStr = value.display_name
      this.locations = []
    },
    getDateTimes (timeperiod) {
      for (let i = 1; i <= timeperiod; i++) {
        const date = new Date()
        const finalDate = new Date(date)
        finalDate.setDate(date.getDate() + i)
        this.forecastDates.push(finalDate.toLocaleDateString())
      }
    }
  },
  computed: {
    orderedCrags: function () {
      return _.orderBy(this.nearCrags, 'rating')
    }
  },
  created () {
    document.title = 'Where to go next?'
    this.getDateTimes(3)
  }
}
</script>
