<template>
  <MainContainer :title="title">
    <form @submit.prevent="submit">
      <div class="row">
        <div class="nes-field w-full">
          <label for="infinitive">Verbe à l'infinitif</label>
          <input
            class="nes-input"
            v-model.trim="irregularVerbForm.infinitive"
            type="text"
            name="infinitive"
          />
        </div>
      </div>

      <div class="row">
        <div class="nes-field col-6 mr-2">
          <label for="past_simple">Passé simple au singulier</label>
          <input
            class="nes-input"
            v-model.trim="irregularVerbForm.past_simple"
            type="text"
            name="past_simple"
          />
        </div>
        <div class="nes-field col-6">
          <label for="past_simple2">Passé simple au pluriel</label>
          <input
            class="nes-input"
            v-model.trim="irregularVerbForm.past_simple2"
            type="text"
            name="past_simple2"
          />
        </div>
      </div>

      <div class="row">
        <div class="nes-field w-full">
          <label for="past_participle">Participe passé</label>
          <input
            class="nes-input"
            v-model.trim="irregularVerbForm.past_participle"
            type="text"
            name="past_participle"
          />
        </div>
      </div>
      <div class="row">
        <div class="nes-field w-full">
          <label for="translation">Traduction</label>
          <input
            class="nes-input"
            v-model.trim="irregularVerbForm.translation"
            type="text"
            name="translation"
          />
        </div>
      </div>
      <div class="flex justify-around buttons">
        <Button type="submit" color="success">Valider</Button>
        <Button
          v-if="!editMode"
          type="button"
          color="primary"
          @click="submitAndContinue"
        >
          Ajouter
        </Button>
        <Button type="button" color="danger" @click="returnBack">
          Annuler
        </Button>
      </div>
    </form>
  </MainContainer>
</template>

<script setup lang="ts">
import { computed, ComputedRef, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

import { IrregularVerb } from "@/models";
import { useStore } from "@/store";
import { IrregularVerbActionTypes } from "@/store/irregular-verb/actions";
import { IrregularVerbsGetterTypes } from "@/store/irregular-verb/getters";

import MainContainer from "@/components/MainContainer.vue";
import Button from "@/components/Button.vue";

const $store = useStore();
const $router = useRouter();
const $route = useRoute();

const language = $store.getters.getLang;
const irregularVerb: ComputedRef<IrregularVerb> = computed(
  () =>
    $store.getters[IrregularVerbsGetterTypes.getVerb](
      Number($route.params.id as string)
    ) as IrregularVerb
);
const categoryId = $route.params.category_id as number | "liste";
const irregularVerbForm = reactive<IrregularVerb>({
  id: -1,
  infinitive: "",
  past_simple: "",
  past_simple2: "",
  past_participle: "",
  translation: "",
});
let editMode = false;
let title = "Ajout d'un nouveau verbe irrégulier";
if (irregularVerb.value) {
  title = "Edition";
  editMode = true;
  irregularVerbForm.id = irregularVerb.value.id;
  irregularVerbForm.infinitive = irregularVerb.value.infinitive;
  irregularVerbForm.translation = irregularVerb.value.translation;
}

function returnBack() {
  $router.back();
}

async function submitAndContinue(resetForm = true) {
  if (editMode) {
    const vals: Partial<IrregularVerb> & { id: number } = {
      id: irregularVerb.value.id,
    };
    if (irregularVerbForm.infinitive !== irregularVerb.value.infinitive) {
      vals.infinitive = irregularVerbForm.infinitive;
    }
    if (irregularVerbForm.past_simple !== irregularVerb.value.past_simple) {
      vals.past_simple = irregularVerbForm.past_simple;
    }
    if (irregularVerbForm.past_simple2 !== irregularVerb.value.past_simple2) {
      vals.past_simple2 = irregularVerbForm.past_simple2;
    }
    if (
      irregularVerbForm.past_participle !== irregularVerb.value.past_participle
    ) {
      vals.past_participle = irregularVerbForm.past_participle;
    }
    if (irregularVerbForm.translation !== irregularVerb.value.translation) {
      vals.translation = irregularVerbForm.translation;
    }

    await $store.dispatch(IrregularVerbActionTypes.updateVerb, vals);
  } else {
    await $store.dispatch(
      IrregularVerbActionTypes.createVerb,
      irregularVerbForm
    );
  }
  if (resetForm) {
    Object.assign(irregularVerbForm, {
      infinitive: "",
      past_simple: "",
      past_simple2: "",
      past_participle: "",
      translation: "",
    });
    (
      document.querySelector("input[name='infinitive']") as HTMLInputElement
    ).focus();
  }
}

async function submit() {
  await submitAndContinue(false);
  returnBack();
}
</script>
