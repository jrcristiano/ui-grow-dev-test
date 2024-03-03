import api from "@/boot/api";
import { USER_URI } from "@/constants/user.api";
import { RequestParamsInterface as RequestParams } from "@/interfaces/request/request.params.interface";
import { StudentCreateInterface as StudentCreate } from "@/interfaces/users/request/student.create.interface";
import { StudentUpdateInterface as StudentUpdate } from "@/interfaces/users/request/student.update.interface";

export async function getStudentListPaginated(params: RequestParams) {
  if (params?.email) {
    return api.get(`${USER_URI}${params.email}/email`, { params });
  }

  return api.get(USER_URI, { params });
}

export async function deleteStudentByUuid(uuid: string) {
  return api.delete(`${USER_URI}${uuid}`);
}

export async function findStudentByUuid(uuid: string) {
  return api.get(`${USER_URI}${uuid}`);
}

export async function createStudent(student: StudentCreate) {
  return api.post(USER_URI, student);
}

export async function updateStudentByUuid(uuid: string, student: StudentUpdate) {
  return api.put(`${USER_URI}${uuid}`, student);
}
