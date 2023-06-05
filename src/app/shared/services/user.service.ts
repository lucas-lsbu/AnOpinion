import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // firestore
  private firestore: Firestore = inject(Firestore);

  constructor() {
  }

  async getCurrentUserData(userId: string) {
    const docRef = doc(this.firestore, 'users', userId);
    return await getDoc(docRef);
  }


}
