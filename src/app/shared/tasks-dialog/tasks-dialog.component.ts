import { Tasks } from 'src/app/models/tasks';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-tasks-dialog',
  templateUrl: './tasks-dialog.component.html',
  styleUrls: ['./tasks-dialog.component.css']
})
export class TasksDialogComponent implements OnInit {
  tasks!: Tasks;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Tasks,
  public dialogRef: MatDialogRef<TasksDialogComponent>) { }

  ngOnInit(): void {
    if (this.data.id != null) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }


}
