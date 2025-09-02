import { HttpError } from "../../lib/httpError";
import Supabase from "../../lib/supabase";
import { CreateHistoryDtoType, UpdateHistoryDtoType, DeleteHistoryDtoType } from "./history.dto";

class HistoryService {
      createHistory = async (history: CreateHistoryDtoType) => {
            const { data, error } = await Supabase.adminClient().from('history').insert(history).select().single();
            if (error) {
                  throw new HttpError(400, error.message);
            }
            return data;
      }

      updateHistory = async (history: UpdateHistoryDtoType) => {
            const { data, error } = await Supabase.adminClient().from('history').update(history).eq('id', history.id).select().single();
            if (error) {
                  throw new HttpError(400, error.message);
            }
            return data;
      }

      deleteHistory = async ({ id }: DeleteHistoryDtoType) => {
            console.log("id", id);
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