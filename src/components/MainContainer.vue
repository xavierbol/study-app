<template>
  <section :class="sectionClassNames.trim()">
    <h1 class="title">{{ title }}</h1>
    <p v-if="question">{{ question }}</p>
    <div v-if="menu" class="menu flex flex-column justify-evenly">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </section>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  classNames: String,
  title: { type: String, default: "Study App" },
  question: String,
  menu: Boolean,
  center: Boolean,
});

let sectionClassNames = `nes-container ${
  props.center ? "is-centered" : ""
} with-title h-screen ${props.classNames}`;
</script>

<style scoped>
.nes-container.h-screen {
  margin-bottom: 0;
  padding-bottom: 0;
}

.menu {
  margin-top: 5rem;
  height: 75%;
}
</style>
