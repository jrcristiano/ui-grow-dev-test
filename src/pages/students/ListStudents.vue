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
      <v-col cols="11">
        <v-text-field
          v-model="search"
          @change="handleSearch"
          label="Pressione enter para pesquisar E-mail"
          append-inner-icon="mdi-magnify"
          variant="outlined">
        </v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn
          variant="tonal"
          color="blue-darken-1"
          @click="handleResetSearch"
          size="x-large">
          <v-icon icon="mdi-restart"></v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid class="px-0">
    <v-row>
      <v-col cols="12">
        <v-table
          height="60vh"
          fixed-header
        >
          <thead>
            <tr>
              <th class="text-left">
                ID
              </th>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Lastname
              </th>
              <th class="text-left">
                E-mail address
              </th>
              <th class="text-left">
                RA
              </th>
              <th class="text-left">
                CPF
              </th>
              <th class="text-left">
                Created at
              </th>
              <th class="text-left">
                Actions
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
              <td>{{ student.cpf }}</td>
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
        <v-col class="mx-auto" cols="4">
        <v-pagination
          v-model="pagination.currentPage"
          @prev="handlePrevPage"
          @next="handleNextPage"
          v-on:last="pagination.lastPage"
          :length="pagination.lastPage">
        </v-pagination>
      </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import HttpStatus from '@/enums/http.status.enum';
import { RequestParamsInterface } from '@/interfaces/request/request.params.interface';
import StudentInterface from '@/interfaces/users/response/student.interface';
import { deleteStudentByUuid, getStudentListPaginated } from '@/services/students.service';
import { formatCPF } from '@/utils/cpf.util';
import { format } from '@/utils/date.util';
import { errorNotify, successNotify } from '@/utils/notify.util';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const search = ref('');
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

    if (res.status !== HttpStatus.OK) {
      throw new Error('Ocorreu um erro ao remover usuário.')
    }

    students.value = students.value.filter((student: StudentInterface) => student.uuid !== uuid);
    successNotify('Aluno removido com sucesso.');

  } catch (error: any) {
    errorNotify(error.message);
  }
}

const handleNextPage = async () => {
  try {
    const res = await getStudentListPaginated({
      page: pagination.value.currentPage,
    });

    students.value = res.data.data;
    pagination.value = res.data.pagination;

    students.value = handleFormatStudentList(res.data.data);

  } catch (error: any) {
    errorNotify(error.message);
  }
}

const handlePrevPage = async () => {
  try {
    const res = await getStudentListPaginated({
      page: pagination.value.currentPage,
  });

    students.value = res.data.data;
    pagination.value = res.data.pagination;

    students.value = handleFormatStudentList(res.data.data);

  } catch (error: any) {
    errorNotify(error.message);
  }
}

const handleFormatStudentList = (students: StudentInterface[]) => {
  return students.map((student: StudentInterface) => {
    student.cpf = formatCPF(student.cpf);
    student.createdAt = format(student.createdAt);
    return student;
  });
}

const handleSearch = async (event: any) => {
  try {
    if (event.target.value == '') {
      return;
    }

    const res = await handleStudentListByEmailPaginated({
      email: event.target.value,
      perPage: pagination.value.perPage,
      page: pagination.value.currentPage,
    });

    students.value = handleFormatStudentList(res?.data.data);

    pagination.value = res?.data.pagination;

  } catch (error: any) {
    errorNotify('Erro ao buscar lista de alunos.');
  }
}

const handleResetSearch = async () => {
  try {
    if (!search.value) {
      return;
    }

    search.value = '';
    await handleStudentListPaginated();
  } catch (error: any) {
    errorNotify('Erro ao limpar campo de pesquisar.');
  }
}

const handleStudentListPaginatedByPage = async (page: number) => {
  try {
    const { perPage } = pagination.value;

    const res = await getStudentListPaginated({ page, perPage });

    students.value = handleFormatStudentList(res.data.data);

    pagination.value = res.data.pagination;
  } catch (error: any) {
    errorNotify('Erro ao buscar lista de alunos.');
  }
}

const handleStudentListByEmailPaginated = async ({
  perPage,
  page,
  email,
}: RequestParamsInterface) => {
  try {
    const res = await getStudentListPaginated({
      page,
      perPage,
      email,
    });

    students.value = handleFormatStudentList(res.data.data);

    pagination.value = res.data.pagination;
    return res;
  } catch (error: any) {
    errorNotify('Erro ao buscar lista de alunos.');
  }
}

const handleStudentListPaginated = async () => {
  try {
    const { prevPage, perPage } = pagination.value;
    const page = prevPage === null ? 1 : prevPage;

    const res = await getStudentListPaginated({ page, perPage });

    students.value = handleFormatStudentList(res.data.data);

    pagination.value = res.data.pagination;
    return res;
  } catch (error: any) {
    errorNotify('Erro ao buscar lista de alunos.');
  }
}

onMounted(async () => {
  await handleStudentListPaginated();
});

watch(() => pagination.value.currentPage, async (newCurrentPage: number) => {
  await handleStudentListPaginatedByPage(newCurrentPage);
});

</script>
