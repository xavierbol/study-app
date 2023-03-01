<template>
  <MainContainer title="Liste de vocabulaires">
    <div class="buttons flex justify-between">
      <Button class="returnBtn" color="primary" @click="() => $router.back()">
        Retour
      </Button>
      <Button color="danger" :to="`${$route.path}/nouveau`">+ Ajouter</Button>
    </div>
    <div class="nes-table-responsive">
      <table class="nes-table is-bordered">
        <thead>
          <VocabularyHeader />
        </thead>
        <tbody>
          <VocabularyRow
            v-for="vocabulary in vocabularyEntries"
            :key="vocabulary.id"
            :vocabulary="vocabulary"
            @click="$router.push(`${$route.path}/${vocabulary.id}`)"
          />
        </tbody>
      </table>
      <Button class="mt-2" color="danger" :to="`${$route.path}/nouveau`">
        + Ajouter
      </Button>
    </div>
    <Button color="danger" :to="`${$route.path}/nouveau`" float>
      <span>+</span>
    </Button>
  </MainContainer>
</template>

<script setup lang="ts">
import { useStore } from "@/store";

import MainContainer from "@/components/MainContainer.vue";
import VocabularyHeader from "@/components/VocabularyHeader.vue";
import VocabularyRow from "@/components/VocabularyRow.vue";
import Button from "@/components/Button.vue";
import { Category } from "@/models";
import { VocabulariesGetterTypes } from "@/store/vocabulary/getters";

const $store = useStore();
const categoryEntries: Record<number, Category> =
  $store.getters[VocabulariesGetterTypes.getCategoryEntries];
const vocabularyEntries = $store.state.vocabulary.vocabularies.map((voc) => ({
  ...voc,
  category: categoryEntries[voc.category_id as number],
}));
</script>

<style lang="scss" scoped>
.buttons {
  margin-bottom: 2rem;
}
</style>
