<template>
  <div class="maps-container">
    <div class="map-controls">
      <div class="control-panel">
        <h4 class="control-title">地图控制</h4>
        <div class="control-buttons">
          <button class="control-btn" @click="zoomIn">
            <i class="ti-plus"></i>
          </button>
          <button class="control-btn" @click="zoomOut">
            <i class="ti-minus"></i>
          </button>
          <button class="control-btn" @click="resetView">
            <i class="ti-home"></i>
          </button>
        </div>
        <div class="layer-selector">
          <label>图层选择</label>
          <select v-model="currentLayer" @change="changeMapStyle">
            <option value="standard">标准视图</option>
            <option value="satellite">卫星视图</option>
            <option value="terrain">地形视图</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="map-container">
      <div id="map"></div>
      <div class="map-info">
        <div class="coordinates">
          <span>经度: {{ currentPosition.lng.toFixed(6) }}</span>
          <span>纬度: {{ currentPosition.lat.toFixed(6) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      marker: null,
      currentLayer: 'standard',
      currentPosition: {
        lat: 40.748817,
        lng: -73.985428
      },
      mapStyles: {
        standard: [
          {
            featureType: "water",
            stylers: [{ saturation: 43 }, { lightness: -11 }, { hue: "#0088ff" }],
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }],
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }],
          },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }],
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }],
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }],
          },
        ],
        satellite: [],
        terrain: [
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#e0efef" }],
          },
          {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { hue: "#1900ff" }, { color: "#c0e8e8" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ lightness: 100 }, { visibility: "simplified" }],
          },
          {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [{ visibility: "on" }, { lightness: 700 }],
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [{ color: "#7dcdcd" }],
          },
        ]
      }
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      var myLatlng = new window.google.maps.LatLng(
        this.currentPosition.lat, 
        this.currentPosition.lng
      );
      
      var mapOptions = {
        zoom: 13,
        center: myLatlng,
        scrollwheel: true,
        zoomControl: false,
        mapTypeControl: false,
        styles: this.mapStyles[this.currentLayer],
      };
      
      this.map = new window.google.maps.Map(
        document.getElementById("map"),
        mapOptions
      );

      this.marker = new window.google.maps.Marker({
        position: myLatlng,
        title: "当前位置",
        animation: window.google.maps.Animation.DROP,
        draggable: true
      });

      window.google.maps.event.addListener(this.marker, 'dragend', (event) => {
        this.updatePosition(event.latLng.lat(), event.latLng.lng());
      });

      window.google.maps.event.addListener(this.map, 'click', (event) => {
        this.moveMarker(event.latLng.lat(), event.latLng.lng());
      });

      this.marker.setMap(this.map);
    },
    
    zoomIn() {
      if (this.map) {
        this.map.setZoom(this.map.getZoom() + 1);
      }
    },
    
    zoomOut() {
      if (this.map) {
        this.map.setZoom(this.map.getZoom() - 1);
      }
    },
    
    resetView() {
      if (this.map) {
        this.map.setCenter(new window.google.maps.LatLng(
          40.748817, -73.985428
        ));
        this.map.setZoom(13);
        this.moveMarker(40.748817, -73.985428);
      }
    },
    
    changeMapStyle() {
      if (this.map) {
        this.map.setOptions({
          styles: this.mapStyles[this.currentLayer]
        });
      }
    },
    
    moveMarker(lat, lng) {
      if (this.marker && this.map) {
        const position = new window.google.maps.LatLng(lat, lng);
        this.marker.setPosition(position);
        this.updatePosition(lat, lng);
      }
    },
    
    updatePosition(lat, lng) {
      this.currentPosition.lat = lat;
      this.currentPosition.lng = lng;
    }
  }
};
</script>

<style>
.maps-container {
  display: flex;
  height: calc(100vh - 135px);
  width: 100%;
  position: relative;
}

.map-controls {
  width: 200px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.9);
  border-right: 1px solid #e0e0e0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.map-container {
  flex: 1;
  position: relative;
  height: 100%;
  width: calc(100% - 200px);
}

#map {
  height: 100%;
  width: 100%;
}

.control-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.control-title {
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.control-buttons {
  display: flex;
  gap: 10px;
}

.control-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.control-btn:hover {
  background: #f1f1f1;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.layer-selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.layer-selector label {
  font-size: 14px;
  color: #666;
}

.layer-selector select {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: white;
  font-size: 14px;
}

.map-info {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.coordinates {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 12px;
  color: #555;
}

@media (max-width: 768px) {
  .maps-container {
    flex-direction: column;
    height: calc(100vh - 80px);
  }
  
  .map-controls {
    width: 100%;
    height: auto;
    padding: 10px;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .map-container {
    width: 100%;
    height: calc(100% - 70px);
  }
  
  .control-panel {
    flex-direction: row;
    align-items: center;
    gap: 15px;
  }
}
</style>
