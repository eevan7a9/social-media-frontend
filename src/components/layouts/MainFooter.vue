<script lang="ts" setup>
import { IconHelp, IconCog } from '@/components/icons';
</script>

<template>
  <footer>
    <div
      class="flex flex-col md:flex-row md:justify-between w-full max-w-screen-lg mx-auto pt-3 lg:pt-6 pb-10 gap-x-3 lg:gap-x-6 items-start"
    >
      <div class="flex gap-x-5 lg:gap-x-8">
        <div class="">
          <img src="/logo.svg" class="max-w-[100px]" />
        </div>
        <ul class="flex flex-col gap-y-2 font-normal text-[14px]">
          <li class="flex items-center gap-x-2">
            <icon-help class="w-[35px] fill-primary" />
            <span>Frequent Questions</span>
          </li>

          <li class="flex items-center gap-x-2">
            <icon-cog class="w-[36px] fill-primary" />
            <span>Account Settings</span>
          </li>
        </ul>
        <ul class="flex flex-col gap-y-2 text-[18px]">
          <li class="text-[18px] font-semibold text-gray-700">Apps</li>
          <li class="text-[16px]">
            <a href="/" class="underline">Anroid App Version</a>
          </li>
          <li class="text-[16px]">
            <a href="/" class="underline">Iphone App Version</a>
          </li>
          <li class="text-[16px]">
            <a href="/" class="underline">Desktop Version</a>
          </li>
        </ul>
      </div>

      <div class="grid grid-cols-2 text-gray-800">
        <ul class="flex flex-col gap-y-1">
          <li class="text-[18px] font-semibold text-gray-700">Pages</li>
          <li class="text-[16px]">Home</li>
          <li class="text-[16px]">Profile</li>
          <li class="text-[16px]">Security</li>
          <li class="text-[16px]">Help</li>
          <li class="text-[16px]">Contact Us</li>
        </ul>

        <ul class="flex flex-col gap-y-1">
          <li class="text-[18px] font-semibold text-gray-700">Legal</li>
          <li class="text-[16px]">
            <a href="/" class="underline"> Privacy & Security </a>
          </li>
          <li class="text-[16px]">
            <a href="/" class="underline"> Terms & Agreement </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="h-[50px] w-full border-t border-gray-300 text-center pt-3">
      <span class="text-[15px] font-bold text-gray-900">Open Source</span>
      <a href="https://github.com/eevan7a9/social-media-frontend" class="underline text-blue-500">
        github.com:social-media-frontend
      </a>
    </div>
  </footer>
</template>
