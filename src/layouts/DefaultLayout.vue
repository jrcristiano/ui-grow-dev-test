<template>
  <v-card>
    <v-layout >
      <v-navigation-drawer
        color="blue-darken-1"
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://avatars.githubusercontent.com/u/33969409?v=4"
            subtitle="cristiano.junior@server.com"
            title="Cristiano Junior"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item @click="handleRouteToPath('/')" prepend-icon="mdi-account-multiple" title="Alunos" value="shared"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 100vh;">
        <router-view />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleRouteToPath = (path: string) => router.push({ path });

</script>
