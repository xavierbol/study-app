<template>
  <MainContainer
    title="Study App"
    :question="`Que souhaitez-vous faire en ${language} ?`"
    :menu="true"
    :center="true"
  >
    <div class="flex flex-column justify-evenly h-full items-center mb-1">
      <h2>Exercices</h2>
      <Button :to="`${prefix}/exercices/verbe-irreguliers`">
        Verbes irréguliers
      </Button>
      <Button :to="`${prefix}/exercices/vocabulaires`">Vocabulaires</Button>
    </div>
    <div class="flex flex-column justify-evenly h-full items-center">
      <h2>Consulter les données</h2>
      <Button color="danger" :to="`${prefix}/irregular-verbs`">
        Verbes irréguliers
      </Button>
      <Button color="danger" :to="`${prefix}/vocabularies`">
        Vocabulaires
      </Button>
    </div>
    <Button color="primary" @click="() => $router.back()">Retour</Button>
  </MainContainer>
  <Toast
    :show="toast.show"
    :message="toast.message"
    :position="toast.position"
    color="error"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import { useStore } from "@/store";

import MainContainer from "@/components/MainContainer.vue";
import Button from "@/components/Button.vue";
import Toast from "@/components/Toast.vue";

const $store = useStore();
const route = useRoute();

const prefix = route.path;
const toast = computed(() => {
  return $store.state.toast;
});
const language = $store.getters.getLang;
</script>
