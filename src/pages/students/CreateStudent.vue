<template>
  <v-container fluid class="mb-6 justify-content-between">
    <v-row>
      <v-col cols="10">
        <h1>Novo aluno</h1>
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
            v-model="form.cpf"
            label="CPF"
            @blur="v$.cpf.$touch()"
            required
          ></v-text-field>

          <p
            v-if="v$.cpf.required.$invalid && v$.cpf.$dirty"
            class="error">
              CPF: {{ v$.email.required.$message }}
          </p>
          <p
            v-if="v$.cpf.minLength.$invalid && v$.cpf.$dirty"
            class="error"
          >
            CPF: {{ v$.cpf.minLength.$message }}
          </p>
          <p
            v-if="v$.cpf.maxLength.$invalid && v$.cpf.$dirty"
            class="error"
          >
          CPF: {{ v$.cpf.maxLength.$message }}
        </p>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            variant="outlined"
            v-model="form.ra"
            label="Registro acadêmico (RA)"
            @blur="v$.ra.$touch()"
            required>
          </v-text-field>
          <p
            v-if="v$.ra.required.$invalid && v$.ra.$dirty"
            class="error">
              RA: {{ v$.ra.required.$message }}
          </p>

          <p
            v-if="v$.ra.minLength.$invalid && v$.ra.$dirty"
            class="error">
            RA: {{ v$.ra.minLength.$message }}
          </p>

          <p
            v-if="v$.ra.maxLength.$invalid && v$.ra.$dirty"
            class="error">
              RA: {{ v$.ra.maxLength.$message }}
          </p>
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

<style scoped>
.error { color: rgb(223, 9, 9); }
</style>

<script lang="ts" setup>
import HttpStatus from '@/enums/http.status.enum';
import { createStudent } from '@/services/students.service';
import { errorNotify, successNotify } from '@/utils/notify.util';
import useVuelidate from '@vuelidate/core';
import { email, maxLength, minLength, required } from '@vuelidate/validators';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleRouteToBack = () => router.go(-1);

const form = reactive({
  name: '',
  lastname: '',
  email: '',
  password: '',
  cpf: '',
  ra: ''
});

const hideButton = ref(false);

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
    cpf: {
      required,
      minLength: minLength(11),
      maxLength: maxLength(11),
    },
    ra: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(8),
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(255),
    },
  }
})

const v$ = useVuelidate(rules, form)

const handleRouteToPath = (path: string) => router.push({ path });

const submitForm = async () => {
  try {
    hideButton.value = true;

    const isValid = await v$.value.$validate();
    if (!isValid) {
      throw new Error('Dados inválidos: verifique as informações e tente novamente.');
    }

    const res = await createStudent({
      name: form.name,
      lastname: form.lastname,
      email: form.email,
      ra: form.ra,
      cpf: form.cpf,
      password: form.password,
    });

    if (res.status !== HttpStatus.CREATED) {
      throw new Error('Erro ao cadastrar aluno...');
    }

    successNotify('Aluno cadastrado com sucesso!');

    handleRouteToPath('/');

  } catch (error: any) {
    hideButton.value = false;
    errorNotify(error.message);
  }
};

</script>
