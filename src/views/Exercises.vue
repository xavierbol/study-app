<template>
  <Parent />
</template>

<script lang="ts" setup>
import { provide } from "vue";
import { useExercise } from "@/hooks/useExercise";
import Parent from "@/views/Parent.vue";

provide("exercise", useExercise());
</script>
