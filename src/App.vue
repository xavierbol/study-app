<template>
  <router-view />
</template>

<script lang="ts" setup></script>

<style lang="scss">
.spacer {
  flex: 1 1 auto;
}

.w-full {
  width: 100%;
}

.w-screen {
  width: 100vh;
}

.h-full {
  height: 100%;
}

.h-screen {
  height: 100vh;
}

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.justify-between {
  justify-content: space-between;
}

.justify-around {
  justify-content: space-around;
}

.justify-center {
  justify-content: center;
}

.justify-evenly {
  justify-content: space-evenly;
}

.justify-end {
  justify-content: flex-end;
}

.row {
  display: flex;
  width: 100%;
  margin-bottom: 3rem;
}

tr.dashed-border-bottom > td {
  border-bottom: dashed;
  border-color: black;
}

.col-6 {
  width: 50%;
}

.mr-2 {
  margin-right: 2rem;
}

.buttons {
  margin-top: 2rem;
}
</style>
