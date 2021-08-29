<template>
  <h1 class="title">Verbes irréguliers</h1>
  <form @submit.prevent="onSubmit" autocomplete="off">
    <div class="row">
      <div class="nes-field w-full">
        <label for="infinitive">Infinitif</label>
        <input
          v-model.trim="form.infinitive"
          type="text"
          id="infinitive"
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
          v-model.trim="form.past_simple"
          type="text"
          id="past_simple"
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
          v-model.trim="form.past_simple_2"
          type="text"
          id="past_simple_2"
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
          v-model.trim="form.past_participle"
          type="text"
          id="past_participle"
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
          v-model.trim="form.translation"
          type="text"
          id="translation"
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
    <div v-if="countAnswers <= 10">
      <i
        v-for="(answer, index) in getAnswers"
        :key="index"
        :class="`nes-icon ${answer.correct ? 'coin' : 'close'}`"
      ></i>
    </div>
    <div v-else>
      <span v-if="containGoodAnswers" class="nes-text">
        <i class="nes-icon coin"></i> x
        {{ getAnswers.filter((a) => a.correct).length }}
      </span>
      <span v-if="containErrors" class="nes-text">
        <i class="nes-icon close"></i> x
        {{ getAnswers.filter((a) => !a.correct).length }}
      </span>
    </div>
    <span class="nes-text">
      {{ countRemainingVerbs ? countAnswers + 1 : countTotal }} /
      {{ countTotal }}
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
    <p class="text-center" v-if="containErrors">
      Voulez-vous réviser vos erreurs ?
    </p>
    <menu class="dialog-menu flex justify-around">
      <Button v-if="containErrors" color="primary" @click="onResumeErrors">
        Oui
      </Button>
      <Button color="secondary" @click="onReturnMenu">Non</Button>
    </menu>
  </dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, Ref, ref } from "vue";
import Button from "@/components/Button.vue";
import { Answer, IrregularVerb } from "@/store/state";
import { useStore } from "vuex";
import { GetterTypes } from "@/store/getters";
import { useRouter } from "vue-router";
import { MutationType } from "@/store/mutations";

const $store = useStore();
const $router = useRouter();

const dialogRef: Ref<HTMLDialogElement | null> = ref(null);
const verb = computed<IrregularVerb>(
  (): IrregularVerb => $store.getters[GetterTypes.selectRandomVerb]
);
const getAnswers = computed(
  (): Array<Answer> => $store.getters[GetterTypes.getAnswers]
);
const countAnswers = computed(
  (): number => $store.getters[GetterTypes.countAnswers]
);
const countTotal = computed(
  (): number => $store.getters[GetterTypes.totalCount]
);
const countRemainingVerbs = computed(
  () => $store.getters[GetterTypes.remainingCount]
);
function selectRandomFieldName(): keyof IrregularVerb {
  const fieldNames = (
    Object.keys(verb.value) as Array<keyof IrregularVerb>
  ).filter((key) => key !== "id" && verb.value[key]);
  return fieldNames[
    Math.floor(Math.random() * fieldNames.length)
  ] as keyof IrregularVerb;
}

const containGoodAnswers = computed(
  (): boolean => getAnswers.value.findIndex((a) => a.correct) !== -1
);
const containErrors = computed(
  (): boolean => getAnswers.value.findIndex((a) => !a.correct) !== -1
);
let fieldName = ref(selectRandomFieldName());
const form = reactive<IrregularVerb>(
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
  return showErrors.value && form[fieldName] !== verb.value[fieldName];
}

function checkAnswer(actualVerb: string, expectedVerb: string): boolean {
  if (expectedVerb.includes(",")) {
    const listAnswers = expectedVerb.split(",").map((v) => v.trim());
    if (actualVerb.includes(",")) {
      const listResponse = [
        ...new Set(actualVerb.split(",").map((v) => v.trim())),
      ];
      return (
        listResponse.length === listAnswers.length &&
        listResponse.every((v) => listAnswers.includes(v))
      );
    }
    return listAnswers.includes(actualVerb);
  } else {
    return expectedVerb === actualVerb;
  }
}

function findFirstInputIdToEdit() {
  const fieldNames = [
    "infinitive",
    "past_simple",
    "past_simple_2",
    "past_participle",
    "translation",
  ];
  for (const field of fieldNames) {
    if (field !== fieldName.value) {
      return field;
    }
  }
  return null;
}

function reset(): void {
  Object.assign(
    form,
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
  const inputId = findFirstInputIdToEdit();
  inputId && document.getElementById(inputId)?.focus();
}

function onSubmit(): void {
  showErrors.value =
    (fieldName.value !== "infinitive" &&
      !checkAnswer(form.infinitive, verb.value.infinitive)) ||
    (fieldName.value !== "past_simple" &&
      !checkAnswer(form.past_simple, verb.value.past_simple)) ||
    (fieldName.value !== "past_simple_2" &&
      !checkAnswer(form.past_simple_2, verb.value.past_simple_2)) ||
    (fieldName.value !== "past_participle" &&
      !checkAnswer(form.past_participle, verb.value.past_participle)) ||
    (fieldName.value !== "translation" &&
      !checkAnswer(form.translation, verb.value.translation));
  $store.commit(MutationType.AddAnswer, {
    ...form,
    correct: !showErrors.value,
  });
  if (!showErrors.value) {
    if (countRemainingVerbs.value > 0) {
      fieldName.value = selectRandomFieldName();
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
  $router.push({ name: "ResumeErrors" });
}

function onReturnMenu() {
  $store.commit(MutationType.ClearAnswer);
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
