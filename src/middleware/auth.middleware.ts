import { NextFunction, Response } from "express";
import Supabase from "../lib/supabase";
import { jwtVerify, createRemoteJWKSet } from "jose";
import { AuthenticatedRequest } from "../utils/types";
import { logger } from "../lib/logger";
import { HttpError } from "../lib/httpError";

const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      try {
            const token = req.cookies.access_token;
            logger.info(token);
            if (!token) {
                  return res.status(401).json({ code: 401, message: "Unauthorized" });
            }
            const jwks = await Supabase.getSupabaseJWKs();
            await jwtVerify(token, createRemoteJWKSet(new URL(jwks)), { algorithms: ["ES256"] });
            const user = await Supabase.getSupabaseUser(token);
            console.log("user", user);
            req.user = {
                  id: user.user.id,
                  email: user.user.email,
            };
            next();
      } catch (error) {
            console.log("error in auth middleware", error);
            if (error instanceof HttpError) {
                  return res.status(error.status).json({ code: error.status, message: error.message, details: error.details });
            }
            if (error instanceof Error) {
                  return res.status(400).json({ code: 400, message: "Bad request", details: error.message });
            }
            return res.status(401).json({ code: 401, message: "Unauthorized" });
      }
};

export default authenticate;