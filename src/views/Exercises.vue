<template>
  <section class="nes-container with-title">
    <router-view></router-view>
  </section>
</template>

<script lang="ts" setup>
import { provide } from "vue";
import { useExercise } from "@/hooks/useExercise";

provide("exercise", useExercise());
</script>
