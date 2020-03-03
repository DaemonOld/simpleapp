<template>
  <div class="home">
    <Navbar />
    <div id="map-container">
      <ObjectAddFormModal @add-marker="addMarker"/>
    </div>
  </div>
</template>

<script>
import 'ol/ol.css';
import {Map, View} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {fromLonLat} from 'ol/proj';
import OSM from "ol/source/OSM"
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import {Icon, Style, Fill, Circle, Stroke} from 'ol/style';
import Popup from 'ol-popup';
import 'ol-popup/src/ol-popup.css';

import Navbar from '@/components/Navbar.vue'
import ObjectAddFormModal from '@/components/ObjectAddFormModal.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'home',
  data: () => ({
    map: null,
    baseCoordinates: [39.72, 47.23],
    radius: 10000,
    popup: null,
    vectorSource: null
  }),
  computed: {
    ...mapGetters(["isAuthenticated", "user", "objects"]),
  },
  methods: {
    ...mapActions(["fetchUser", "fetchObcjets"]),
    generateRandomPoint(center, radius) {
      const x0 = center[0]
      const y0 = center[1]
      // Convert Radius from meters to degrees.
      const rd = radius/111300

      const u = Math.random()
      const v = Math.random()

      const w = rd * Math.sqrt(u)
      const t = 2 * Math.PI * v
      const x = w * Math.cos(t)
      const y = w * Math.sin(t)

      const xp = x/Math.cos(y0)

      return [xp+x0, y+y0]
    },
    generateMarkerForObject(obj) {
      const point = this.generateRandomPoint(this.baseCoordinates, this.radius)

      const marker = new Feature({
        geometry: new Point(fromLonLat(point)),
        id: obj.id,
        description: obj.description
      });

      return marker
    },
    generateMarkersForObjects() {
      const markers = []

      this.objects.forEach((obj, i) => {
        markers.push(this.generateMarkerForObject(obj))
      });

      return markers
    },
    addMarker(obj) {
      const marker = this.generateMarkerForObject(obj)

      this.vectorSource.addFeature(marker);

      const markerCoordinates = marker.getGeometry().getCoordinates()

      this.popup.show(markerCoordinates, '<div><h2>Описание</h2><p>' + marker.values_.description + '</p></div>')
    }
  },
  async mounted() {
    await this.fetchObcjets()

    const markers = this.generateMarkersForObjects()

    this.vectorSource = new VectorSource({
      features: markers
    });

    const style = new Style({
      image: new Circle({
        radius: 7,
        fill: new Fill({color: '#4271AE',}),
        stroke: new Stroke({
          color: [0,0,0], width: 2
        })
      })
    })

    const vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: style
    });

    this.map = new Map({
      target: 'map-container',
      layers: [
        new TileLayer({
          source: new OSM()
        }), 
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat(this.baseCoordinates),
        zoom: 12
      })
    });

    this.popup = new Popup();
    this.map.addOverlay(this.popup);

    this.map.on('pointermove', (evt) => {
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
        return feature;
      });
      if (feature) {
        this.popup.show(evt.coordinate, '<div><h2>Описание</h2><p>' + feature.values_.description + '</p></div>')
      }
    });
  },
  components: {
    Navbar,
    ObjectAddFormModal
  },
  async created() {
    if (this.isAuthenticated && !Object.keys(this.user).length) {
      await this.fetchUser()
    }
  },
}

</script>

<style lang="stylus">
.home
  height 100%
  display flex
  flex-direction column

#map-container
  position relative
  flex 1
</style>
