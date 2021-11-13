<template>
  <tr @click="$emits('click')">
    <td>{{ vocabulary.word }}</td>
    <td>{{ vocabulary.translation }}</td>
    <td
      v-if="$route.params.category_id && $route.params.category_id === 'liste'"
    >
      {{ categoryName }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { Category, Vocabulary } from "@/models";
import { PropType } from "@vue/runtime-core";
import { useStore } from "@/store";
import { VocabulariesGetterTypes } from "@/store/vocabulary/getters";

const props = defineProps({
  vocabulary: {
    type: Object as PropType<Vocabulary & { category?: Category }>,
    required: true,
  },
});

const categoryName =
  (
    props.vocabulary.category ??
    useStore().getters[VocabulariesGetterTypes.getCategory](
      props.vocabulary.category_id as number
    )
  )?.name || "";

const $emits = defineEmits(["click"]);
</script>
