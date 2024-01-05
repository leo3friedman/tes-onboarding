import { RequestHandler } from "express";
import TaskModel from "src/models/task";

export const getAllTasks: RequestHandler = async (req, res, next) => {
  try {
    const tasks = (await TaskModel.find()).sort(
      (a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime(),
    );
    res.status(200).json({ tasks });
  } catch (error) {
    next(error);
  }
};
