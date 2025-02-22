import { AlertType } from '@/shared/enums/Alert';
import { ref, readonly } from 'vue';

const message = ref('');
const type = ref(AlertType.Warning);
const isVisible = ref(false);

export function useAlert() {
  const showAlert = (msg: string, alertType: AlertType = AlertType.Warning, duration = 3000) => {
    message.value = msg;
    type.value = alertType;
    isVisible.value = true;

    if (duration) {
      setTimeout(() => {
        isVisible.value = false;
      }, duration);
    }
  };

  return {
    message: readonly(message),
    type: readonly(type),
    isVisible: readonly(isVisible),
    showAlert,
  };
}
