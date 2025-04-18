<script lang="ts" setup>
import { ref } from 'vue';
import { ButtonDefault } from '@/components/common/buttons';
import { IconEmoji, IconImage, IconMapPin, IconLink } from '../icons';
import { useFeedsStore } from '@/stores/feeds';
import type { Post } from '@/shared/types/Post';
import { createFeed } from '@/shared/services/feedService';
import { useAuthStore } from '@/stores/auth';
import { useAlert } from '@/composables/alert';
import { AlertType } from '@/shared/enums/Alert';
import FeedUploadDialog from './dialogs/FeedUploadDialog.vue';
import EmojiPicker from '../common/popups/EmojiPicker.vue';
import LeafletMap from '../common/maps/LeafletMap.vue';
import MapLocationPicker from '../common/dialogs/MapLocationPicker.vue';

const feedsStore = useFeedsStore();
const authStore = useAuthStore();
const alert = useAlert();

const myContent = ref('');
const imagePreviewUrl = ref('');
const linkUrl = ref('');
const myCoord = ref<{ lat: number; lng: number } | null>();

// error
const noContentError = ref(false);

// Dialogs
const showUploadDialog = ref(false);
const showLocationPicker = ref(false);

function embedLink() {
  if (!linkUrl.value) {
    linkUrl.value = 'http://';
  } else {
    linkUrl.value = '';
  }
}

function selectImage() {
  showUploadDialog.value = true;
  myCoord.value = null;
}

function selectLocation() {
  if (!myCoord.value) {
    showLocationPicker.value = true;
    imagePreviewUrl.value = '';
  } else {
    myCoord.value = null;
  }
}
async function submit() {
  if (!authStore.authUser?.token || !myContent.value) {
    alert.showAlert('Oops! Looks like your post is missing some content. 📄', AlertType.Danger, 3000);
    noContentError.value = true;
    return;
  }
  const res = await createFeed(
    {
      content: myContent.value,
      imageUrl: imagePreviewUrl.value,
      linkUrl: linkUrl.value,
      latlng: myCoord.value ? [myCoord.value?.lat, myCoord.value?.lng] : undefined,
    },
    authStore.authUser?.token,
  );
  feedsStore.addPost(res as Post);

  alert.showAlert('Post published! Time to get the conversation started. 💬', AlertType.Success, 3000);

  myContent.value = '';
  linkUrl.value = '';
  imagePreviewUrl.value = '';
  myCoord.value = null;
  noContentError.value = false;
}
</script>
<template>
  <form @submit.prevent="submit()">
    <textarea
      v-model="myContent"
      rows="2"
      class="bg-slate-100 w-full rounded-md py-2 px-3 resize-none placeholder:text-[14px]"
      :class="noContentError ? 'border border-danger' : ''"
      placeholder="What is on your mind?"
      maxlength="140"
      @keydown="noContentError = !myContent.length"
    ></textarea>

    <div class="bg-slate-100 flex justify-center">
      <img
        v-if="imagePreviewUrl"
        :src="imagePreviewUrl"
        alt="Preview"
        class="block h-auto w-full max-w-[300px]"
      />
    </div>

    <div class="h-[300px] bg-slate-400 overflow-hidden rounded-lg" v-if="myCoord">
      <LeafletMap v-model="myCoord" class="w-full h-full z-10" />
    </div>

    <div class="mt-2">
      <input
        type="text"
        placeholder="https://evanmarc.com"
        class="w-full p-2 bg-slate-100 text-blue-600 rounded-md"
        v-model="linkUrl"
        v-if="linkUrl"
      />
    </div>

    <div class="flex justify-between items-center pt-2">
      <div class="flex items-center gap-x-2">
        <button @click="selectImage()" type="button" class="flex items-center gap-1 group p-1 cursor-pointer">
          <IconImage
            class="lg:group-hover:scale-150 transition-all duration-300 ease-in-out bg-slate-500/10 rounded-full p-1 h-[30px] w-[30px] fill-primary/70 hover:fill-primary"
          />
          <small class="hidden lg:block text-[12px] text-gray-600 capitalize mr-2">upload</small>
        </button>

        <FeedUploadDialog
          @set-image="(e) => (imagePreviewUrl = e)"
          @close="showUploadDialog = false"
          v-if="showUploadDialog"
        />

        <EmojiPicker @select="(emoji) => (myContent = myContent + emoji)">
          <template #button="emojiPickerScope">
            <button
              type="button"
              @click="emojiPickerScope.togglePopup()"
              class="flex items-center gap-1 group p-1 cursor-pointer"
            >
              <IconEmoji
                class="lg:group-hover:scale-150 transition-all duration-300 ease-in-out rounded-full bg-warning/15 p-1 h-[30px] w-[30px] fill-warning/70 hover:fill-warning"
              />
              <small class="hidden lg:block text-[12px] text-gray-600 capitalize mr-2">Feelings</small>
            </button>
          </template>
        </EmojiPicker>

        <button type="button" @click="embedLink()" class="flex items-center gap-1 group p-1 cursor-pointer">
          <IconLink
            class="lg:group-hover:scale-150 transition-all duration-300 ease-in-out rounded-full bg-secondary/10 p-1 h-[30px] w-[30px] fill-secondary/70 hover:fill-secondary"
          />
          <small class="hidden lg:block text-[12px] text-gray-600 capitalize mr-2">Link</small>
        </button>

        <button
          type="button"
          @click="selectLocation()"
          class="flex items-center gap-1 group p-1 cursor-pointer"
        >
          <IconMapPin
            class="lg:group-hover:scale-150 transition-all duration-300 ease-in-out rounded-full p-1 h-[30px] w-[30px] fill-success/70 hover:fill-success bg-green-400/20"
          />
          <small class="hidden lg:block text-[12px] text-gray-600 capitalize mr-2">location</small>
        </button>

        <MapLocationPicker
          @set-coord="(e) => (myCoord = e)"
          @close="showLocationPicker = false"
          v-if="showLocationPicker"
        />
      </div>

      <ButtonDefault type="submit" class="!rounded-full px-5 lg:px-6 py-1">
        <span class="text-[15px] font-light">Post</span>
      </ButtonDefault>
    </div>
  </form>
</template>
