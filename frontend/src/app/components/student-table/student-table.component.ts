import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import {AppServiceService} from '../../app-service.service';
@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  studentData: any;
  selected: any;

  constructor(private service : AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getStudentData();
  }

  addNewStudent(){
    this.router.navigate(['addStudent'])
  }

  editStudent(id){
    const navigationExtras: NavigationExtras = {
      state: {
        id : id
      }
    };
    this.router.navigate(['editStudent'], navigationExtras )
  }

  getStudentData(){
    this.service.getStudentData().subscribe((response)=>{
      this.studentData = Object.keys(response).map((key) => [response[key]]);
    },(error)=>{
      console.log('ERROR - ', error)
    })
  }

  deleteStudent(itemid){
    const student = {
      id: itemid
    }
    this.service.deleteStudent(student).subscribe((response)=>{
      this.getStudentData()
    })
  }

  search(value: string) {
    // Convert the search value to lowercase for case-insensitive search
    const searchValue = value.toLowerCase();
  
    // Check if the search value is empty
    if (searchValue.trim() === '') {
      // If the search value is empty, reset the student data to the original data
      this.getStudentData();
    } else {
      // If the search value is not empty, filter the student data based on the search value
      this.service.getStudentData().subscribe(
        (response) => {
          // Filter the student data based on the search value
          this.studentData = Object.keys(response)
            .map((key) => response[key])
            .filter((student) =>
              student.name.toLowerCase().includes(searchValue)
            );
        },
        (error) => {
          console.log('ERROR - ', error);
        }
      );
    }
  }
  
}
