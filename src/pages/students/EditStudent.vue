<template>
  <v-container fluid class="mb-6 justify-content-between">
    <v-row>
      <v-col cols="10">
        <h1>Editar aluno</h1>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="handleRouteToBack" color="blue-darken-1" density="default">
          <v-icon
            icon="mdi-arrow-left"
            start
          ></v-icon> Voltar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const handleRouteToBack = () => router.go(-1);
</script>
