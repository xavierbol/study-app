<template>
  <tr class="text-red">
    <td>{{ badAnswer.infinitive }}</td>
    <td>{{ badAnswer.past_simple }} - {{ badAnswer.past_simple_2 }}</td>
    <td>{{ badAnswer.past_participle }}</td>
    <td>{{ badAnswer.translation }}</td>
  </tr>
  <tr class="text-green">
    <td>{{ expectedVerb.infinitive }}</td>
    <td>{{ expectedVerb.past_simple }} - {{ expectedVerb.past_simple_2 }}</td>
    <td>{{ expectedVerb.past_participle }}</td>
    <td>{{ expectedVerb.translation }}</td>
  </tr>
</template>

<script lang="ts">
import { IrregularVerb } from "@/store/state";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    badAnswer: { type: Object as PropType<IrregularVerb>, required: true },
    expectedVerb: { type: Object as PropType<IrregularVerb>, required: true },
  },
});
</script>
