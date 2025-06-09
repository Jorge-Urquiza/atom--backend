import { db } from "../firebase/firebase";
import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user.repository";
import { AppError } from "../../shared/app-error";
import { HttpStatusCode } from "../../shared/constants/http-status";

const COLLECTION = "users";

export class UserRepositoryImpl implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    try {
      const snapshot = await db
        .collection(COLLECTION)
        .where("email", "==", email)
        .where("deletedAt", "==", null)
        .limit(1)
        .get();

      if (snapshot.empty) return null;
      const doc = snapshot.docs[0];
      const data = doc.data();
      return { id: doc.id, ...data } as User;
    } catch (err) {
      throw new AppError(
        "Failed to fetch user by email",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async save(user: User): Promise<string> {
    try {
      const now = new Date();
      const data = { ...user, createdAt: now };
      const docRef = await db.collection(COLLECTION).add(data);
      return docRef.id;
    } catch (err) {
      throw new AppError(
        "Failed to save user",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}
