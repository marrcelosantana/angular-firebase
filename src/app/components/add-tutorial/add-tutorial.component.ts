import { Tutorial } from './../../models/tutorial.model';
import { TutorialService } from './../../services/tutorial.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.scss']
})
export class AddTutorialComponent implements OnInit {

  tutorial = new Tutorial();
  submitted = false;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
  }

  newTutorial(){
    this.submitted = false;
    this.tutorial = new Tutorial();
  }

  saveTutorial(){
    this.tutorialService.create(this.tutorial).then(() => {
      this.submitted = true;
    })
  }
}
