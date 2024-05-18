import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addassociate, updateassociate } from '../../Store/Associate/Associate.Action';
import { Associate } from '../../Store/Model/Associate.model';
import { getassociate } from '../../Store/Associate/Associate.Selectors';

@Component({
  selector: 'app-addassociate',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatInputModule, MatSelectModule, MatRadioModule, MatCheckboxModule],
  templateUrl: './addassociate.component.html',
  styleUrl: './addassociate.component.css'
})
export class AddassociateComponent implements OnInit {
  title: string = 'Create Associate'
  isEdit: boolean = false;
  dialogdata: any;
  editcode!:number;
  editdata!:Associate;

  constructor(private builder: FormBuilder, private ref: MatDialogRef<AddassociateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store: Store
  ) {

  }

  ngOnInit(): void {
    this.dialogdata = this.data;
    this.title = this.dialogdata.title;
    this.editcode = this.dialogdata.code;
    if(this.editcode>0) {
      this.store.select(getassociate(this.editcode)).subscribe((res: any) => {
        this.editdata = res as Associate;
        this.associateForm.setValue({
          id: res.id,
          name: res.name,
          email: res.email,
          phone: res.phone,
          address: res.address,
          group: res.associategroup,
          type: res.type,
          status: res.status
        })
      });
    }
  }

  associateForm = this.builder.group({
    id: this.builder.control(0),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', [Validators.email, Validators.required]),
    phone: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    type: this.builder.control('CUSTOMER'),
    group: this.builder.control('level1'),
    status: this.builder.control(true)
  });

  SaveAssociate() {
    if (this.associateForm.valid) {
      const _obj: Associate = {
        id: this.associateForm.value.id as number,
        name: this.associateForm.value.name as string,
        email: this.associateForm.value.email as string,
        phone: this.associateForm.value.phone as string,
        type: this.associateForm.value.group as string,
        address: this.associateForm.value.address as string,
        associategroup: this.associateForm.value.type as string,
        status: this.associateForm.value.status as boolean,
      }
      if(_obj.id === 0) {
        this.store.dispatch(addassociate({ inputdata: _obj }));
      } else {
        this.store.dispatch(updateassociate({ inputdata: _obj }));
      }
      
      this.closePopup();
    }
  }

  closePopup() {
    this.ref.close();
  }
}
