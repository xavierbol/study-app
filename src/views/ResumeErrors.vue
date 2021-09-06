<template>
  <h1>Récapitulatif</h1>
  <div class="nes-table-responsive">
    <table class="nes-table is-bordered">
      <thead>
        <tr>
          <th>Infinitif</th>
          <th>Passé simple</th>
          <th>Participe passé</th>
          <th>Traduction</th>
        </tr>
      </thead>
      <tbody>
        <CorrectionElement
          v-for="([badAnswer, expectedAnswer], index) in corrections"
          :key="index"
          :badAnswer="badAnswer"
          :expectedAnswer="expectedAnswer"
        />
      </tbody>
    </table>
  </div>

  <div class="w-full flex justify-center resume_button">
    <button class="nes-btn is-primary" @click="onReturnMenu">
      Menu principal
    </button>
  </div>
</template>

<script lang="ts" setup>
import { DeepReadonly, inject, Ref, ToRefs, UnwrapRef } from "vue";
import { useRouter } from "vue-router";

import { Answer, Exercise } from "@/models";
import { UseExercise } from "@/hooks/useExercise";

import CorrectionElement from "@/components/CorrectionElement.vue";

const $router = useRouter();
type AnswerInjected = {
  answers: DeepReadonly<
    UnwrapRef<Ref<ToRefs<Record<number, Answer<Exercise>>>>>
  >;
  type: "Irregular Verb" | "Vocabulary";
};
const exerciseDone = inject("exercise");

let corrections: Array<[Exercise, Exercise]> = [];
if (exerciseDone === undefined) {
  $router.push("/");
} else {
  const { getCorrections } = exerciseDone as UseExercise<Exercise>;
  corrections = getCorrections.value;
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
