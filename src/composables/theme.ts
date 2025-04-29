// composables/useTheme.ts
import { computed, ref } from 'vue';

const themDark = ref(false);
const isDark = computed<boolean>(() => themDark.value);

export function useTheme() {
  function toggleTheme(val: boolean) {
    themDark.value = val;
    document.body.classList.toggle('dark', themDark.value);
    localStorage.setItem('theme', themDark.value ? 'dark' : 'light');
  }

  function setTheme(dark: boolean) {
    themDark.value = dark;
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setTheme(true);
    } else {
      setTheme(false);
    }
  }

  return {
    isDark,
    toggleTheme,
    setTheme,
    initializeTheme,
  };
}
