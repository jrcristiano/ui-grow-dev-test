import { POSITION, useToast } from "vue-toastification";

const notify = useToast();


export function successNotify(message: string, timeout = 2500) {
  return notify.success(message, {
    position: POSITION.BOTTOM_RIGHT,
    timeout,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: "bi bi-check-circle-fill",
    rtl: false
  });
}

export function errorNotify(message: string, timeout = 2500) {
  return notify.error(message, {
    position: POSITION.BOTTOM_RIGHT,
    timeout,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: "bi bi-check-circle-fill",
    rtl: false
  });
}
