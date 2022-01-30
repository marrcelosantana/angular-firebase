import { TutorialService } from './../../services/tutorial.service';
import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.scss']
})
export class TutorialListComponent implements OnInit {

  tutorials?: Tutorial[];
  currentTutorial?: Tutorial;
  currentIndex = 1;
  title = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.tutorials = data;
    });
  }

  refreshList(){
    this.currentTutorial = undefined;
    this.currentIndex = - 1;
    this.retrieveTutorials();
  }

  setActiveTutorial(tutorial: Tutorial, index: number){
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(){
    this.tutorialService.deleteAll().then(() => this.refreshList()).catch(err => console.log(err));
  }

}
