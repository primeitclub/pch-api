import { Request, Response } from "express";
import { HttpError } from "../../lib/httpError";
import { LoginDto, LoginResponseDto } from "./auth.dto";
import AuthService from "./auth.service";
import { env, logger } from "../../lib";
import { AuthenticatedRequest } from "../../utils/types";
class AuthController {
      // used arrow function to avoid binding the context to the class instance
      private authService = new AuthService();
      public login = async (req: Request, res: Response) => {
            try {
                  const parsed = LoginDto.safeParse(req.body);
                  if (!parsed.success) {
                        throw new HttpError(400, "Invalid request body", parsed.error.issues);
                  }
                  const data = await this.authService.login(parsed.data);
                  if (!data) {
                        throw new HttpError(401, "Invalid credentials");
                  }
                  res.cookie("access_token", data.session.access_token, {
                        httpOnly: true,
                        sameSite: "strict",
                        secure: env.NODE_ENV === "prod",
                        maxAge: 60 * 60 * 1000,
                  });
                  logger.info(data);
                  // const response = LoginResponseDto.parse({
                  //       access_token: data.session.access_token,
                  //       refresh_token: data.session.refresh_token,
                  //       user: data.user,
                  // });
                  res.json(LoginResponseDto.parse({
                        user: data.user,
                  }));
            } catch (error) {
                  logger.error(error);
                  if (error instanceof HttpError) {
                        res.status(error.status).json({ code: error.status, message: error.message, details: error.details });
                  } else {
                        res.status(500).json({ code: 500, message: "Internal server error", details: error });
                  }
            }
      }

      public me = async (req: AuthenticatedRequest, res: Response) => {
            try {
                  const user = await this.authService.me(req.user);
                  res.json(user);
            } catch (error) {
                  logger.error(error);
                  if (error instanceof HttpError) {
                        res.status(error.status).json({ code: error.status, message: error.message, details: error.details });
                  } else {
                        res.status(500).json({ code: 500, message: "Internal server error", details: error });
                  }
            }
      }
}

export default AuthController;