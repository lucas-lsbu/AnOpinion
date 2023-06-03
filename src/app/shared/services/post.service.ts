import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, Query, addDoc, collection, collectionData, doc, endAt, getDoc, getDocs, limit, orderBy, query, setDoc, startAfter, startAt, where } from '@angular/fire/firestore';
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

    addDoc(this.postsRef, { ...post })
      .then((doc: DocumentReference) => {
        this.router.navigate(['/dashboard/post/' + doc.id]);
      })


    // OLD DOES -> NOT WORK EFFICIENTLY.
    // setDoc(doc(this.postsRef), { post })
  }

  async fetchPost(id: string) {
    const docRef = doc(this.firestore, 'posts', id);    
    return await getDoc(docRef);
  }

  async searchPost(searchText: string) {
    const q = query(collection(this.firestore, "posts"));
    let first = query(q, where("title", "==", searchText));
    return await getDocs(first);
  }

  async fetchPosts(lastPost?: any) {
    const q = query(collection(this.firestore, "posts"));
    if (lastPost) {
      let first = query(q, orderBy("createdDate", "desc"), limit(1), startAfter(lastPost));
      return await getDocs(first);
    } else {
      let first = query(q, orderBy("createdDate", "desc"), limit(1));
      return await getDocs(first);
    }
  }

}
