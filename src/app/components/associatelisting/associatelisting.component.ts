import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { AddassociateComponent } from '../addassociate/addassociate.component';
import { Associate } from '../../Store/Model/Associate.model';
import { Store } from '@ngrx/store';
import { getErrormessage, getassociatelist } from '../../Store/Associate/Associate.Selectors';
import { deleteassociate, getassociate, loadassociate, openpopup } from '../../Store/Associate/Associate.Action';

@Component({
  selector: 'app-associatelisting',
  standalone: true,
  imports: [MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule],
  templateUrl: './associatelisting.component.html',
  styleUrl: './associatelisting.component.css'
})
export class AssociatelistingComponent implements OnInit {
  Associatelist!:Associate[];
  datasource:any;
  errormessage='';
  displayedColumns : string[] = ['name','email','phone','address','type','group','status','action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog,private store:Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadassociate());
    this.store.select(getErrormessage).subscribe(res=> {
      this.errormessage = res;
    })
    this.store.select(getassociatelist).subscribe(item => {
      this.Associatelist = item;
      this.datasource = new MatTableDataSource<Associate>(this.Associatelist);

      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      
    })
  }
  
  functionAdd() {
    this.openPopup(0,'Create Associate')
  }

  openPopup(code:number,title:string) {
    this.dialog.open(AddassociateComponent, {
      width: '50%',
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      data: {
        code:code,
        title:title
      }
    })
  }

  FunctionEdit(id:any) {
    this.openPopup(id,'Update associate');
    this.store.dispatch(getassociate({id:id}));
  }
  FunctionDelete(id:any) {
    if(confirm('do you want to remove?')) {
      this.store.dispatch(deleteassociate({code:id}));
    }
  }
}
