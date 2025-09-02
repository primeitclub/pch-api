import { z } from "zod";

export const CreateTeamDto = z.object({
      id: z.string().optional(),
      name: z.string().min(1, "Name is required"),
      designation: z.string().min(1, "Designation is required"),
      role: z.string().min(1, "Role is required"),
      img_url: z.string().min(1, "Image URL is required"),
      is_lead: z.boolean().optional(),
      user_id: z.string().min(1, "User ID is required"),
      starting_year: z.number().min(1900, "Starting year must be greater than 1900").max(new Date().getFullYear(), "Starting year must be less than " + new Date().getFullYear()),
      ending_year: z.number().min(1900, "Ending year must be greater than 1900").max(new Date().getFullYear() + 1, "Ending year must be less than " + (new Date().getFullYear() + 1)),
      github_url: z.url("GitHub URL is invalid").optional(),
      linkedin_url: z.url("LinkedIn URL is invalid").optional(),
      instagram_url: z.url("Instagram URL is invalid").optional(),
      created_at: z.string().optional(),
});

export const UpdateTeamDto = z.object({
      id: z.string().min(1, "Id is required"),
      name: z.string().min(1, "Name is required"),
      designation: z.string().min(1, "Designation is required"),
      role: z.string().min(1, "Role is required"),
      img_url: z.string().min(1, "Image URL is required"),
      is_lead: z.boolean().optional(),
      user_id: z.string().min(1, "User ID is required"),
      starting_year: z.number().min(1900, "Starting year must be greater than 1900").max(new Date().getFullYear(), "Starting year must be less than " + new Date().getFullYear()),
      ending_year: z.number().min(1900, "Ending year must be greater than 1900").max(new Date().getFullYear() + 1, "Ending year must be less than " + (new Date().getFullYear() + 1)),
      github_url: z.url("GitHub URL is invalid").optional(),
      linkedin_url: z.url("LinkedIn URL is invalid").optional(),
      instagram_url: z.url("Instagram URL is invalid").optional(),
      updated_at: z.string().optional(),
});

export const TeamDto = z.array(z.object({
      id: z.string().min(1, "Id is required"),
      name: z.string().min(1, "Name is required"),
      designation: z.string().min(1, "Designation is required"),
      role: z.string().min(1, "Role is required"),
      img_url: z.string().min(1, "Image URL is required"),
      is_lead: z.boolean().optional(),
      user_id: z.string().min(1, "User ID is required"),
      starting_year: z.number().min(1900, "Starting year must be greater than 1900").max(new Date().getFullYear(), "Starting year must be less than " + new Date().getFullYear()),
      ending_year: z.number().min(1900, "Ending year must be greater than 1900").max(new Date().getFullYear() + 1, "Ending year must be less than " + (new Date().getFullYear() + 1)),
      github_url: z.url("GitHub URL is invalid").optional(),
      linkedin_url: z.url("LinkedIn URL is invalid").optional(),
      instagram_url: z.url("Instagram URL is invalid").optional(),
}));

export const DeleteTeamDto = z.object({
      id: z.string().min(1, "Id is required"),
      deleted_at: z.string().min(1, "Deleted at is required"),
});

export const GetTeamByYearDto = z.object({
      starting_year: z.number().min(1900, "Starting year must be greater than 1900").max(new Date().getFullYear(), "Starting year must be less than " + new Date().getFullYear()),
      ending_year: z.number().min(1900, "Ending year must be greater than 1900").max(new Date().getFullYear() + 1, "Ending year must be less than " + (new Date().getFullYear() + 1)),
});

export type TeamDtoType = z.infer<typeof TeamDto>;
export type CreateTeamDtoType = z.infer<typeof CreateTeamDto>;
export type UpdateTeamDtoType = z.infer<typeof UpdateTeamDto>;
export type DeleteTeamDtoType = z.infer<typeof DeleteTeamDto>;
export type GetTeamByYearDtoType = z.infer<typeof GetTeamByYearDto>;