<template>
  <MainContainer title="Ajout d'une nouvelle catégorie">
    <form @submit.prevent="submit">
      <div class="row">
        <div class="nes-field w-full">
          <label for="name">Nom</label>
          <input
            class="nes-input"
            v-model.trim="categoryForm.name"
            type="text"
            name="name"
          />
        </div>
      </div>
      <div class="row">
        <div class="nes-field w-full">
          <label for="description">Description</label>
          <input
            class="nes-input"
            v-model.trim="categoryForm.description"
            type="text"
            name="description"
          />
        </div>
      </div>
      <div class="flex justify-around buttons">
        <Button type="submit" color="success">Valider</Button>
        <Button type="button" color="danger" @click="returnBack">
          Retour
        </Button>
      </div>
    </form>
  </MainContainer>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

import { Category } from "@/models";
import { useStore } from "@/store";
import { VocabularyActionTypes } from "@/store/vocabulary/actions";

import MainContainer from "@/components/MainContainer.vue";
import Button from "@/components/Button.vue";

const $router = useRouter();
const $store = useStore();
const categoryForm = reactive<Category>({
  id: -1,
  name: "",
  description: "",
});

function returnBack() {
  $router.back();
}

async function submit() {
  await $store.dispatch(VocabularyActionTypes.createCategory, categoryForm);
  returnBack();
}
</script>
