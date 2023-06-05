import { Injectable, OnDestroy, inject } from '@angular/core';
import { Auth, User, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription!: Subscription;

  // firestore
  private firestore: Firestore = inject(Firestore);

  constructor() {

    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      // this just logs the user thats signed in or null if no one is signed in
      // console.log(aUser);
    })
  }

  // get current user id
  async getUser() {
    return this.authState$
  }

  // Sign up
  async signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        // This is where I can create the document for the user, adding their favouritePosts map and createdPosts map
        const user = userCredential.user;
        // reference to users collection
        const usersRef = collection(this.firestore, 'users');
        // make an object for user and set a document so I can give the new document for the user a specific ID
        const userObj = {
          createdPosts: [],
          favouritePosts: [],
          name: 'Anon A',
          avatar: 'https://firebasestorage.googleapis.com/v0/b/anopinion-537eb.appspot.com/o/icons%2Fusericon.png?alt=media&token=9c746ef2-3f02-4299-955d-5be075099f7a&_gl=1*dq5883*_ga*MzY3MTQ5MzI2LjE2ODU1ODA3NTE.*_ga_CW55HF8NVT*MTY4NTg5NTYzNi4yMS4xLjE2ODU4OTU3NTkuMC4wLjA.',
        }
        return setDoc(doc(usersRef, user.uid), userObj)
         
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

  // Sign out
  async signOut() {
    this.auth.signOut();
    window.location.reload();
    return;
  }

  ngOnDestroy() {
    this.authStateSubscription.unsubscribe();
  }

}