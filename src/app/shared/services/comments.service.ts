import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDocs, limit, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private firestore: Firestore = inject(Firestore);

  constructor() {
  }

  async ngOnInit() {

  }

  async addComment(input: string, postId: string, currentUserId: string) {
    console.log('adding comment: ' + input, ', to post with id: ' + postId);

    const obj = {
      name: 'Anon A',
      commentBy: currentUserId,
      comment: input,
      replies: [],
      createdDate: new Date()
    }

    const postSubCollectionRef = collection(this.firestore, `posts/${postId}/comments`)

    return await addDoc(postSubCollectionRef, { ...obj })
  }

  async getComments(postId: string) {

    const q = query(collection(this.firestore, `posts/${postId}/comments`), limit(4));

    return await getDocs(q);
  }

}
