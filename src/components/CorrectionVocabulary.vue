<template>
  <tr class="nes-text is-error">
    <td>{{ wrongVocabulary.word }}</td>
    <td>{{ wrongVocabulary.translation }}</td>
  </tr>
  <tr class="nes-text is-success">
    <td>{{ expectedVocabulary.word }}</td>
    <td>{{ expectedVocabulary.translation }}</td>
  </tr>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import { Exercise, Vocabulary } from "@/models";

const props = defineProps({
  wrongAnswer: { type: Object as PropType<Exercise>, required: true },
  expectedAnswer: { type: Object as PropType<Exercise>, required: true },
});

const wrongVocabulary = props.wrongAnswer as Vocabulary;
const expectedVocabulary = props.expectedAnswer as Vocabulary;
</script>
