<template>
  <MainContainer title="Liste de verbes irréguliers">
    <div class="buttons flex justify-between">
      <Button class="returnBtn" color="primary" @click="() => $router.back()">
        Retour
      </Button>
      <Button color="danger" :to="`${$route.path}/nouveau`"> + Ajouter </Button>
    </div>
    <div class="nes-table-responsive">
      <table class="nes-table is-bordered">
        <thead>
          <IrregularVerbHeader />
        </thead>
        <tbody>
          <IrregularVerbRow
            v-for="irregularVerb in irregularVerbs"
            :key="irregularVerb.id"
            :irregular-verb="irregularVerb"
            @click="$router.push(`${$route.path}/${irregularVerb.id}`)"
          />
        </tbody>
      </table>
      <Button class="addBtn" color="danger" :to="`${$route.path}/nouveau`">
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
import IrregularVerbHeader from "@/components/IrregularVerbHeader.vue";
import IrregularVerbRow from "@/components/IrregularVerbRow.vue";
import Button from "@/components/Button.vue";

const $store = useStore();
const irregularVerbs = $store.state.irregularVerb.verbs;
</script>

<style lang="scss" scoped>
.buttons {
  margin-bottom: 2rem;

  > * {
    margin-right: 2rem;
  }

  > :last-child {
    margin-right: 0;
  }
}

.addBtn {
  margin-top: 2rem;
}
</style>
