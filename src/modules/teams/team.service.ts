import { HttpError } from "../../lib/httpError";
import { CreateTeamDtoType, DeleteTeamDtoType, GetTeamByYearDtoType, UpdateTeamDtoType } from "./team.dto";
import Supabase from "../../lib/supabase";

class TeamService {
      createTeam = async (team: CreateTeamDtoType) => {
            const { data, error } = await Supabase.adminClient().from('team').insert(team).select().single();
            if (error) {
                  throw new HttpError(400, error.message);
            }
            return data;
      }

      updateTeam = async (team: UpdateTeamDtoType) => {
            const { data, error } = await Supabase.adminClient().from('team').update(team).eq('id', team.id).select().single();
            if (error) {
                  throw new HttpError(400, error.message);
            }
            return data;
      }

      deleteTeam = async ({ id }: DeleteTeamDtoType) => {
            const { data, error } = await Supabase.adminClient().from('team').delete().eq('id', id).select().single();
            if (error) {
                  throw new HttpError(400, error.message);
            }
            return data;
      }

      getTeam = async () => {
            const { data, error } = await Supabase.adminClient().from('team').select('*').order('starting_year', { ascending: false }).order('ending_year', { ascending: false });
            if (error) {
                  throw new HttpError(400, error.message);
            }
            return data;
      }

      getTeamByYear = async ({ starting_year, ending_year }: GetTeamByYearDtoType) => {
            const { data, error } = await Supabase.adminClient().from('team').select('*').eq('starting_year', starting_year).eq('ending_year', ending_year).order('starting_year', { ascending: false }).order('ending_year', { ascending: false });
            if (error) {
                  throw new HttpError(400, error.message);
            }
            return data;
      }
}

export default TeamService;