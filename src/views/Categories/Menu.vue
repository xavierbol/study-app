<template>
  <MainContainer
    title="Catégories"
    question="Sélectionnez une catégorie."
    :menu="true"
    :center="true"
  >
    <Button v-if="!isExercisePage" :to="`${$route.path}/liste`">
      Toutes les catégories
    </Button>
    <Button
      v-for="category in categories"
      :key="category.id"
      :to="`${$route.path}/${category.id}`"
    >
      {{ category.name }}
    </Button>
    <Button
      v-if="!isExercisePage"
      color="danger"
      :to="`${$route.path}/nouveau`"
    >
      Créer
    </Button>
    <Button color="primary" @click="() => $router.back()">Retour</Button>
    <Button
      v-if="!isExercisePage"
      color="danger"
      :to="`${$route.path}/nouveau`"
      float
    >
      <span>+</span>
    </Button>
  </MainContainer>
  <Toast
    :show="toast.show"
    :message="toast.message"
    :position="toast.position"
    color="error"
  />
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import { useRoute } from "vue-router";

import Button from "@/components/Button.vue";
import MainContainer from "@/components/MainContainer.vue";
import Toast from "@/components/Toast.vue";
import { computed } from "@vue/reactivity";

const $store = useStore();
const $route = useRoute();
const isExercisePage = $route.name === "CategoriesExercise";
const categories = $store.state.vocabulary.categories;
const toast = computed(() => {
  return $store.state.toast;
});
</script>
