<template>
  <h1 class="title">Vocabulaires en {{ language }}</h1>
  <form @submit.prevent="onSubmit" @reset.prevent="onReset" autocomplete="off">
    <div class="row">
      <div class="nes-field w-full">
        <label for="word">Mot en {{ language }}</label>
        <input
          v-model.trim="vocabularyForm.word"
          type="text"
          name="word"
          :class="`nes-input ${
            showErrors && fieldName !== 'word'
              ? invalidField('word')
                ? 'is-error'
                : 'is-success'
              : ''
          }`"
          :disabled="fieldName === 'word'"
        />
        <span class="nes-text is-error" v-if="invalidField('word')">
          Mot correct : {{ vocabulary.word }}
        </span>
      </div>
    </div>

    <div class="row">
      <div class="nes-field w-full">
        <label for="translation">Traduction</label>
        <input
          v-model.trim="vocabularyForm.translation"
          type="text"
          name="translation"
          :class="`nes-input ${
            showErrors && fieldName !== 'translation'
              ? invalidField('translation')
                ? 'is-error'
                : 'is-success'
              : ''
          }`"
          :disabled="fieldName === 'translation'"
        />
        <span class="nes-text is-error" v-if="invalidField('translation')">
          Traduction correcte : {{ vocabulary.translation }}
        </span>
      </div>
    </div>

    <div class="flex justify-around buttons">
      <Button type="submit" color="success">Valider</Button>
      <Button type="reset" color="danger">Réinitialiser</Button>
    </div>
  </form>
  <div class="flex justify-between">
    <div v-if="totalExercises - remainingExercises <= 10">
      <i v-for="i in state.goodAnswerCount" class="nes-icon coin" :key="i"></i>
      <i
        v-for="i in state.wrongAnswerCount"
        class="nes-icon close"
        :key="i"
      ></i>
    </div>
    <div v-else>
      <span v-if="state.goodAnswerCount > 0" class="nes-text">
        <i class="nes-icon coin"></i> x
        {{ state.goodAnswerCount }}
      </span>
      <span v-if="state.wrongAnswerCount > 0" class="nes-text">
        <i class="nes-icon close"></i> x
        {{ state.wrongAnswerCount }}
      </span>
    </div>
    <span class="nes-text">
      {{
        `${
          remainingExercises >= totalExercises
            ? totalExercises - remainingExercises
            : totalExercises - remainingExercises + 1
        } / ${totalExercises}`
      }}
    </span>
  </div>

  <dialog
    ref="dialogRef"
    class="nes-dialog is-rounded dialog"
    id="dialog-dark-rounded"
  >
    <p class="title text-center">Exercice terminé !</p>
    <p class="text-center">
      Vous venez de parcourir <br />
      tous les verbes irréguliers <br />
      de cet exercice.
    </p>
    <p class="text-center" v-if="state.wrongAnswerCount > 0">
      Voulez-vous réviser vos erreurs ?
    </p>
    <menu class="dialog-menu flex justify-around">
      <Button
        v-if="state.wrongAnswerCount > 0"
        color="primary"
        @click="onResumeErrors"
      >
        Oui
      </Button>
      <Button color="secondary" @click="onReturnMenu">Non</Button>
    </menu>
  </dialog>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import Button from "@/components/Button.vue";
import { useStore } from "@/store";
import { UseExercise } from "@/hooks/useExercise";
import { Vocabulary } from "@/models";
import { ComputedRef, inject, reactive, ref, Ref } from "@vue/runtime-core";

const $route = useRoute();
const $store = useStore();
const $router = useRouter();
const {
  state,
  setData,
  addAnswer,
  getExercise,
  remainingExercises,
  totalExercises,
  selectRandomFieldName,
  checkAnswer,
  findFirstFieldToEdit,
} = inject("exercise") as UseExercise<Vocabulary>;
setData($store.state.vocabulary.vocabularies);

const dialogRef: Ref<HTMLDialogElement | null> = ref(null);
const vocabulary = getExercise as ComputedRef<Vocabulary>;

let fieldName = ref(selectRandomFieldName(vocabulary.value));
const vocabularyForm = reactive<Vocabulary>(
  Object.assign(
    {
      id: vocabulary.value.id,
      word: "",
      translation: "",
    },
    { [fieldName.value]: vocabulary.value[fieldName.value] }
  )
);
const showErrors = ref(false);

function invalidField(fieldName: keyof Vocabulary) {
  return (
    showErrors.value &&
    vocabularyForm[fieldName] !== vocabulary.value[fieldName]
  );
}

const language = $route.params.lang === "nl" ? "néerlandais" : "anglais";

function onReset(): void {
  Object.assign(
    vocabularyForm,
    {
      id: vocabulary.value.id,
      word: "",
      translation: "",
    },
    { [fieldName.value]: vocabulary.value[fieldName.value] }
  );

  showErrors.value = false;
  const inputName = findFirstFieldToEdit(fieldName.value);
  inputName &&
    (
      document.querySelector(
        `input[name='${inputName}']`
      ) as HTMLInputElement | null
    )?.focus();
}

function onSubmit(): void {
  showErrors.value =
    (fieldName.value !== "word" &&
      !checkAnswer(vocabularyForm.word, vocabulary.value.word)) ||
    (fieldName.value !== "translation" &&
      !checkAnswer(vocabularyForm.translation, vocabulary.value.translation));
  addAnswer({ ...vocabularyForm, correct: !showErrors.value });
  if (!showErrors.value) {
    if (remainingExercises.value > 0) {
      fieldName.value = selectRandomFieldName(vocabulary.value);
      onReset();
    } else {
      if (dialogRef.value) {
        dialogRef.value.showModal();
      } else {
        $router.push("/");
      }
    }
  }
}

function onResumeErrors() {
  $router.push({
    name: "ResumeErrors",
  });
}

function onReturnMenu() {
  $router.push("/");
}
</script>

<style lang="scss" scoped>
.buttons {
  margin-top: 3rem;
}

.row {
  display: flex;
  width: 100%;
  margin-bottom: 3rem;
}

.col-6 {
  width: 50%;
}

.mr-2 {
  margin-right: 2rem;
}

.dialog {
  bottom: 50%;
}

.text-center {
  text-align: center;
}
</style>
