import { z } from "zod";

export const CreateHistoryDto = z.object({
      id: z.string().optional(),
      title: z.string().min(1, "Title is required").max(50, "Title must be less than 50 characters"),
      description: z.string().min(1, "Description is required").max(1000, "Description must be less than 1000 characters"),
      starting_year: z.number().min(1900, "Starting year must be greater than 1900").max(new Date().getFullYear(), "Starting year must be less than " + new Date().getFullYear()),
      ending_year: z.number().min(1900, "Ending year must be greater than 1900").max(new Date().getFullYear() + 1, "Ending year must be less than " + (new Date().getFullYear() + 1)),
      user_id: z.string(),
      created_at: z.string().optional(),
});

export const UpdateHistoryDto = z.object({
      id: z.string(),
      title: z.string().min(1, "Title is required").max(50, "Title must be less than 50 characters").optional(),
      description: z.string().min(1, "Description is required").max(1000, "Description must be less than 1000 characters").optional(),
      starting_year: z.number().min(1900, "Starting year must be greater than 1900").max(new Date().getFullYear(), "Starting year must be less than " + new Date().getFullYear()).optional(),
      ending_year: z.number().min(1900, "Ending year must be greater than 1900").max(new Date().getFullYear() + 1, "Ending year must be less than " + (new Date().getFullYear() + 1)).optional(),
      user_id: z.string(),
      updated_at: z.string().optional(),
});

export const DeleteHistoryDto = z.object({
      id: z.string(),
      deleted_at: z.string().optional(),
});

export const HistoryDto = z.array(z.object({
      id: z.string().optional(),
      title: z.string().min(1, "Title is required").max(50, "Title must be less than 50 characters"),
      description: z.string().min(1, "Description is required").max(1000, "Description must be less than 1000 characters"),
      starting_year: z.number().min(1900, "Starting year must be greater than 1900").max(new Date().getFullYear(), "Starting year must be less than " + new Date().getFullYear()),
      ending_year: z.number().min(1900, "Ending year must be greater than 1900").max(new Date().getFullYear() + 1, "Ending year must be less than " + (new Date().getFullYear() + 1)),
}));


export type CreateHistoryDtoType = z.infer<typeof CreateHistoryDto>;
export type UpdateHistoryDtoType = z.infer<typeof UpdateHistoryDto>;
export type DeleteHistoryDtoType = z.infer<typeof DeleteHistoryDto>;
export type HistoryDtoType = z.infer<typeof HistoryDto>;