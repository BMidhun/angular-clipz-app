import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import IUser from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    this.userCollection = this.db.collection('users');
    this.isAuthenticated$ = this.auth.user.pipe(map((user) => !!user));
  }

  async createUser(userData: IUser) {
    if (!userData.password) throw new Error('Please provide a password');
    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email,
      userData.password
    );

    const userId = userCred.user?.uid;

    if (!userId) throw new Error('Failed to register user');

    await this.userCollection.doc(userId).set({
      email: userData.email,
      age: +userData.age,
      phone_number: userData.phone_number,
      name: userData.name,
    });
  }
}
