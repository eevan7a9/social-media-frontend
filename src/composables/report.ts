import { AlertType } from '@/shared/enums/Alert';
import { useAlert } from './alert';

const alert = useAlert();

export const useReport = function () {
  function user(id: string): void {
    console.log(id);
    alert.showAlert(
      'Thank you for your report. We’ll review this user’s activity soon.',
      AlertType.Info,
      7000,
    );
  }

  function post(id: string): void {
    console.log(id);
    alert.showAlert(
      'Thank you for reporting this post. We’ll review it as soon as possible.',
      AlertType.Info,
      7000,
    );
  }

  function comment(id: string): void {
    console.log(id);
    alert.showAlert(
      'Report submitted! We appreciate your help in maintaining a safe environment.',
      AlertType.Info,
      7000,
    );
  }

  return {
    user,
    post,
    comment,
  };
};
