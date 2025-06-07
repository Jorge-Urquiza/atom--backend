
import { db } from '../firebase/firebase';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { Task } from '../../domain/entities/task';

const COLLECTION = 'tasks';

export class TaskRepositoryImpl implements TaskRepository {
  async findAllByUser(userId: string): Promise<Task[]> {
    const snapshot = await db.collection(COLLECTION)
      .where('userId', '==', userId)
      .where('deletedAt', '==', null)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Task));
  }

  async save(task: Task): Promise<string> {
    const now = new Date();
    const doc = await db.collection(COLLECTION).add({
      ...task,
      createdAt: now,
      updatedAt: null,
      deletedAt: null,
    });
    return doc.id;
  }

  async update(id: string, data: Partial<Task>): Promise<void> {
    await db.collection(COLLECTION).doc(id).update({
      ...data,
      updatedAt: new Date(),
    });
  }

  async delete(id: string): Promise<void> {
    await db.collection(COLLECTION).doc(id).update({
      deletedAt: new Date(),
      updatedAt: null,
    });
  }
}
