<script setup lang="ts">
import type { Story } from '@/shared/types/Stories';
import { IconAngry, IconCheckCircle, IconFire, IconHeart, IconLaugh, IconSmile } from '../icons';
import { StoryReaction } from '@/shared/enums/Story';
import { useStoriesStore } from '@/stores/stories';
import { useAlert } from '@/composables/alert';
import { AlertType } from '@/shared/enums/Alert';

const storiesStore = useStoriesStore();
const alert = useAlert();

const props = defineProps<{ story: Story }>();

function setReaction(reaction: StoryReaction): void {
  let message = '';
  if (props.story.myReaction !== reaction) {
    if (reaction === StoryReaction.Heart) {
      message = 'You sent some love! ❤️';
    } else if (reaction === StoryReaction.Smile) {
      message = 'You smiled at this story! 😊';
    } else if (reaction === StoryReaction.Laugh) {
      message = 'You had a good laugh! 😂';
    } else if (reaction === StoryReaction.Angry) {
      message = 'You reacted with anger. 😡';
    } else if (reaction === StoryReaction.Fire) {
      message = 'You dropped a 🔥—this story’s heating up!';
    }
    alert.showAlert(message, AlertType.Default);
  }

  storiesStore.setStoryReaction(props.story.id, reaction);
}
</script>

<template>
  <ul class="flex flex-col items-center justify-center gap-2">
    <li>
      <button class="relative group py-1 cursor-pointer" @click="setReaction(StoryReaction.Heart)">
        <IconCheckCircle
          :class="props.story.myReaction === StoryReaction.Heart ? 'fill-success ' : 'hidden'"
          class="z-10 size-[20px] rounded-full absolute bottom-1 right-0 border border-white"
        />

        <div
          :class="props.story.myReaction === StoryReaction.Heart ? 'text-blue-600 font-medium' : 'text-dark'"
          class="text-center z-10 absolute px-2 bottom-0 -left-[3px] text-[12px] bg-white/70 rounded-full"
        >
          {{ props.story.reactions?.heart || 0 }}
        </div>

        <IconHeart class="w-[50px] fill-red-500 group-hover:fill-red-400" />
      </button>
    </li>
    <div class="w-[60%] h-[2px] bg-dark/10"></div>
    <li>
      <button class="relative group py-1 cursor-pointer" @click="setReaction(StoryReaction.Smile)">
        <IconCheckCircle
          :class="props.story.myReaction === StoryReaction.Smile ? 'fill-success ' : 'hidden'"
          class="z-10 size-[20px] rounded-full absolute bottom-1 right-0 border border-white"
        />

        <div
          :class="props.story.myReaction === StoryReaction.Smile ? 'text-blue-600 font-medium' : 'text-dark'"
          class="text-center z-10 absolute px-2 bottom-0 -left-[8px] text-[12px] bg-white/70 rounded-full"
        >
          {{ props.story.reactions?.smile || 0 }}
        </div>

        <IconSmile class="w-[50px] fill-yellow-400 group-hover:fill-yellow-500" />
      </button>
    </li>
    <div class="w-[60%] h-[2px] bg-dark/10"></div>
    <li>
      <button class="relative group py-1 cursor-pointer" @click="setReaction(StoryReaction.Laugh)">
        <IconCheckCircle
          :class="props.story.myReaction === StoryReaction.Laugh ? 'fill-success ' : 'hidden'"
          class="z-10 size-[20px] rounded-full absolute bottom-1 right-0 border border-white"
        />

        <div
          :class="props.story.myReaction === StoryReaction.Laugh ? 'text-blue-600 font-medium' : 'text-dark'"
          class="text-center z-10 absolute px-2 bottom-0 -left-[8px] text-[12px] bg-white/70 rounded-full"
        >
          {{ props.story.reactions?.laugh || 0 }}
        </div>

        <IconLaugh class="w-[50px] fill-sky-500 group-hover:fill-sky-400" />
      </button>
    </li>
    <div class="w-[60%] h-[2px] bg-dark/10"></div>
    <li>
      <button class="relative group py-1 cursor-pointer" @click="setReaction(StoryReaction.Angry)">
        <IconCheckCircle
          :class="props.story.myReaction === StoryReaction.Angry ? 'fill-success ' : 'hidden'"
          class="z-10 size-[20px] rounded-full absolute bottom-1 right-0 border border-white"
        />

        <div
          :class="props.story.myReaction === StoryReaction.Angry ? 'text-blue-600 font-medium' : 'text-dark'"
          class="text-center z-10 absolute px-2 bottom-0 -left-[8px] text-[12px] bg-white/70 rounded-full"
        >
          {{ props.story.reactions?.angry || 0 }}
        </div>

        <IconAngry class="w-[50px] fill-orange-600 group-hover:fill-orange-500" />
      </button>
    </li>
    <div class="w-[60%] h-[2px] bg-dark/10"></div>
    <li>
      <button class="relative group py-1 cursor-pointer" @click="setReaction(StoryReaction.Fire)">
        <IconCheckCircle
          :class="props.story.myReaction === StoryReaction.Fire ? 'fill-success ' : 'hidden'"
          class="z-10 size-[20px] rounded-full absolute bottom-1 right-0 border border-white"
        />

        <div
          :class="props.story.myReaction === StoryReaction.Fire ? 'text-blue-600 font-medium' : 'text-dark'"
          class="text-center z-10 absolute px-2 bottom-0 text-[12px] bg-white/70 rounded-full"
        >
          {{ props.story.reactions?.fire || 0 }}
        </div>

        <IconFire class="w-[60px] fill-orange-500 group-hover:fill-red-400" />
      </button>
    </li>
  </ul>
</template>
