
export interface LoginViewModel {
  email: string;
  password: string;
  token?: string;
  role?: string;

  // mówi o tym, o której godzinie dokładnie użytkonik się zalogował
  startTime?: string;
}
