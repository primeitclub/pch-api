import { createClient } from "@supabase/supabase-js";
import { env } from "./env";
import { HttpError } from "./httpError";

class Supabase {
      public static publicClient() {
            console.log(env.SUPABASE_URL.toString(), env.SUPABASE_PUBLISHABLE_KEY!);
            const client = createClient(env.SUPABASE_URL.toString(), env.SUPABASE_PUBLISHABLE_KEY!, {
                  auth: {
                        autoRefreshToken: false,
                        persistSession: false,
                  },
                  global: {
                        headers: {
                              "X-Client-Info": "pch-api/public",
                        },
                  },
            });
            return client;
      }

      public static adminClient() {
            const client = createClient(env.SUPABASE_URL.toString(), env.SUPABASE_SECRET_KEY!, {
                  auth: {
                        autoRefreshToken: false,
                        persistSession: false,
                  },
                  global: {
                        headers: {
                              "X-Client-Info": "pch-api/private",
                        },
                  },
            });
            return client;
      }

      public static async getSupabaseJWKs() {
            return env.SUPABASE_URL.toString() + "/auth/v1/.well-known/jwks.json"
      }

      public static async getSupabaseUser(token: string) {
            const { data, error } = await Supabase.adminClient().auth.getUser(token);
            if (error) {
                  throw new HttpError(400, error.message);
            }
            return data;
      }

      public static async createBucket(name: string) {
            const { data, error } = await Supabase.adminClient().storage.createBucket(name, {
                  public: false,
                  allowedMimeTypes: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
                  fileSizeLimit: '100KB',
            });
            if (error) {
                  throw new HttpError(400, error.message);
            }
            return data;
      }
      public static async getBucket(name: string) {
            const { data, error } = await Supabase.adminClient().storage.getBucket(name);
            if (error) {
                  throw new HttpError(400, error.message);
            }
            return data;
      }

      public static async uploadFile(bucketName: string, filePath: string, file: Express.Multer.File) {
            console.log("uploadFile", bucketName, filePath, file);
            const { data, error } = await Supabase.adminClient().storage.from(bucketName).upload(filePath, file.buffer, {
                  upsert: true,
                  contentType: file.mimetype,
            });
            const imgData = Supabase.adminClient().storage.from(bucketName).getPublicUrl(filePath);
            console.log("data in uploadFile", data);
            if (error) {
                  console.log("error in uploadFile", error);
                  throw new HttpError(400, error.message);
            }
            return { ...data, imageUrl: imgData.data.publicUrl };
      }
      public static async deleteFile(bucketName: string, filePath: string) {
            const { data, error } = await Supabase.adminClient().storage.from(bucketName).remove([filePath]);
            if (error) {
                  throw new HttpError(400, error.message);
            }
            return data;
      }
}

export default Supabase;