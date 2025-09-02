import { env, HttpError } from "../../lib";
import Supabase from "../../lib/supabase";
import { AuthenticatedRequest } from "../../utils/types";
import { CreateTeamDto, DeleteTeamDto, GetTeamByYearDto, TeamDto, UpdateTeamDto } from "./team.dto";
import TeamService from "./team.service";
import { Response } from "express";
class TeamController {
      private teamService = new TeamService()

      createTeam = async (req: AuthenticatedRequest, res: Response) => {
            try {
                  console.log("Req headers", req.headers);
                  const parsedStartingYear = parseInt(req.body.starting_year);
                  const parsedEndingYear = parseInt(req.body.ending_year);
                  const isLead = req.body.is_lead === 'true' ? true : false;

                  const parsed = CreateTeamDto.safeParse({
                        ...req.body,
                        user_id: req.user.id,
                        is_lead: isLead,
                        starting_year: parsedStartingYear,
                        ending_year: parsedEndingYear,
                        created_at: new Date().toISOString(),
                  });
                  console.log("parsed", parsed);
                  if (!parsed.success) {
                        console.log("Deleting file", req.body.img_url);
                        await Supabase.deleteFile(env.BUCKET_NAME!, req.body.img_path);
                        console.log("error in createTeam", parsed.error);
                        throw new HttpError(400, "Invalid request body", parsed.error.issues);
                  }
                  const team = await this.teamService.createTeam(parsed.data);
                  res.status(201).json({
                        message: "Team created successfully",
                        data: CreateTeamDto.parse(team),
                  });
            } catch (error) {
                  console.log("error in createTeam", error);
                  if (error instanceof HttpError) {
                        res.status(error.status).json({ code: error.status, message: error.message, details: error.details });
                  } else {
                        res.status(500).json({ code: 500, message: "Internal server error" });
                  }
            }
      }

      updateTeam = async (req: AuthenticatedRequest, res: Response) => {
            try {
                  const parsed = UpdateTeamDto.safeParse({
                        id: req.params.id,
                        ...req.body,
                        user_id: req.user.id,
                  });
                  if (!parsed.success) {
                        console.log("Deleting file", req.body.img_url);
                        await Supabase.deleteFile(env.BUCKET_NAME!, req.body.img_path);
                        console.log("error in updateTeam", parsed.error);
                        throw new HttpError(400, "Invalid request body", parsed.error.issues);
                  }
                  const team = await this.teamService.updateTeam({
                        ...parsed.data,
                        updated_at: new Date().toISOString(),
                  });
                  res.status(200).json({
                        message: "Team updated successfully",
                        data: UpdateTeamDto.parse(team),
                  });
            } catch (error) {
                  if (error instanceof HttpError) {
                        res.status(error.status).json({ code: error.status, message: error.message, details: error.details });
                  } else {
                        res.status(500).json({ code: 500, message: "Internal server error" });
                  }
            }
      }

      deleteTeam = async (req: AuthenticatedRequest, res: Response) => {
            try {
                  const parsed = DeleteTeamDto.safeParse({
                        id: req.params.id,
                        deleted_at: new Date().toISOString(),
                  });
                  if (!parsed.success) {
                        throw new HttpError(400, "Invalid request body", parsed.error.issues);
                  }
                  await this.teamService.deleteTeam(parsed.data);
                  res.status(200).json({
                        message: "Team deleted successfully",
                  });
            } catch (error) {
                  if (error instanceof HttpError) {
                        res.status(error.status).json({ code: error.status, message: error.message, details: error.details });
                  } else {
                        res.status(500).json({ code: 500, message: "Internal server error" });
                  }
            }
      }

      getTeamByYear = async (req: AuthenticatedRequest, res: Response) => {
            try {
                  const parsed = GetTeamByYearDto.safeParse({
                        starting_year: parseInt(req.body.starting_year),
                        ending_year: parseInt(req.body.ending_year),
                  });
                  if (!parsed.success) {
                        throw new HttpError(400, "Invalid request body", parsed.error.issues);
                  }
                  const team = await this.teamService.getTeamByYear(parsed.data);
                  res.status(200).json({
                        message: "Team by year fetched successfully",
                        data: TeamDto.parse(team),
                  });
            } catch (error) {
                  if (error instanceof HttpError) {
                        res.status(error.status).json({ code: error.status, message: error.message, details: error.details });
                  } else {
                        res.status(500).json({ code: 500, message: "Internal server error" });
                  }
            }
      }
}

export default TeamController;