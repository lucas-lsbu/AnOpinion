import { Injectable, OnDestroy, inject } from '@angular/core';
import { Auth, User, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription!: Subscription;

  constructor() {
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      console.log(aUser);
    })
  }

  ngOnDestroy() {
    this.authStateSubscription.unsubscribe();
  }

  // Sign up
  async signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        throw new Error('Error code: ' + errorCode + ', Error message: ' + errorMessage);
      })
  }

  // Sign in
  async signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        throw new Error('Error code: ' + errorCode + ', Error message: ' + errorMessage);
        // console.log(errorCode, errorMessage);
      })
  }

}