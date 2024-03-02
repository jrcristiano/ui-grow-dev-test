import api from "@/boot/api";
import { USER_URI } from "@/constants/user.api";

export async function getStudentListPaginated(page = 1, perPage = 10) {
  return api.get(USER_URI, {
    params: {
      page,
      perPage,
    }
  });
}

export async function deleteStudentByUuid(uuid: string) {
  return api.delete(`${USER_URI}${uuid}`);
}
