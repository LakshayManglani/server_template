import { v2 as cloudinary } from 'cloudinary';
import { fastifyPlugin } from 'fastify-plugin';

import { AppError } from '@/core/errors/app-error';

import type { UploadApiOptions, UploadApiResponse } from 'cloudinary';
import type { FastifyTypebox } from '@/types/fastify';

export interface Cloudinary {
  uploadStream(
    fileStream: NodeJS.ReadableStream,
    options?: UploadApiOptions,
  ): Promise<UploadApiResponse>;
  delete(publicId: string): void;
}

async function cloudinaryLoader(app: FastifyTypebox) {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_FOLDER } =
    app.secrets;

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });

  app.decorate('cloudinary', {
    async uploadStream(fileStream, options = {}) {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: CLOUDINARY_FOLDER,
            ...options,
          },
          (error, result) => {
            if (error) {
              if (error instanceof Error) {
                reject(error as Error);
                return;
              }

              reject(new AppError(error.message, 'CLOUDINARY_ERR_UNKNOWN'));
              return;
            }

            if (!result) {
              reject(new AppError('Empty result from cloudinary', 'CLOUDINARY_ERR_EMPTY_RESULT'));
              return;
            }

            resolve(result);
          },
        );

        fileStream.pipe(uploadStream);
      });
    },
    async delete(publicId) {
      await cloudinary.uploader.destroy(publicId);
    },
  });
}

export const cloudinaryPlugin = fastifyPlugin(cloudinaryLoader);
