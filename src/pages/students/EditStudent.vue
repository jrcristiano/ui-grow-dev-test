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
  <v-container fluid>
    <v-form @submit.prevent="submitForm" lazy-validation>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            variant="outlined"
            v-model="form.name"
            label="Name"
            @blur="v$.name.$touch()"
            :persistent-hint="false"
            required></v-text-field>
            <p
              v-if="v$.name.required.$invalid && v$.name.$dirty"
              class="error">
                Name {{ v$.name.required.$message.toLowerCase() }}
            </p>
            <p
              v-if="v$.name.minLength.$invalid && v$.name.$dirty"
              class="error">
                Name {{ v$.name.minLength.$message.toLowerCase() }}
            </p>
            <p
              v-if="v$.name.maxLength.$invalid && v$.name.$dirty"
              class="error">
                Name {{ v$.name.maxLength.$message.toLowerCase() }}
            </p>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            variant="outlined"
            v-model="form.lastname"
            label="Lastname"
            @blur="v$.lastname.$touch()"
            required
          ></v-text-field>
          <p
            v-if="v$.lastname.required.$invalid && v$.lastname.$dirty"
            class="error">
            Lastname {{ v$.lastname.required.$message.toLowerCase() }}
          </p>

          <p
            v-if="v$.lastname.minLength.$invalid && v$.lastname.$dirty"
            class="error">
              Lastname {{ v$.lastname.minLength.$message.toLowerCase() }}
          </p>

          <p
            v-if="v$.lastname.maxLength.$invalid && v$.lastname.$dirty"
            class="error">
            Lastname {{ v$.lastname.maxLength.$message.toLowerCase() }}
          </p>
        </v-col>
        <v-col cols="12">
          <v-text-field
            variant="outlined"
            v-model="form.email"
            label="Email"
            type="email"
            autocomplete="off"
            required
            @blur="v$.email.$touch()"
          ></v-text-field>
          <p
            v-if="v$.email.required.$invalid && v$.email.$dirty"
            class="error">
            E-mail {{ v$.email.required.$message.toLowerCase() }}
          </p>
          <p
            v-if="v$.email.minLength.$invalid && v$.email.$dirty"
            class="error"
          >
            E-mail {{ v$.email.minLength.$message.toLowerCase() }}
          </p>
          <p
            v-if="v$.email.maxLength.$invalid && v$.email.$dirty"
            class="error"
          >
          E-mail {{ v$.email.maxLength.$message.toLowerCase() }}
        </p>
        <p
          v-if="v$.email.email.$invalid && v$.email.$dirty"
          class="error"
        >
        E-mail {{ v$.email.email.$message.toLowerCase() }}
        </p>
        </v-col>
        <v-col cols="12">
          <v-text-field
            variant="outlined"
            v-model="form.password"
            label="Senha"
            type="password"
            autocomplete="off"
            @blur="v$.password.$touch()"
            required>
          </v-text-field>
          <p
            v-if="v$.password.required.$invalid && v$.password.$dirty"
            class="error">
            Password {{ v$.email.required.$message.toLowerCase() }}
          </p>
          <p
            v-if="v$.password.minLength.$invalid && v$.password.$dirty"
            class="error"
          >
          Password {{ v$.password.minLength.$message.toLowerCase() }}
          </p>
          <p
            v-if="v$.password.maxLength.$invalid && v$.password.$dirty"
            class="error"
          >
          Password {{ v$.password.maxLength.$message.toLowerCase() }}
        </p>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            variant="outlined"
            label="CPF"
            v-model="form.cpf"
            disabled
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            variant="outlined"
            label="Registro acadêmico (RA)"
            v-model="form.ra"
            disabled
            required>
          </v-text-field>
        </v-col>
      </v-row>
      <v-col v-if="hideButton === false" cols="12">
        <v-btn :disabled="v$.$invalid" type="submit" color="primary">
          <v-icon icon="mdi-check"></v-icon> Salvar
        </v-btn>
      </v-col>
      <v-col v-else cols="12">
        <v-btn disabled type="submit" color="primary">
          <v-icon icon="mdi-check"></v-icon> Salvando...
        </v-btn>
      </v-col>
    </v-form>
  </v-container>
</template>

<script lang="ts" setup>
import HttpStatus from '@/enums/http.status.enum';
import { findStudentByUuid, updateStudentByUuid } from '@/services/students.service';
import { formatCPF } from '@/utils/cpf.util';
import { errorNotify, successNotify } from '@/utils/notify.util';
import useVuelidate from '@vuelidate/core';
import { email, maxLength, minLength, required } from '@vuelidate/validators';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();

const $route = useRoute();

const handleRouteToBack = () => router.go(-1);

const handleRouteToPath = (path: string) => router.push({ path });

const { uuid } = $route.params;

const handleFindStudentByUuid = async () => {
  try {
    const res = await findStudentByUuid(uuid as string);
    const {
      name,
      lastname,
      email,
      ra,
      cpf,
      password
    } = res.data;

    form.name = name;
    form.lastname = lastname;
    form.email = email;
    form.ra = ra;
    form.cpf = formatCPF(cpf);
    form.password = password;

  } catch (error: any) {
    errorNotify('Erro ao buscar usuário.');
  }
}

onMounted(async () => {
  await handleFindStudentByUuid();
});

const hideButton = ref(false);

const form = reactive({
  name: '',
  lastname: '',
  email: '',
  ra: '',
  cpf: '',
  password: '',
});

const rules = computed(() => {
  return {
    name: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(255),
    },
    lastname: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(255),
    },
    email: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(255),
      email,
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(255),
    },
  }
})

const v$ = useVuelidate(rules, form);

const submitForm = async () => {
  try {
    hideButton.value = true;

    const isValid = await v$.value.$validate();
    if (!isValid) {
      throw new Error('Dados inválidos: verifique as informações e tente novamente.');
    }

    const res = await updateStudentByUuid(uuid as string, {
      name: form.name,
      lastname: form.lastname,
      email: form.email,
      password: form.password,
    });

    if (res.status !== HttpStatus.OK) {
      throw new Error('Erro ao editar aluno...');
    }

    successNotify('Aluno editado com sucesso!');

    handleRouteToPath('/');

  } catch (error: any) {
    errorNotify(error?.message);
    hideButton.value = false;
  }
};
</script>

<style scoped>
.error { color: rgb(223, 9, 9); }
</style>
