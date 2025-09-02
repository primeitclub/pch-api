import { HttpError } from "../../lib/httpError";
import Supabase from "../../lib/supabase";
import { LoginDtoType } from "./auth.dto";

class AuthService {
      public async login({ email, password }: LoginDtoType) {
            const { data, error } = await Supabase.adminClient().auth.signInWithPassword({
                  email,
                  password,
            });

            if (error) {
                  throw new HttpError(400, error.message);
            }

            return data;
      }

      public async me(user: any) {
            const { data, error } = await Supabase.adminClient().auth.admin.getUserById(user.sub);
            if (error) {
                  throw new HttpError(400, error.message);
            }
            return data;
      }
}

export default AuthService;