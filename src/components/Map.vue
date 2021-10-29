<template>
<div id="container-fluid">
    <div id="mapid" class="mx-auto"></div>
</div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default {
  name: 'Map',
  data () {
    return {
      center: [47.79941, 13.04399]
    }
  },
  methods: {
    setupLeafletMap: function () {
      const map = L.map('mapid').setView(this.center, 7)
      const layer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
      map.addLayer(layer)
      L.control.zoom({ position: 'topright' }).addTo(map)
    }
  },
  mounted () {
    this.setupLeafletMap()
  }
}
</script>
