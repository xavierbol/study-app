<template>
  <h1 class="title">Verbes irréguliers</h1>
  <form autocomplete="off" @submit.prevent="onSubmit">
    <div class="row">
      <div class="nes-field w-full">
        <label for="infinitive">Infinitif</label>
        <input
          v-model.trim="irregularVerbForm.infinitive"
          type="text"
          name="infinitive"
          :class="`nes-input ${
            showErrors && fieldName !== 'infinitive'
              ? invalidField('infinitive')
                ? 'is-error'
                : 'is-success'
              : ''
          }`"
          :disabled="fieldName === 'infinitive'"
        />
        <span class="nes-text is-error" v-if="invalidField('infinitive')">
          Infinitif correct : {{ verb.infinitive }}
        </span>
      </div>
    </div>

    <div class="row">
      <div class="nes-field col-6 mr-2">
        <label for="past_simple">Imparfait (singulier)</label>
        <input
          v-model.trim="irregularVerbForm.past_simple"
          type="text"
          name="past_simple"
          :class="`nes-input ${
            showErrors && fieldName !== 'past_simple'
              ? invalidField('past_simple')
                ? 'is-error'
                : 'is-success'
              : ''
          }`"
          :disabled="fieldName === 'past_simple'"
        />
        <span class="nes-text is-error" v-if="invalidField('past_simple')">
          Imparfait correct : {{ verb.past_simple }}
        </span>
      </div>

      <div class="nes-field col-6">
        <label for="past_simple_2">Imparfait (pluriel)</label>
        <input
          v-model.trim="irregularVerbForm.past_simple_2"
          type="text"
          name="past_simple_2"
          :class="`nes-input ${
            showErrors && fieldName !== 'past_simple_2'
              ? invalidField('past_simple_2')
                ? 'is-error'
                : 'is-success'
              : ''
          }`"
          :disabled="fieldName === 'past_simple_2'"
        />
        <span class="nes-text is-error" v-if="invalidField('past_simple_2')">
          Imparfait correct : {{ verb.past_simple_2 }}
        </span>
      </div>
    </div>

    <div class="row">
      <div class="nes-field w-full">
        <label for="past_participle">Participe passé</label>
        <input
          v-model.trim="irregularVerbForm.past_participle"
          type="text"
          name="past_participle"
          :class="`nes-input ${
            showErrors && fieldName !== 'past_participle'
              ? invalidField('past_participle')
                ? 'is-error'
                : 'is-success'
              : ''
          }`"
          :disabled="fieldName === 'past_participle'"
        />
        <span class="nes-text is-error" v-if="invalidField('past_participle')">
          Participe passé correct : {{ verb.past_participle }}
        </span>
      </div>
    </div>

    <div class="row">
      <div class="nes-field w-full">
        <label for="translation">Traduction</label>
        <input
          v-model.trim="irregularVerbForm.translation"
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
          Traduction correcte : {{ verb.translation }}
        </span>
      </div>
    </div>

    <div class="flex justify-around buttons">
      <Button type="submit" color="success">Valider</Button>
      <Button type="button" color="danger" @click="reset">Réinitialiser</Button>
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
      {{ `${totalExercises - remainingExercises + 1} / ${totalExercises}` }}
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
import { ComputedRef, reactive, Ref, ref, inject } from "vue";
import { useRouter } from "vue-router";

import { useStore } from "@/store";
import { IrregularVerb } from "@/models";
import { UseExercise } from "@/hooks/useExercise";

import Button from "@/components/Button.vue";

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
} = inject("exercise") as UseExercise<IrregularVerb>;
setData($store.state.irregularVerb.verbs);

const dialogRef: Ref<HTMLDialogElement | null> = ref(null);
const verb = getExercise as ComputedRef<IrregularVerb>;

let fieldName = ref(selectRandomFieldName(verb.value));
const irregularVerbForm = reactive<IrregularVerb>(
  Object.assign(
    {
      id: verb.value.id,
      infinitive: "",
      past_simple: "",
      past_simple_2: "",
      past_participle: "",
      translation: "",
    },
    { [fieldName.value]: verb.value[fieldName.value] }
  )
);
const showErrors = ref(false);

function invalidField(fieldName: keyof IrregularVerb) {
  return (
    showErrors.value && irregularVerbForm[fieldName] !== verb.value[fieldName]
  );
}

function reset(): void {
  Object.assign(
    irregularVerbForm,
    {
      id: verb.value.id,
      infinitive: "",
      past_simple: "",
      past_simple_2: "",
      past_participle: "",
      translation: "",
    },
    { [fieldName.value]: verb.value[fieldName.value] }
  );

  showErrors.value = false;
  const inputName = findFirstFieldToEdit(fieldName.value, [
    "infinitive",
    "past_simple",
    "past_simple_2",
    "past_participle",
    "translation",
  ]);
  inputName &&
    (
      document.querySelector(
        `input[name='${inputName}']`
      ) as HTMLInputElement | null
    )?.focus();
}

function onSubmit(): void {
  showErrors.value =
    (fieldName.value !== "infinitive" &&
      !checkAnswer(irregularVerbForm.infinitive, verb.value.infinitive)) ||
    (fieldName.value !== "past_simple" &&
      !checkAnswer(irregularVerbForm.past_simple, verb.value.past_simple)) ||
    (fieldName.value !== "past_simple_2" &&
      !checkAnswer(
        irregularVerbForm.past_simple_2,
        verb.value.past_simple_2
      )) ||
    (fieldName.value !== "past_participle" &&
      !checkAnswer(
        irregularVerbForm.past_participle,
        verb.value.past_participle
      )) ||
    (fieldName.value !== "translation" &&
      !checkAnswer(irregularVerbForm.translation, verb.value.translation));
  addAnswer({ ...irregularVerbForm, correct: !showErrors.value });
  if (!showErrors.value) {
    if (remainingExercises.value > 0) {
      fieldName.value = selectRandomFieldName(verb.value);
      reset();
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
