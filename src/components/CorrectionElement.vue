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

<script lang="ts" setup>
import { IrregularVerb } from "@/store/state";
import { defineProps, PropType } from "vue";

defineProps({
  badAnswer: { type: Object as PropType<IrregularVerb>, required: true },
  expectedVerb: { type: Object as PropType<IrregularVerb>, required: true },
});
</script>

<style lang="scss" scoped>
.text-green {
  color: green;
}

.text-red {
  color: red;
}
</style>
