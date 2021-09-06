<template>
  <div
    class="toast"
    :class="`${show ? 'show' : ''} position_${position} ${colorClass}`.trim()"
  >
    {{ message }}
  </div>
</template>

<script lang="ts" setup>
import { ToastPosition } from "@/store/toast/state";
import { defineProps, PropType } from "vue";

const props = defineProps({
  message: { type: String, required: true },
  show: { type: Boolean, default: false },
  color: {
    type: String as PropType<"success" | "error" | "normal">,
    default: "normal",
  },
  position: { type: String as PropType<ToastPosition>, default: "top-right" },
});

let colorClass = "";
if (props.color === "success") {
  colorClass = "is-success";
} else if (props.color === "error") {
  colorClass = "is-error";
}
</script>

<style lang="scss" scoped>
.is-error {
  color: #fff;
  background-color: #e76e55;
}

.is-success {
  color: #fff;
  background-color: #76c442;
}

.toast {
  visibility: hidden;
  min-width: 250px;
  max-width: 400px;
  margin-left: -125px;
  text-align: left;
  border-radius: 5px;
  padding: 16px;
  position: fixed;
  z-index: 1;

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

.toast.show {
  visibility: visible;
  /* Add animation: Take 0.5 seconds to fade in and out the toast.
  However, delay the fade out process for 2.5 seconds */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;

  &.position_top,
  &.position_top-left,
  &.position_top-right {
    @-webkit-keyframes fadein {
      from {
        bottom: 0;
        opacity: 0;
      }
      to {
        bottom: 30px;
        opacity: 1;
      }
    }

    @keyframes fadein {
      from {
        bottom: 0;
        opacity: 0;
      }
      to {
        bottom: 30px;
        opacity: 1;
      }
    }

    @-webkit-keyframes fadeout {
      from {
        bottom: 30px;
        opacity: 1;
      }
      to {
        bottom: 0;
        opacity: 0;
      }
    }

    @keyframes fadeout {
      from {
        bottom: 30px;
        opacity: 1;
      }
      to {
        bottom: 0;
        opacity: 0;
      }
    }
  }

  &.position_top,
  &.position_top-left,
  &.position_top-right {
    @-webkit-keyframes fadein {
      from {
        top: 0;
        opacity: 0;
      }
      to {
        top: 30px;
        opacity: 1;
      }
    }

    @keyframes fadein {
      from {
        top: 0;
        opacity: 0;
      }
      to {
        top: 30px;
        opacity: 1;
      }
    }

    @-webkit-keyframes fadeout {
      from {
        top: 30px;
        opacity: 1;
      }
      to {
        top: 0;
        opacity: 0;
      }
    }

    @keyframes fadeout {
      from {
        top: 30px;
        opacity: 1;
      }
      to {
        top: 0;
        opacity: 0;
      }
    }
  }
}
</style>
