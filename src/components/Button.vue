<template>
  <router-link v-if="to && !disabled" :class="btnClass" :to="to">
    <slot></slot>
  </router-link>
  <button v-else :class="btnClass" :name="name" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
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
        ["primary", "success", "warning", "danger"].indexOf(value) !== -1,
    },
    to: String,
  },
  setup(props) {
    const btnClass = computed(() => {
      let className = "";

      if (props.disabled) {
        className = "is-disabled";
      } else {
        switch (props.color) {
          case "primary":
            className = "is-primary";
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
    return { btnClass };
  },
});
</script>
