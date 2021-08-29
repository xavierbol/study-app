<template>
  <router-link v-if="to && !disabled" :class="btnClass" :to="to">
    <slot></slot>
  </router-link>
  <button v-else :class="btnClass" :name="name" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";

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
    type: String,
    validator: (value: string) =>
      ["primary", "secondary", "success", "warning", "danger"].indexOf(
        value
      ) !== -1,
  },
  to: String,
});

const btnClass = computed(() => {
  let className = "";

  if (props.disabled) {
    className = "is-disabled";
  } else {
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
  }

  return `nes-btn ${className}`.trimEnd();
});
</script>
