import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import Supabase from "../lib/supabase";
import { env } from "../lib/env";
import { HttpError } from "../lib/httpError";
import path from "path";
import fs from "fs";

export const upload = multer({
      storage: multer.diskStorage({
            destination: (req, file, cb) => {
                  cb(null, `public/${env.FOLDER_NAME}/`);
            },
            filename: (req, file, cb) => {
                  cb(null, file.originalname.split('.').slice(0, -1).join('.') + '-' + Date.now() + '.' + file.originalname.split('.').slice(-1)[0]);
            },
      }),
      fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
            const ok = ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.mimetype);
            if (ok) {
                  cb(null, true);
            }
            else {
                  const err = new HttpError(400, "Invalid file type");
                  cb(err as any, false);
            }
      },
      limits: {
            fileSize: 200 * 1024, // 200KB
      },
});

export const fileErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof HttpError) {
            res.status(err.status).json({ code: err.status, message: err.message, details: err.details });
      }
      else if (err instanceof multer.MulterError) {
            res.status(400).json({ code: 400, message: "Bad request", details: err.message });
      }
      else {
            res.status(500).json({ code: 500, message: "Internal server error" });
      }
};

export const handleUpload = async (req: Request, res: Response, next: NextFunction) => {
      try {
            const { file } = req;
            if (!file) {
                  // throw new HttpError(400, "File is required");
                  next();
                  return;
            }
            const filePath = `${env.FOLDER_NAME}/${file.filename}`;
            const data = await Supabase.uploadFile(env.BUCKET_NAME!, filePath, file);
            // req.body.img_sub_url = data.imageUrl.toString();
            req.body.img_url = data.imageUrl.toString();
            req.body.img_path = data.fullPath;
            req.body.file_path = filePath;
            // req.body.img_url = `${env.BASE_URL}/${env.FOLDER_NAME}/${file.filename}`;

            next();
      } catch (error) {
            if (error instanceof HttpError) {
                  res.status(error.status).json({ code: error.status, message: error.message, details: error.details });
            } else {
                  res.status(500).json({ code: 500, message: "Internal server error" });
            }
      }
};

export const deleteFile = async (filePath: string) => {
      try {
            fs.unlink(`public/${filePath}`, (err) => {
                  if (err) {
                        throw err;
                  } else {
                        return true;
                  }
            });
      } catch (error) {
            throw new HttpError(400, "Failed to delete file");
      }
};