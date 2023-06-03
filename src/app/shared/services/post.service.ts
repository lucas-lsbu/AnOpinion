import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, collectionData, doc, getDoc, getDocs, limit, query, setDoc, where } from '@angular/fire/firestore';
import { Post } from './Post';
import { Auth, User, authState } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      this.currentUserUid = aUser?.uid;
    })
  }

  async createPost(post: Post) {
    post.uid = this.currentUserUid;

    addDoc(this.postsRef, { post })
      .then((doc: DocumentReference) => {
        this.router.navigate(['/dashboard/post/' + doc.id]);
      })


    // OLD DOES -> NOT WORK EFFICIENTLY.
    // setDoc(doc(this.postsRef), { post })
  }

  async fetchPost(id: string) {
    const docRef = doc(this.firestore, 'posts/' + id);
    
    return getDoc(docRef).then((doc) => {
      return doc.data();
    })
  }

  async fetchPosts() {
    const q = query(this.postsRef, limit(3));

    return collectionData(q, {idField: 'id'})
  }

}
