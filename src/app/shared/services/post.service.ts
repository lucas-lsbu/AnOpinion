import { Injectable, inject } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, Query, addDoc, arrayRemove, arrayUnion, collection, collectionData, deleteDoc, doc, endAt, getDoc, getDocs, limit, orderBy, query, setDoc, startAfter, startAt, updateDoc, where } from '@angular/fire/firestore';
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

  async fetchPostsByUser(id: string, lastPost?: DocumentData) {
    console.log("fetching posts for: ", id);
    if (lastPost) {
      let q = query(this.postsRef, orderBy("createdDate", "desc"), limit(2), startAfter(lastPost));
      return await getDocs(q);
    } else {
      const c = query(collection(this.firestore, "posts"))
      const q = query(c, where("uid", "==", id), limit(2))
      
      return await getDocs(q);
    }
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

  async deletePost(postId: string) {
    await deleteDoc(doc(this.firestore, 'posts', postId));
    return this.router.navigate(['/dashboard/'])
  }

  async addToFavourites(postId: string) {

    // get information about current user to see if they have the post already in their favourites
    const usersRef = doc(this.firestore, 'users', this.currentUserUid);

    const response = await getDoc(usersRef)

    const currentUserData = response.data()

    // adding the favourite posts to a variable so we can use includes in it
    const currentUserFavouritePosts = currentUserData!['favouritePosts'];

    // check whether or not the array of favouritePosts contains the postId for the current post
    // if its in there then remove and vice versa if not then add.
    if(!currentUserFavouritePosts.includes(postId)) {
      console.log("ran the add")
      return updateDoc(usersRef, { favouritePosts: arrayUnion(postId) });
    } else {
      console.log("ran the remove")
      return updateDoc(usersRef, { favouritePosts: arrayRemove(postId) });
    }

  }

  async getFavouritePosts(postIds: Array<any>, iteration: number) {
    const docRef = doc(this.firestore, 'posts', postIds[iteration])
    return await getDoc(docRef);
  }
}
