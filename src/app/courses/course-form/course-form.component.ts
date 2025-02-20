import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,
              private service: CoursesService,
              private snackBar: MatSnackBar,
              private location: Location
  ) {
    this.form = this.formBuilder.group({
      name: [''],
      category: ['']
    });
  }

  ngOnInit(): void {

  }

  onSubmit(){
    this.service.save(this.form.value)
      .subscribe(result => this.onSucess(), error => this.onError());
  }

  onCancel(){
    this.location.back();
  }

  private onSucess(){
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 3000 })
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso', '', { duration: 5000 })
  }

}
