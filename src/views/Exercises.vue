<template>
  <MainLayout />
</template>

<script lang="ts" setup>
import { provide } from "vue";
import { useExercise } from "@/hooks/useExercise";
import MainLayout from "@/views/MainLayout.vue";

provide("exercise", useExercise());
</script>
