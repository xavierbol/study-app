<template>
  <section class="nes-container is-centered with-title h-screen">
    <h1 class="title">Study App</h1>
    <p>Que souhaitez-vous faire ?</p>
    <div class="menu flex flex-column justify-between">
      <Button to="/nl/verbe-irreguliers">
        Verbes irréguliers en néerlandais
      </Button>
      <Button to="/nl/vocabulaires" disabled>
        Vocabulaires en néerlandais
      </Button>
      <Button to="/en/verbe-irreguliers" disabled>
        Verbes irréguliers en anglais
      </Button>
      <Button to="/en/vocabulaires" disabled>Vocabulaires en anglais</Button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Button from "@/components/Button.vue";
</script>

<style lang="scss" scoped>
.nes-container.h-screen {
  margin-bottom: 0;
  padding-bottom: 0;
}

.header {
  height: 100vh;
}

.menu {
  margin-top: 5rem;
  height: 75%;
}
</style>
