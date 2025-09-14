import { z } from "zod";

export const CreateTeamDto = z.object({
      id: z.string().optional(),
      name: z.string().min(1, "Name is required").regex(/^[A-Z]/, "Name must start with a capital letter"),
      designation: z.string().min(1, "Designation is required").regex(/^[A-Z]/, "Designation must start with a capital letter"),
      role: z.string().min(1, "Role is required").regex(/^[A-Z]/, "Role must start with a capital letter"),
      // img_sub_url: z.string().min(1, "Image URL is required"),
      img_url: z.string().min(1, "Image URL is required"),
      is_lead: z.boolean().optional(),
      user_id: z.string().min(1, "User ID is required"),
      starting_year: z.number().int().min(1900, "Starting year must be greater than 1900").max(new Date().getFullYear(), "Starting year must be less than " + new Date().getFullYear()),
      ending_year: z.number().int().max(new Date().getFullYear() + 1, "Ending year must be less than " + (new Date().getFullYear() + 1)),
      github_url: z.url().optional().or(z.literal("")),
      linkedin_url: z.url().optional().or(z.literal("")),
      instagram_url: z.url().optional().or(z.literal("")),
      created_at: z.string().optional(),
}).refine((data) =>
      data.ending_year === data.starting_year + 1, {
      message: "Ending year must be exactly one year greater than starting year",
      path: ["ending_year"],
});

export const UpdateTeamDto = z.object({
      id: z.string().min(1, "Id is required"),
      name: z.string().min(1, "Name is required").regex(/^[A-Z]/, "Name must start with a capital letter").optional(),
      designation: z.string().min(1, "Designation is required").regex(/^[A-Z]/, "Designation must start with a capital letter").optional(),
      role: z.string().min(1, "Role is required").regex(/^[A-Z]/, "Role must start with a capital letter").optional(),
      img_url: z.string().min(1, "Image URL is required").optional(),
      is_lead: z.boolean().optional(),
      user_id: z.string().min(1, "User ID is required"),
      starting_year: z.number().int().min(1900, "Starting year must be greater than 1900").max(new Date().getFullYear(), "Starting year must be less than " + new Date().getFullYear()).optional(),
      ending_year: z.number().int().max(new Date().getFullYear() + 1, "Ending year must be less than " + (new Date().getFullYear() + 1)).optional(),
      github_url: z.url().optional().or(z.literal("")),
      linkedin_url: z.url().optional().or(z.literal("")),
      instagram_url: z.url().optional().or(z.literal("")),
      updated_at: z.string().optional(),
})
      .refine(
            (data) => {
                  if (data.starting_year !== undefined && data.ending_year !== undefined) {
                        return data.ending_year === data.starting_year + 1;
                  }
                  return true;
            },
            {
                  message: "Ending year must be exactly one year greater than starting year",
                  path: ["ending_year"],
            }
      )

export const TeamDto = z.object({
      id: z.string().min(1, "Id is required"),
      name: z.string().min(1, "Name is required").regex(/^[A-Z]/, "Name must start with a capital letter"),
      designation: z.string().min(1, "Designation is required").regex(/^[A-Z]/, "Designation must start with a capital letter"),
      role: z.string().min(1, "Role is required").regex(/^[A-Z]/, "Role must start with a capital letter"),
      img_url: z.string().min(1, "Image URL is required"),
      is_lead: z.boolean().optional(),
      user_id: z.string().min(1, "User ID is required"),
      starting_year: z.number().int().min(1900, "Starting year must be greater than 1900").max(new Date().getFullYear(), "Starting year must be less than " + new Date().getFullYear()),
      ending_year: z.number().int().max(new Date().getFullYear() + 1, "Ending year must be less than " + (new Date().getFullYear() + 1)),
      github_url: z.url().optional().or(z.literal("")),
      linkedin_url: z.url().optional().or(z.literal("")),
      instagram_url: z.url().optional().or(z.literal("")),
});

export const DeleteTeamDto = z.object({
      id: z.string().min(1, "Id is required"),
      deleted_at: z.string().min(1, "Deleted at is required"),
});

export const GetTeamByYearDto = z.object({
      starting_year: z.number().min(1900, "Starting year must be greater than 1900").max(new Date().getFullYear(), "Starting year must be less than " + new Date().getFullYear()),
      ending_year: z.number().min(1900, "Ending year must be greater than 1900").max(new Date().getFullYear() + 1, "Ending year must be less than " + (new Date().getFullYear() + 1)),
});

export const AllTeamDto = z.array(TeamDto);
export type TeamDtoType = z.infer<typeof TeamDto>;
export type AllTeamDtoType = z.infer<typeof AllTeamDto>;
export type CreateTeamDtoType = z.infer<typeof CreateTeamDto>;
export type UpdateTeamDtoType = z.infer<typeof UpdateTeamDto>;
export type DeleteTeamDtoType = z.infer<typeof DeleteTeamDto>;
export type GetTeamByYearDtoType = z.infer<typeof GetTeamByYearDto>;