import { TutorialService } from './../../services/tutorial.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.scss']
})
export class TutorialDetailsComponent implements OnInit, OnChanges {

  @Input() tutorial?: Tutorial;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  message = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(){
    this.message = '';
    this.currentTutorial = {...this.tutorial};
  }

  updatePublished(status: boolean){
    if(this.currentTutorial.key){
      this.tutorialService.update(this.currentTutorial.key, { published: status })
      .then(() => {
        this.currentTutorial.published = status;
        this.message = 'The status was update succesfully!';
      }).catch(err => console.log(err));
    }
  }

  updateTutorial(){
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description
    }

    if(this.currentTutorial.key) {
      this.tutorialService.update(this.currentTutorial.key, data)
        .then(() => this.message = 'The tutorial was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteTutorial(){
    if(this.currentTutorial.key){
      this.tutorialService.delete(this.currentTutorial.key).then(() => {
        this.refreshList.emit();
        this.message = 'The tutorial was updated succesfully!';
      }).catch(err => console.log(err));
    }
  }
}
