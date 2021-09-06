<template>
  <CorrectionVocabulary
    v-if="type === 'Vocabulary'"
    :wrong-answer="badAnswer"
    :expected-answer="expectedAnswer"
  />
  <CorrectionIrregularVerb
    v-else
    :wrong-answer="badAnswer"
    :expected-answer="expectedAnswer"
  />
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import { Exercise, IrregularVerb, isIrregularVerb, Vocabulary } from "@/models";
import CorrectionVocabulary from "./CorrectionVocabulary.vue";
import CorrectionIrregularVerb from "./CorrectionIrregularVerb.vue";

const props = defineProps({
  badAnswer: { type: Object as PropType<Exercise>, required: true },
  expectedAnswer: { type: Object as PropType<Exercise>, required: true },
});

const type: "Irregular Verb" | "Vocabulary" =
  isIrregularVerb(props.badAnswer) && isIrregularVerb(props.expectedAnswer)
    ? "Irregular Verb"
    : "Vocabulary";
</script>
