import { HttpError } from "../../lib/httpError";
import { AuthenticatedRequest } from "../../utils/types";
import { AllHistoryDto, CreateHistoryDto, DeleteHistoryDto, HistoryDto, UpdateHistoryDto } from "./history.dto";
import HistoryService from "./history.service";
import { Response } from "express";

class HistoryController {
      private historyService = new HistoryService();

      createHistory = async (req: AuthenticatedRequest, res: Response) => {
            try {
                  const parsed = CreateHistoryDto.safeParse({
                        ...req.body,
                        user_id: req.user.id,
                  });
                  if (!parsed.success) {
                        throw new HttpError(400, "Invalid request body", parsed.error.issues);
                  }
                  const history = await this.historyService.createHistory({
                        ...parsed.data,
                        user_id: req.user.id,
                        created_at: new Date().toISOString(),
                  });
                  res.status(201).json({
                        message: "History created successfully",
                        data: HistoryDto.parse(history),
                  });
            } catch (error) {
                  if (error instanceof HttpError) {
                        res.status(error.status).json({ code: error.status, message: error.message, details: error.details });
                  } else {
                        res.status(500).json({ code: 500, message: "Internal server error" });
                  }
            }
      }

      getHistory = async (req: AuthenticatedRequest, res: Response) => {
            try {
                  const history = await this.historyService.getHistory();
                  res.status(200).json({
                        message: "History fetched successfully",
                        data: AllHistoryDto.parse(history),
                  });
            } catch (error) {
                  if (error instanceof HttpError) {
                        res.status(error.status).json({ code: error.status, message: error.message, details: error.details });
                  } else {
                        res.status(500).json({ code: 500, message: "Internal server error" });
                  }
            }
      }
      updateHistory = async (req: AuthenticatedRequest, res: Response) => {
            try {
                  console.log("req.body", req.body);
                  const parsed = UpdateHistoryDto.safeParse(
                        {
                              id: req.params.id,
                              ...req.body,
                              user_id: req.user.id,
                        });
                  if (!parsed.success) {
                        throw new HttpError(400, "Invalid request body", parsed.error.issues);
                  }

                  const history = await this.historyService.updateHistory({
                        ...parsed.data,
                        updated_at: new Date().toISOString(),
                  });
                  res.status(200).json({
                        message: "History updated successfully",
                        data: HistoryDto.parse(history),
                  });
            } catch (error) {
                  console.log("error", error);
                  if (error instanceof HttpError) {
                        res.status(error.status).json({ code: error.status, message: error.message, details: error.details });
                  } else {
                        res.status(500).json({ code: 500, message: "Internal server error" });
                  }
            }
      }

      deleteHistory = async (req: AuthenticatedRequest, res: Response) => {
            try {
                  const parsed = DeleteHistoryDto.safeParse({
                        id: req.params.id,
                        deleted_at: new Date().toISOString(),
                  });

                  if (!parsed.success) {
                        throw new HttpError(400, "Invalid request body", parsed.error.issues);
                  }
                  await this.historyService.deleteHistory({ id: req.params.id, deleted_at: new Date().toISOString() });
                  res.status(200).json({
                        message: "History deleted successfully",
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

export default HistoryController;