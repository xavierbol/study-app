<template>
  <tr @click="$emits('click')">
    <td>{{ irregularVerb.infinitive }}</td>
    <td>{{ irregularVerb.past_simple }}</td>
    <td>{{ irregularVerb.past_simple2 }}</td>
    <td>{{ irregularVerb.past_participle }}</td>
    <td>{{ irregularVerb.translation }}</td>
  </tr>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType } from "vue";
import { IrregularVerb } from "@/models";

const props = defineProps({
  irregularVerb: {
    type: Object as PropType<IrregularVerb>,
    required: true,
  },
});

const $emits = defineEmits(["click"]);
</script>
