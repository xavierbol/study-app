<template>
  <MainContainer
    question="Choisissez une langue à exercer"
    :menu="true"
    :center="true"
  >
    <Button to="/nl">Néerlandais</Button>
    <Button to="/en">Anglais</Button>
  </MainContainer>
</template>

<script lang="ts" setup>
import MainContainer from "@/components/MainContainer.vue";
import Button from "@/components/Button.vue";
</script>

<style lang="scss" scoped></style>
