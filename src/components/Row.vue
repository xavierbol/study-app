<template>
  <tr :class="classNames" title="Editer">
    <slot></slot>
  </tr>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  class: { type: String, default: "" },
  editable: { type: Boolean, default: false },
});
const classNames = props.class.split(" ");

if (props.editable) {
  classNames.push("editable");
}
</script>

<style lang="scss">
tr {
  &:hover {
    background-color: lightgray;
  }

  &.editable {
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer;
  }
}
</style>
