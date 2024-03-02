<template>
  <v-container fluid class="mb-6 pe-0 justify-content-between">
    <v-row>
      <v-col cols="10">
        <h1>Lista de alunos</h1>
      </v-col>
      <v-col cols="auto">
        <v-btn
          @click="handleRouteToPath('/student/create')"
          color="blue-darken-1"
          density="default">
            <v-icon
              icon="mdi-plus"
              start
            ></v-icon> Novo aluno
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-text-field
          label="Pressione enter para pesquisar"
          append-inner-icon="mdi-magnify"
          variant="outlined">
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid class="px-0">
    <v-row>
      <v-col cols="12">
        <v-table
          height="50vh"
          fixed-header
        >
          <thead>
            <tr>
              <th class="text-left">
                ID do usuário
              </th>
              <th class="text-left">
                Nome
              </th>
              <th class="text-left">
                Sobrenome
              </th>
              <th class="text-left">
                E-mail
              </th>
              <th class="text-left">
                Registro acadêmico (RA)
              </th>
              <th class="text-left">
                CPF
              </th>
              <th class="text-left">
                Criado em
              </th>
              <th class="text-left">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="students.length > 0"
              v-for="(student, index) in students"
              :key="student.uuid"
              :class="[
                index % 2 === 0 ? 'py-2' : index % 5 == 0 ? 'py-8' : 'py-4',
                index % 2 === 0 ? 'bg-grey-lighten-4' : index % 5 === 0 ? '' : '',
                'px-2'
              ]"
            >
              <td>{{ student.uuid }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.lastname }}</td>
              <td>{{ student.email }}</td>
              <td>{{ student.ra }}</td>
              <td>{{ student.document }}</td>
              <td>{{ student.createdAt }}</td>
              <td>
                <v-btn
                  class="me-2"
                  @click="handleRouteToPath(`/student/${student.uuid}/edit`)"
                  color="blue-darken-1"
                  density="default">
                  <v-icon
                    icon="mdi-pencil"
                  ></v-icon>
                </v-btn>

                <v-btn
                  @click="() => handleDeleteDataByUuid(student.uuid)"
                  color="red-darken-1"
                  density="default">
                  <v-icon
                    icon="mdi-trash-can"
                  ></v-icon>
                </v-btn>
              </td>
            </tr>
            <tr class="bg-grey-lighten-4 text-center" v-else>
              <td colspan="8">Nenhum dado a ser exibido...</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col class="mx-auto" cols="4">
        <v-pagination
          @prev="() => console.log('Prev')"
            @next="() => console.log('Next')"
            :length="4">
        </v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import StudentInterface from '@/interfaces/users/response/student.interface';
import { deleteStudentByUuid, getStudentListPaginated } from '@/services/students.service';
import { format } from '@/utils/date.util';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const students = ref([] as StudentInterface[]);
const pagination = ref({
  total: 2,
  currentPage: 1,
  prevPage: null,
  nextPage: 2,
  lastPage: 1,
  perPage: 10,
});

const handleRouteToPath = (path: string) => router.push({ path });

const handleDeleteDataByUuid = async (uuid: string) => {
  try {
    if (!confirm('Tem certeza que deseja remover esse dado?')) {
      return;
    }

    const res = await deleteStudentByUuid(uuid);
    students.value = students.value.filter((student: StudentInterface) => student.uuid !== uuid);

  } catch (error) {
    // Alert com a seguinte mensagem: "Não foi possível deletar o aluno"
  }
}

const handleNextPage = () => console.log('Next page...');

const handlePrevPage = () => console.log('Prev page...');

const handleStudentListPaginated = async () => {
  try {
    const { prevPage, perPage } = pagination.value;
    const page = prevPage === null ? 1 : prevPage;

    const res = await getStudentListPaginated(page, perPage);

    students.value = res.data.data.map((student: StudentInterface) => {
      student.createdAt = format(student.createdAt);
      return student;
    });

    pagination.value = res.data.pagination;
  } catch (error) {
    // Alert com a seguinte mensagem: "Não foi possível buscar lista de dados de alunos."

  }
}

onMounted(async () => {
  await handleStudentListPaginated();
});
</script>
