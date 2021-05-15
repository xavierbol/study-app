<template>
  <h1 class="title">Vocabulaires</h1>
  <form @submit="onSubmit" @reset="onReset">
    <div class="row">
      <div class="nes-field w-full">
        <label for="word">Mot</label>
        <input type="text" id="word" class="nes-input" />
      </div>
      <div class="nes-field w-full">
        <label for="translation">Traduction (fr)</label>
        <input type="text" id="translation" class="nes-input" />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      onSubmit(): void {
        return;
      },
      onReset(): void {
        return;
      },
    };
  },
});
</script>
