import { readonly, ref } from 'vue';

const isPageLoading = ref(false);

export default function useLoading() {
  function show(duration = 1000) {
    isPageLoading.value = true;

    if (duration) {
      setTimeout(() => {
        isPageLoading.value = false;
      }, duration);
    }
  }

  function hide() {
    isPageLoading.value = false;
  }

  return {
    show,
    hide,
    isPageLoading: readonly(isPageLoading),
  };
}
