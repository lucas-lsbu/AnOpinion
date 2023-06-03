import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, Query, addDoc, arrayUnion, collection, collectionData, doc, endAt, getDoc, getDocs, limit, orderBy, query, setDoc, startAfter, startAt, updateDoc, where } from '@angular/fire/firestore';
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

    await addDoc(this.postsRef, { ...post })
      .then((document: DocumentReference) => {

        // add ID of post to post creating user document
        // make a reference to the user document, we already have user id with this.currentUserUid;
        // this uses an update to update the field in the user called createdPosts and adds the id of the post they created

        const usersRef = doc(this.firestore, 'users', this.currentUserUid);
        updateDoc(usersRef, { createdPosts: arrayUnion(document.id) })

        // route the user to their newly created post
        this.router.navigate(['/dashboard/post/' + document.id]);
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
