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
          v-for="([badAnswer, expectedVerb], index) in listCorrections"
          :key="index"
          :badAnswer="badAnswer"
          :expectedVerb="expectedVerb"
        />
      </tbody>
    </table>
  </div>

  <div class="w-full flex justify-center">
    <button class="nes-btn is-primary" @click="onReturnMenu">
      Menu principal
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { GetterTypes } from "@/store/getters";
import { IrregularVerb } from "@/store/state";
import { MutationType } from "@/store/mutations";

import CorrectionElement from "@/components/CorrectionElement.vue";

const $store = useStore();
const $router = useRouter();

const listCorrections: Array<[IrregularVerb, IrregularVerb]> =
  $store.getters[GetterTypes.getCorrections];

function onReturnMenu() {
  $store.commit(MutationType.ClearAnswer);
  $router.push("/");
}
</script>
