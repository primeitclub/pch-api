import { env, HttpError, logger } from "../../lib";
import Mail from "../../lib/mail";
import Supabase from "../../lib/supabase";

class HealthService {
      static checkHealth = async () => {
            const { data, error } = await Supabase.adminClient().rpc('heartbeat');
            logger.info("Health Check: I am running", data);
            // await Mail.sendMail(env.EMAIL_TO, "Health check", "I am running");
            if (error) {
                  console.log("error in health service", error);
                  throw new HttpError(400, error.message);
            }
            return data;
      }
}

export default HealthService;