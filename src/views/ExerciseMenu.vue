<template>
  <MainContainer
    title="Study App"
    question="Que souhaitez-vous faire ?"
    :menu="true"
    :center="true"
  >
    <Button :to="`${prefix}/exercices/verbe-irreguliers`">
      Verbes irréguliers en {{ language }}
    </Button>
    <Button :to="`${prefix}/exercices/vocabulaires`">
      Vocabulaires en {{ language }}
    </Button>
    <Button color="primary" :to="`${prefix}/vocabularies`">
      Voir la liste de vocabulaires
    </Button>
    <Button color="secondary" @click="() => $router.back()">Retour</Button>
  </MainContainer>
  <Toast
    :show="toast.show"
    :message="toast.message"
    :position="toast.position"
    color="error"
  />
</template>

<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
import MainContainer from "@/components/MainContainer.vue";
import Button from "@/components/Button.vue";
import Toast from "@/components/Toast.vue";
import { useStore } from "@/store";

const $store = useStore();
const route = useRoute();
const prefix = route.path;
const { lang } = route.params;
const toast = computed(() => {
  return $store.state.toast;
});

let language = "anglais";
if (lang === "nl") {
  language = "néerlandais";
}
</script>
