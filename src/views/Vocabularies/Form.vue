<template>
  <h1 class="title">
    {{ editMode ? "Edition" : "Ajout d'un nouveau mot de vocabulaire" }}
  </h1>
  <form @submit.prevent="submit">
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
        >Ajout</Button
      >
      <Button type="button" color="danger" @click="returnBack">Retour</Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Language, useLang } from "@/hooks/useLang";
import { Vocabulary } from "@/models";
import { VocabularyActionTypes } from "@/store/vocabulary/actions";
import { VocabulariesGetterTypes } from "@/store/vocabulary/getters";
import { computed, ComputedRef, reactive } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import Button from "@/components/Button.vue";

const $store = useStore();
const $router = useRouter();
const $route = useRoute();

const language = useLang($route.params.lang as Language);
const vocabulary: ComputedRef<Vocabulary> = computed(() =>
  $route.params.id
    ? $store.getters[VocabulariesGetterTypes.getVocabulary]($route.params.id)
    : null
);
const vocabularyForm = reactive<Vocabulary>({
  id: -1,
  word: "",
  translation: "",
});
let editMode = false;
if (vocabulary.value) {
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
    const vals: Partial<Vocabulary> = { id: vocabulary.value.id };
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
