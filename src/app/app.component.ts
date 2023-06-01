import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AnOpinion';
  items$: Observable<any[]>;

  firestore: Firestore = inject(Firestore)

  constructor() {
    const aCollection = collection(this.firestore, 'Posts');
    this.items$ = collectionData(aCollection);
    this.items$.forEach(post => {
      console.log(post);
    });
  }
}
