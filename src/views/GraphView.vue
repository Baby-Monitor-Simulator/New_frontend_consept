<script setup lang="ts">
import { onMounted } from "vue";
import Graph from "@/components/Graph.vue";
import { GraphData, MaternalData } from "@/scripts/graphUtils";
import { ref } from "vue";
</script>

<template>
  <v-app>
    <h1>You did it!</h1>
    <div>
      <Graph id="graph" />
    </div>
  </v-app>
</template>

<script lang="ts"></script>
<style scoped></style>
