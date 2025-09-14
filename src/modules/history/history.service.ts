import { HttpError } from "../../lib/httpError";
import Supabase from "../../lib/supabase";
import { CreateHistoryDtoType, UpdateHistoryDtoType, DeleteHistoryDtoType } from "./history.dto";

class HistoryService {
      createHistory = async (history: CreateHistoryDtoType) => {
            const isExist = await this.getHistoryByYears(history.starting_year, history.ending_year);
            if (isExist) {
                  throw new HttpError(400, "History already exists for this year");
            }
            const { data, error } = await Supabase.adminClient().from('history').insert(history).select().single();
            if (error) {
                  throw new HttpError(400, error.message);
            }
            return data;
      }

      getHistoryByYears = async (starting_year: number, ending_year: number) => {
            const { data, error } = await Supabase.adminClient().from('history').select('*').eq('starting_year', starting_year).eq('ending_year', ending_year).single();
            if (error) {
                  console.log(error);
                  if (error.code === 'PGRST116') {
                        return null;
                  }
                  throw new HttpError(400, error.message);
            }
            return data;
      }

      updateHistory = async (history: UpdateHistoryDtoType) => {
            if (history.starting_year !== undefined && history.ending_year !== undefined) {
                  const isExist = await this.getHistoryByYears(history.starting_year, history.ending_year);
                  console.log("isExist", isExist);
                  if (isExist) {
                        throw new HttpError(400, "History already exists for this year");
                  }
            }
            const { data, error } = await Supabase.adminClient().from('history').update(history).eq('id', history.id).select().single();
            if (error) {
                  throw new HttpError(400, error.message);
            }
            return data;
      }

      deleteHistory = async ({ id }: DeleteHistoryDtoType) => {
            const { data, error } = await Supabase.adminClient().from('history').delete().eq('id', id).select().single();
            if (error) {
                  throw new HttpError(400, error.message);
            }
            return data;
      }

      getHistory = async () => {
            const { data, error } = await Supabase.adminClient().from('history').select('*').order('starting_year', { ascending: false }).order('ending_year', { ascending: false });
            if (error) {
                  throw new HttpError(400, error.message);
            }
            return data;
      }
}

export default HistoryService;