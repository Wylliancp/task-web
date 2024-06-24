import { MatDialog } from '@angular/material/dialog';
import { TasksService } from './../../services/tasks.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { EResponsible } from 'src/app/models/EResponsible';
import { Tasks } from 'src/app/models/tasks';
import { TasksDialogComponent } from 'src/app/shared/tasks-dialog/tasks-dialog.component';
import { TasksResponse } from 'src/app/models/response/tasksResponse';

const ELEMENT_DATA: Tasks[] = [
  {id: 1, title: 'Hydrogen', responsible: EResponsible.Eu, dateCreate: '12/08/2023', dateEnd: '12/09/2023', finish: false},
  {id: 2, title: 'Helium', responsible: EResponsible.Eu, dateCreate: '12/08/2023', dateEnd: '12/09/2023', finish: false},
  {id: 3, title: 'Lithium', responsible: EResponsible.Eu, dateCreate: '12/08/2023', dateEnd: '12/09/2023', finish: false},
  {id: 4, title: 'Beryllium', responsible: EResponsible.Eu, dateCreate: '12/08/2023', dateEnd: '12/09/2023', finish: false},
  {id: 5, title: 'Boron', responsible: EResponsible.Eu, dateCreate: '12/08/2023', dateEnd: '12/09/2023', finish: false},
  {id: 6, title: 'Carbon', responsible: EResponsible.Eu, dateCreate: '12/08/2023', dateEnd: '12/09/2023', finish: false},
  {id: 7, title: 'Nitrogen', responsible: EResponsible.Eu, dateCreate: '12/08/2023', dateEnd: '12/09/2023', finish: false},
  {id: 8, title: 'Oxygen', responsible: EResponsible.Eu, dateCreate: '12/08/2023', dateEnd: '12/09/2023', finish: false},
  {id: 9, title: 'Fluorine', responsible: EResponsible.Eu, dateCreate: '12/08/2023', dateEnd: '12/09/2023', finish: false},
  {id: 10,title: 'Neon', responsible: EResponsible.Eu, dateCreate: '12/08/2023', dateEnd: '12/09/2023', finish: false},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ TasksService ]
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'title', 'responsible', 'dateCreate', 'dateEnd','finish', 'actions'];
  dataSource!: Tasks[];


  constructor(    public dialog: MatDialog
    ,public tasksService: TasksService ) {
    this.tasksService.getAll()
    .subscribe((data: Tasks[]) => {
      console.log(data);
      this.dataSource = data;
    });
    // this.dataSource = ELEMENT_DATA;//data;


   }

  ngOnInit(): void {
  }


  editElement(tasks: Tasks): void {
    this.openDialog(tasks);
  }

  deleteElement(id: number): void {
    this.tasksService.delete(id)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(p => p.id !== id);
      });
  }



  openDialog(tasks: Tasks | null): void {
    const dialogRef = this.dialog.open(TasksDialogComponent, {
      width: '250px',
      data: tasks === null ? {
        title: null,
        responsible: '',
        dataCreate: null,
        dataEnd: '',
        finish: '',
      } : {
        id: tasks.id,
        title: tasks.title,
        responsible: tasks.responsible,
        dataCreate: tasks.dateCreate,
        dataEnd: tasks.dateEnd,
        finish: tasks.finish,
      }
    });

  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined) {
      console.log(result);
      if (this.dataSource.map(p => p.id).includes(result.id)) {
        this.tasksService.finish(result)
          .subscribe((data: TasksResponse) => {
            const index = this.dataSource.findIndex(p => p.id === data.data.id);
            this.dataSource[index] = data.data;
            this.table.renderRows();
          });
      } else {
        this.tasksService.create(result)
          .subscribe((data: TasksResponse) => {
            this.dataSource.push(data.data);
            this.table.renderRows();
          });
      }
    }
  });
}
}


