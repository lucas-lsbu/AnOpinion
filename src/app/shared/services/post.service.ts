import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Post } from './Post';
import { Auth, User, authState } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // auth 
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;

  currentUserUid: any;

  // firestore
  private firestore: Firestore = inject(Firestore);

  postsRef = collection(this.firestore, 'posts');

  constructor() {
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      this.currentUserUid = aUser?.uid;
    })
  }

  createPost(post: Post) {
    post.uid = this.currentUserUid;
    console.log('submitted: ' + post);
    setDoc(doc(this.postsRef), { post })
      .then(
        
      )
  }

}
