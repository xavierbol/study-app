<template>
  <MainContainer title="Récapitulatif">
    <div class="nes-table-responsive">
      <table class="nes-table is-bordered">
        <thead>
          <IrregularVerbHeader v-if="!!isIrregularVerb" />
          <VocabularyHeader v-else />
        </thead>
        <tbody>
          <CorrectionElement
            v-for="([badAnswer, expectedAnswer], index) in corrections"
            :key="index"
            :badAnswer="badAnswer"
            :expectedAnswer="expectedAnswer"
            :is-irregular-verb="!!isIrregularVerb"
          />
        </tbody>
      </table>
    </div>

    <div class="w-full flex justify-center resume_button">
      <button class="nes-btn is-primary" @click="onReturnMenu">
        Menu principal
      </button>
    </div>
  </MainContainer>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, inject } from "vue";
import { useRouter } from "vue-router";

import { Exercise } from "@/models";
import { UseExercise } from "@/hooks/useExercise";

import MainContainer from "@/components/MainContainer.vue";
import CorrectionElement from "@/components/CorrectionElement.vue";
import IrregularVerbHeader from "@/components/IrregularVerbHeader.vue";
import VocabularyHeader from "@/components/VocabularyHeader.vue";

const $router = useRouter();
const exerciseDone = inject("exercise") as UseExercise<Exercise> | undefined;

let corrections: Array<[Exercise, Exercise]> = [];
let isIrregularVerb: ComputedRef<boolean | undefined> = computed(() => false);
if (exerciseDone === undefined || !exerciseDone.getCorrections.value.length) {
  $router.push("/");
} else {
  const { getCorrections, isIrregularVerb: _isIrregularVerb } =
    exerciseDone as UseExercise<Exercise>;
  corrections = getCorrections.value;
  isIrregularVerb = _isIrregularVerb;
}

function onReturnMenu(): void {
  $router.push("/");
}
</script>

<style scoped>
.resume_button {
  margin-top: 1rem;
}
</style>
