<template>
  <router-link v-if="to && !disabled" :class="btnClass" :to="to">
    <slot></slot>
  </router-link>
  <button
    v-else
    :class="btnClass"
    :name="name"
    :disabled="disabled"
    @click="$emits('click')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { ToastPosition as Position } from "@/store/toast/state";
import { computed, defineEmits, defineProps, PropType } from "vue";

const $emits = defineEmits(["click"]);

const props = defineProps({
  name: {
    type: String,
    default: "btn",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String as PropType<
      "primary" | "secondary" | "success" | "warning" | "danger"
    >,
    validator: (value: string) =>
      ["primary", "secondary", "success", "warning", "danger"].indexOf(
        value
      ) !== -1,
  },
  to: String,
  float: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String as PropType<Position>,
    default: "bottom-right",
  },
});

const btnClass = computed(() => {
  let className = "";

  switch (props.color) {
    case "primary":
      className = "is-primary";
      break;
    case "secondary":
      className = "is-secondary";
      break;
    case "success":
      className = "is-success";
      break;
    case "warning":
      className = "is-warning";
      break;
    case "danger":
      className = "is-error";
      break;
    default:
      className = "";
  }

  if (props.disabled) {
    className += " is-disabled";
  }

  if (props.float) {
    className += ` float-btn position_${props.position}`;
  }

  return `nes-btn ${className} `.trimEnd();
});
</script>

<style lang="scss" scoped>
.float-btn {
  position: fixed;
  box-shadow: 0 5px 20px rgb(0 0 0 / 60%);
  transition: all 0.3s ease;

  &.position_top {
    left: 50%;
    top: 30px;
  }

  &.position_top-left {
    left: 30px;
    top: 30px;
  }

  &.position_top-right {
    right: 30px;
    top: 30px;
  }

  &.position_bottom {
    left: 50%;
    bottom: 30px;
  }

  &.position_bottom-left {
    left: 30px;
    bottom: 30px;
  }

  &.position_bottom-right {
    right: 30px;
    bottom: 30px;
  }
}
</style>
