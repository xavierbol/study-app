export type ToastPosition =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right";

export interface ToastState {
  message: string;
  show: boolean;
  position: ToastPosition;
}

export const state: ToastState = {
  message: "",
  show: false,
  position: "top-right",
};
