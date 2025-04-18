<script lang="ts" setup>
import { ButtonDefault } from '@/components/common/buttons';
import LeafletMap from '../maps/LeafletMap.vue';
import { getCurrentLocation } from '@/shared/utils/geolocation';

const emits = defineEmits<{ setCoord: [corrd: { lat: number; lng: number }]; close: [] }>();
const coord = defineModel<{ lat: number; lng: number } | null>({
  default: () => null,
});

async function getUserLocation() {
  const myCorrd = await getCurrentLocation();
  console.log(coord);
  coord.value = myCorrd;
}

function setCorrd(): void {
  console.log('set Coord...');
  if (coord.value) {
    emits('setCoord', coord.value);
  }
  emits('close');
}
</script>

<template>
  <div
    @click.stop="emits('close')"
    class="z-50 bg-dark/30 w-screen h-screen fixed top-0 left-0 flex justify-center items-center"
  >
    <article @click.stop class="bg-light dark:bg-dark pt-4 px-3 md:px-5 rounded-xl w-full max-w-[900px]">
      <h1>Click to pin the Marker.</h1>

      <div
        class="relative mt-3 h-[350px] w-full bg-slate-200 flex justify-center flex-col items-center rounded-lg"
      >
        <!--  -->
        <button
          @click="getUserLocation()"
          type="button"
          class="z-20 border border-primary cursor-pointer absolute right-2 top-2 text-dark bg-light/50 hover:bg-light px-4 py-2 shadow font-bold rounded-full"
        >
          Find Me
        </button>
        <LeafletMap picker-mode class="w-full h-full z-10" v-model="coord" :zoom="13" />
      </div>

      <div class="py-3 lg:py-4 flex justify-center">
        <ButtonDefault
          :disabled="!coord"
          :class="!coord ? '!cursor-not-allowed' : ''"
          @click="setCorrd()"
          class="px-5 md:px-7 py-2 lg:py-3 lg:px-24 rounded-lg md:text-[20px]"
        >
          Confirm
        </ButtonDefault>
      </div>
    </article>
  </div>
</template>
