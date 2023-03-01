<template>
  <section :class="sectionClassNames.join(' ')">
    <h1 class="title">{{ title }}</h1>
    <p v-if="question">{{ question }}</p>
    <div v-if="menu" class="menu flex flex-column justify-evenly items-center">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </section>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  classNames: { type: String, default: "" },
  title: { type: String, default: "Study App" },
  question: String,
  menu: Boolean,
  center: Boolean,
});

const sectionClassNames = [
  "nes-container",
  "with-title",
  ...props.classNames.split(" "),
];

if (props.center) {
  sectionClassNames.push("is-centered");
}
</script>

<style scoped lang="scss">
.nes-container {
  min-height: 100vh;
}
.menu {
  height: calc(100vh - 25vh);
}
</style>
