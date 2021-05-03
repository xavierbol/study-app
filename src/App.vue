<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

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

.justify-end {
  justify-content: flex-end;
}
</style>
