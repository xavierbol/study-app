<template>
  <tr @click="$emits('click')">
    <td>{{ vocabulary.word }}</td>
    <td>{{ vocabulary.translation }}</td>
  </tr>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { Vocabulary } from "@/models";
import { PropType } from "@vue/runtime-core";

defineProps({
  vocabulary: { type: Object as PropType<Vocabulary>, required: true },
});

const $emits = defineEmits(["click"]);
</script>
