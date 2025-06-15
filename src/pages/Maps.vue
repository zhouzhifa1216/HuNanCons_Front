<template>
  <div class="maps-container">

    <div class="map-container">
      <BaseMap @updatePosition="handlePositionUpdate"></BaseMap>
      <div class="map-info">
        <div class="coordinates">
          <span>经度: {{ currentPosition.lng.toFixed(3) }}</span>
          <span>纬度: {{ currentPosition.lat.toFixed(3) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseMap from './BaseMap.vue'


export default {
  components: {
    BaseMap
  },
  data() {
    return {
      currentPosition: {
        lat: 111.608,
        lng: 26.423
      },
    };
  },
  mounted() {

  },
  methods: {
    // 处理子组件传递的经纬度
    handlePositionUpdate(newPosition) {
      this.currentPosition = newPosition;
    },
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
  background: rgba(255, 255, 255, 0.6); /* 你可以调整这里的透明度，例如 0.8 */
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.coordinates {
  display: flex;
  /* flex-direction: column; */ /* 移除或注释掉这一行 */
  flex-direction: row; /* 或者明确设置为 row */
  gap: 15px; /* 调整经纬度之间的间距 */
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
    gap: 5px;
  }
}
</style>
