<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';
import L from 'leaflet';

const myCoord = defineModel<{ lat: number; lng: number } | undefined>({
  default: () => ({ lat: 13, lng: 122 }),
});
const props = defineProps<{
  pickerMode?: boolean;
  label?: string;
  zoom?: number;
}>();

const mapContainer = ref<HTMLElement | null>(null);
let map: L.Map | null = null;
let marker: L.Marker;
const latlng = computed<[number, number]>(() => {
  return myCoord.value ? [myCoord.value.lat, myCoord.value.lng] : [14, 121.2];
});
watch(myCoord, (newVal) => {
  console.log('Location coord changed:', newVal);
  if (map && newVal) {
    const latlng = L.latLng(newVal.lat, newVal.lng);

    if (marker) {
      marker.setLatLng(latlng).bindPopup('Updated location').openPopup();
    } else {
      marker = L.marker(latlng).addTo(map).bindPopup('Placed here').openPopup();
    }

    map.panTo(latlng);
  }
});

onMounted(() => {
  if (!mapContainer.value) return;

  map = L.map(mapContainer.value, {
    scrollWheelZoom: props.pickerMode,
  }).setView(latlng.value, props.zoom || 8);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  if (myCoord.value) {
    marker = L.marker(latlng.value)
      .addTo(map)
      .bindPopup(props.label || "I'm Here")
      .openPopup();
  } else {
    // Initialize marker without adding to map yet
    marker = L.marker([0, 0]);
  }

  if (props.pickerMode) {
    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      if (marker) {
        marker.setLatLng([lat, lng]).addTo(map!).bindPopup('Moved here').openPopup();
      } else {
        marker = L.marker([lat, lng]).addTo(map!).bindPopup('Placed here').openPopup();
      }

      myCoord.value = { lat, lng };
    });
  } else {
    map.dragging.disable();
  }
});

onBeforeUnmount(() => {
  if (map) {
    map.remove();
  }
});
</script>

<template>
  <div ref="mapContainer" class="w-full h-full shadow"></div>
</template>
