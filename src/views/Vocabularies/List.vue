<template>
  <h1 class="title">Liste de vocabulaires</h1>
  <Button class="returnBtn" color="primary" @click="returnBack">Retour</Button>
  <div class="nes-table-responsive">
    <table class="nes-table is-bordered">
      <thead>
        <VocabularyHeader />
      </thead>
      <tbody>
        <VocabularyRow
          v-for="vocabulary in $store.state.vocabulary.vocabularies"
          :key="vocabulary.id"
          :vocabulary="vocabulary"
          @click="editVocabulary(vocabulary.id)"
        />
      </tbody>
    </table>
    <Button class="addBtn" color="danger" :to="$route.path + '/nouveau'"
      >+ Ajouter un nouveau mot</Button
    >
  </div>
  <Button color="danger" :to="$route.path + '/nouveau'" float>
    <span>+</span>
  </Button>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/store";

import VocabularyHeader from "@/components/VocabularyHeader.vue";
import VocabularyRow from "@/components/VocabularyRow.vue";
import Button from "@/components/Button.vue";

const $store = useStore();
const $router = useRouter();
const $route = useRoute();

const returnBack = (): void => $router.back();

function editVocabulary(id: number): void {
  $router.push(`${$route.path}/${id}`);
}
</script>

<style lang="scss" scoped>
.returnBtn {
  margin-bottom: 2rem;
}

.addBtn {
  margin-top: 2rem;
}
</style>
