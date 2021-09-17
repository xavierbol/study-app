<template>
  <tr>
    <th>Mot en {{ language }}</th>
    <th>Traduction</th>
  </tr>
</template>

<script lang="ts" setup>
import { Language, useLang } from "@/hooks/useLang";
import { useRoute } from "vue-router";

const $route = useRoute();
const language = useLang($route.params.lang as Language);
</script>
