<template>
  <MainContainer :title="title">
    <form @submit.prevent="submit">
      <div v-if="categoryId === 'liste'" class="row">
        <div class="nes-field w-full">
          <label for="category">Catégorie</label>
          <div class="nes-select">
            <select id="category" v-model="vocabularyForm.category_id">
              <option value="" disabled selected hidden>
                Sélectionner une catégorie...
              </option>
              <option
                v-for="category in $store.state.vocabulary.categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="nes-field w-full">
          <label for="word">Mot en {{ language }}</label>
          <input
            class="nes-input"
            v-model.trim="vocabularyForm.word"
            type="text"
            name="word"
          />
        </div>
      </div>

      <div class="row">
        <div class="nes-field w-full">
          <label for="translation">Traduction</label>
          <input
            class="nes-input"
            v-model.trim="vocabularyForm.translation"
            type="text"
            name="translation"
          />
        </div>
      </div>
      <div class="flex justify-around buttons">
        <Button type="submit" color="success">Valider</Button>
        <Button
          v-if="!editMode"
          type="button"
          color="primary"
          @click="submitAndContinue"
        >
          Ajouter
        </Button>
        <Button type="button" color="danger" @click="returnBack">
          Annuler
        </Button>
      </div>
    </form>
  </MainContainer>
</template>

<script setup lang="ts">
import { Vocabulary } from "@/models";
import { VocabularyActionTypes } from "@/store/vocabulary/actions";
import { VocabulariesGetterTypes } from "@/store/vocabulary/getters";
import { computed, ComputedRef, reactive } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/store";

import MainContainer from "@/components/MainContainer.vue";
import Button from "@/components/Button.vue";

const $store = useStore();
const $router = useRouter();
const $route = useRoute();

const language = $store.getters.getLang;
const vocabulary: ComputedRef<Vocabulary> = computed(
  () =>
    $store.getters[VocabulariesGetterTypes.getVocabulary](
      Number($route.params.id as string)
    ) as Vocabulary
);
const categoryId = $route.params.category_id as number | "liste";
const vocabularyForm = reactive<Vocabulary>({
  id: -1,
  word: "",
  translation: "",
  category_id: categoryId && categoryId !== "liste" ? categoryId : "",
});
let editMode = false;
let title = "Ajout d'un nouveau mot de vocabulaire";
if (vocabulary.value) {
  title = "Edition";
  editMode = true;
  vocabularyForm.id = vocabulary.value.id;
  vocabularyForm.word = vocabulary.value.word;
  vocabularyForm.translation = vocabulary.value.translation;
}

function returnBack() {
  $router.back();
}

async function submitAndContinue(resetForm = true) {
  if (editMode) {
    const vals: Partial<Vocabulary> & { id: number } = {
      id: vocabulary.value.id,
    };
    if (vocabularyForm.word !== vocabulary.value.word) {
      vals.word = vocabularyForm.word;
    }
    if (vocabularyForm.translation !== vocabulary.value.translation) {
      vals.translation = vocabularyForm.translation;
    }

    await $store.dispatch(VocabularyActionTypes.updateVocabulary, vals);
  } else {
    await $store.dispatch(
      VocabularyActionTypes.createVocabulary,
      vocabularyForm
    );
  }
  if (resetForm) {
    Object.assign(vocabularyForm, {
      word: "",
      translation: "",
    });
    (document.querySelector("input[name='word']") as HTMLInputElement).focus();
  }
}

async function submit() {
  await submitAndContinue(false);
  returnBack();
}
</script>

<style lang="scss" scoped>
.buttons {
  margin-top: 2rem;
}
</style>
