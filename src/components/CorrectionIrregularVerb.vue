<template>
  <tr class="nes-text is-error">
    <td>{{ wrongIrregularVerb.infinitive }}</td>
    <td>
      {{ wrongIrregularVerb.past_simple }} -
      {{ wrongIrregularVerb.past_simple_2 }}
    </td>
    <td>{{ wrongIrregularVerb.past_participle }}</td>
    <td>{{ wrongIrregularVerb.translation }}</td>
  </tr>
  <tr class="nes-text is-success">
    <td>{{ expectedIrregularVerb.infinitive }}</td>
    <td>
      {{ expectedIrregularVerb.past_simple }} -
      {{ expectedIrregularVerb.past_simple_2 }}
    </td>
    <td>{{ expectedIrregularVerb.past_participle }}</td>
    <td>{{ expectedIrregularVerb.translation }}</td>
  </tr>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import { Exercise, IrregularVerb } from "@/models";

const props = defineProps({
  wrongAnswer: { type: Object as PropType<Exercise>, required: true },
  expectedAnswer: { type: Object as PropType<Exercise>, required: true },
});

const wrongIrregularVerb = props.wrongAnswer as IrregularVerb;
const expectedIrregularVerb = props.expectedAnswer as IrregularVerb;
</script>
