import { db } from "../firebase/firebase";
import { TaskRepository } from "../../domain/repositories/task.repository";
import { Task } from "../../domain/entities/task";
import { AppError } from "../../shared/app-error";
import { HttpStatusCode } from "../../shared/constants/http-status";

const COLLECTION = "tasks";

export class TaskRepositoryImpl implements TaskRepository {

  async findById(id: string): Promise<Task | null> {
    try {
      const doc = await db.collection(COLLECTION).doc(id).get();
      if (!doc.exists) return null;

      const data = doc.data();
      if (!data || data.deletedAt !== null) return null;

      return { id: doc.id, ...data } as Task;
    } catch (err) {
      throw new AppError(
        "Error retrieving task",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAllByUser(userId: string): Promise<Task[]> {
    try {
      const snapshot = await db
        .collection(COLLECTION)
        .where("userId", "==", userId)
        .where("completed", "==", false)
        .where("deletedAt", "==", null)
        .orderBy("createdAt", "desc")
        .get();

      return snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Task)
      );
    } catch (err) {
      console.log("test: ", err);
      throw new AppError(
        "Error retrieving tasks",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async save(task: Task): Promise<string> {
    try {
      const now = new Date();
      const doc = await db.collection(COLLECTION).add({
        ...task,
        createdAt: now,
        updatedAt: null,
        deletedAt: null,
      });
      return doc.id;
    } catch (err) {
      throw new AppError(
        "Error saving task",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: string, data: Partial<Task>): Promise<void> {
    try {
      await db
        .collection(COLLECTION)
        .doc(id)
        .update({
          ...data,
          updatedAt: new Date(),
        });
    } catch (err) {
      throw new AppError(
        "Error updating task",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await db.collection(COLLECTION).doc(id).update({
        deletedAt: new Date(),
        updatedAt: null,
      });
    } catch (err) {
      throw new AppError(
        "Error deleting task",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}
