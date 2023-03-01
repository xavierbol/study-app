<template>
  <Row :editable="true" @click="$emits('click')">
    <td>{{ irregularVerb.infinitive }}</td>
    <td>{{ irregularVerb.past_simple }}</td>
    <td>{{ irregularVerb.past_simple2 }}</td>
    <td>{{ irregularVerb.past_participle }}</td>
    <td>{{ irregularVerb.translation }}</td>
    <td>
      <Button color="primary">Edit</Button>
    </td>
  </Row>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType } from "vue";
import { IrregularVerb } from "@/models";

import Row from "./Row.vue";
import Button from "./Button.vue";

defineProps({
  irregularVerb: {
    type: Object as PropType<IrregularVerb>,
    required: true,
  },
});

const $emits = defineEmits(["click"]);
</script>
