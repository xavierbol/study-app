<template>
  <CorrectionIrregularVerb
    v-if="isIrregularVerb"
    :wrong-answer="badAnswer"
    :expected-answer="expectedAnswer"
  />
  <CorrectionVocabulary
    v-else
    :wrong-answer="badAnswer"
    :expected-answer="expectedAnswer"
  />
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import { Exercise } from "@/models";
import CorrectionVocabulary from "./CorrectionVocabulary.vue";
import CorrectionIrregularVerb from "./CorrectionIrregularVerb.vue";

defineProps({
  badAnswer: { type: Object as PropType<Exercise>, required: true },
  expectedAnswer: { type: Object as PropType<Exercise>, required: true },
  isIrregularVerb: { type: Boolean, default: false },
});
</script>
