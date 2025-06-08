import { db } from '../firebase/firebase';
import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user.repository";

const COLLECTION = 'users';

export class UserRepositoryImpl implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const snapshot = await db.collection(COLLECTION)
      .where('email', '==', email)
      .limit(1)
      .get();

    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as User;
  }

  async save(user: User): Promise<string> {
    const now = new Date();
    const data = { ...user, createdAt: now };
    const docRef = await db.collection(COLLECTION).add(data);
    return docRef.id;
  }
}