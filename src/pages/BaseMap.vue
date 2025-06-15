<template>
  <div id="baseMap">
    <div id="mapDiv" ref="mapContainer"></div>
  </div>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      mapContainer: null,
      map: null,
      view: null,
      currentPosition: {
        lat: 111.608,
        lng: 26.423
      },
    }
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      window.require([
        "esri/Map",
        "esri/views/MapView",
        "esri/geometry/Extent",
        "esri/layers/GroupLayer",
        "esri/layers/WebTileLayer",
        "esri/Basemap",
        "esri/layers/MapImageLayer",
        "esri/layers/FeatureLayer",
        "esri/layers/GeoJSONLayer",
        "esri/widgets/BasemapToggle",
        "esri/widgets/Zoom", // 添加 Zoom widget
        "esri/widgets/Compass" // 添加 Compass widget
      ], (Map, MapView, Extent, GroupLayer, WebTileLayer, Basemap, MapImageLayer, FeatureLayer, GeoJSONLayer, BasemapToggle, Zoom, Compass) => {
        const tiandituImageLayer = new WebTileLayer({
          urlTemplate: "http://{subDomain}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=cd55f1fc9c5d05abd8494d3da80aba2a",
          visible: true,
          subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
          opacity: 1
        });

        const tiandituVectorLayer = new WebTileLayer({
          urlTemplate: "http://{subDomain}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=cd55f1fc9c5d05abd8494d3da80aba2a",
          subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
          opacity: 1
        });

        const tiandituAnnotationLayer = new WebTileLayer({
          urlTemplate: "http://{subDomain}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=cd55f1fc9c5d05abd8494d3da80aba2a",
          visible: true,
          subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"]
        });

        const imgBaseMap = new Basemap({
          baseLayers: [tiandituImageLayer, tiandituAnnotationLayer],
          title: '影像图',
          id: "img_w",
          thumbnailUrl: 'http://api.tianditu.gov.cn/v4.0/image/map/maptype/satellite.png'
        });

        const vecBasemap = new Basemap({
          baseLayers: [tiandituVectorLayer, tiandituAnnotationLayer],
          title: "矢量图",
          id: "cva_w",
          thumbnailUrl: 'http://api.tianditu.gov.cn/v4.0/image/map/maptype/vector.png'
        });

        this.map = new Map({
          basemap: imgBaseMap,
          layers: [],
          showLabels: true
        });

        this.view = new MapView({
          container: this.$refs.mapContainer,
          map: this.map,
          center: [111.666, 26.205],
          zoom: 11,
          ui: {
            components: [] // 保持为空，我们将手动添加控件
          }
        });

        // 添加 Zoom 控件
        const zoom = new Zoom({
          view: this.view
        });
        this.view.ui.add(zoom, "top-right"); // 您可以调整位置，例如 "top-left", "bottom-right", "bottom-left"

        // 添加 Compass 控件
        const compass = new Compass({
          view: this.view
        });
        this.view.ui.add(compass, "top-right"); // 通常指北针放在左上角或右上角

        this.dynamicLayerGroup = new GroupLayer({
          title: "Dynamic Layer Group",
          visibilityMode: "independent",
          layers: []
        });
        console.log('this.dynamicLayerGroup initialized:', this.dynamicLayerGroup);

        this.map.add(this.dynamicLayerGroup);

        // BasemapToggle 控件 (底图切换)
        const basemapToggle = new BasemapToggle({
          view: this.view,
          nextBasemap: vecBasemap
        });
        this.view.ui.add(basemapToggle, "bottom-left"); // 您可以根据需要调整位置

        // 监听鼠标在地图上的移动事件
        this.view.on("pointer-move", (event) => {
          // 将屏幕坐标转换为地图坐标
          const point = this.view.toMap({ x: event.x, y: event.y });
          if (point) {
            this.currentPosition.lng = point.longitude;
            this.currentPosition.lat = point.latitude;
            // 触发事件，将新的经纬度传递给父组件
            this.$emit("updatePosition", { lng: point.longitude, lat: point.latitude });
          }
        });

        this.view.when(() => {
          console.log('Map and view are ready');

          const simpleRenderer = {
            type: "simple",
            symbol: {
              type: "simple-fill",
              color: [0, 0, 0, 0],
              outline: {
                type: "simple-line",
                color: [0, 191, 255, 1],
                width: 1.5
              }
            }
          };

          const linglingLayer = new GeoJSONLayer({
            url: "/vector/零陵区.json",
            title: "零陵区",
            renderer: simpleRenderer
          });
          this.map.add(linglingLayer);

          const yongzhouPlanningLayer = new GeoJSONLayer({
            url: "/vector/永州规划区片范围.json",
            title: "永州规划片区范围",
            renderer: simpleRenderer
          });
          this.map.add(yongzhouPlanningLayer);

          Promise.all([
            linglingLayer.when(),
            yongzhouPlanningLayer.when()
          ]).then(() => {
            console.log("GeoJSON layers loaded.");
          }).catch(error => {
            console.error("Error loading GeoJSON layers: ", error);
          });

        });
      });
    },

    // 您自定义的 zoomIn, zoomOut, resetView 方法可以保留，
    // 但如果使用 ArcGIS Zoom widget，它们可能不再需要直接调用，
    // 除非您有特定的自定义交互需求。
    zoomIn() {
      if (this.view) {
        this.view.zoom += 1;
      }
    },

    zoomOut() {
      if (this.view) {
        this.view.zoom -= 1;
      }
    },

    resetView() {
      if (this.view) {
        this.view.center = [111.608, 26.423];
        this.view.zoom = 13;
      }
    }
  },
};
</script>

<style scoped>
#baseMap {
  width: 100%;
  height: 100%;
  position: relative;
}

#mapDiv {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  transition: margin-left 0.3s ease;
}

/* 可以添加一些样式来调整控件位置，如果默认位置不满意 */
/* 例如，如果多个控件在 "top-right"，它们会堆叠，可能需要微调 */
/*
.esri-ui-top-right .esri-widget {
  margin: 10px;
}
*/
</style>
