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
import { useRoute } from "vue-router";
import { Language } from "@/models";
import { useLang } from "@/hooks/useLang";

const $route = useRoute();
const language = useLang($route.params.lang as Language);
</script>
