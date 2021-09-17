<template>
  <VocabularyRow class="nes-text is-error" :vocabulary="wrongVocabulary" />
  <VocabularyRow class="nes-text is-success" :vocabulary="expectedVocabulary" />
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import { Exercise, Vocabulary } from "@/models";

import VocabularyRow from "./VocabularyRow.vue";

const props = defineProps({
  wrongAnswer: { type: Object as PropType<Exercise>, required: true },
  expectedAnswer: { type: Object as PropType<Exercise>, required: true },
});

const wrongVocabulary = props.wrongAnswer as Vocabulary;
const expectedVocabulary = props.expectedAnswer as Vocabulary;
</script>
