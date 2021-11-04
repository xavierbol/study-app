<template>
  <tr>
    <th>Mot en {{ language }}</th>
    <th>Traduction</th>
    <th
      v-if="$route.params.category_id && $route.params.category_id === 'liste'"
    >
      Catégorie
    </th>
  </tr>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";

const $store = useStore();
const language = $store.getters.getLang;
</script>
