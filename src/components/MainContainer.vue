<template>
  <section
    :class="
      `nes-container is-centered with-title h-screen ${classNames}`.trim()
    "
  >
    <h1 class="title">{{ title }}</h1>
    <p>{{ question }}</p>
    <div class="menu flex flex-column justify-evenly">
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps({
  classNames: String,
  title: { type: String, required: true, default: "Study App" },
  question: { type: String, required: true },
});
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
