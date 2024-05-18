import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addassociate, addassociatesuccess, deleteassociate, deleteassociatesuccess, getassociate, getassociatesuccess, loadassociate, loadassociatefail, loadassociatesuccess, updateassociate, updateassociatesuccess } from "./Associate.Action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { AssociateService } from "../../services/associate.service";
import { showalert } from "../Common/App.Action";
import { Update } from "@ngrx/entity";
import { Associate } from "../Model/Associate.model";

@Injectable()
export class AssociateEffects {
    constructor(private action$: Actions, private service: AssociateService) {

    }

    _loadassociate = createEffect(() =>
        this.action$.pipe(
            ofType(loadassociate),
            exhaustMap((action) => {
                return this.service.GetAll().pipe(
                    map((data) => {
                        return loadassociatesuccess({ list: data })
                    }),
                    catchError((_error) => of(loadassociatefail({ errormessage: _error.message })))
                )
            })
        )
    );

    _addassociate = createEffect(() =>
        this.action$.pipe(
            ofType(addassociate),
            switchMap((action) => {
                return this.service.Create(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(addassociatesuccess({ inputdata: action.inputdata }),
                        showalert({ message: 'Create Successfully', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create associate', resulttype: 'fail' })))
                )
            })
        )
    );

    _getassociate = createEffect(() =>
        this.action$.pipe(
            ofType(getassociate),
            exhaustMap((action) => {
                return this.service.Getbycode(action.id).pipe(
                    map((data) => {
                        return getassociatesuccess({ obj: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to Get associate'+_error.message, resulttype: 'fail' })))
                )
            })
        )
    );

    _updateassociate = createEffect(() =>
        this.action$.pipe(
            ofType(updateassociate),
            switchMap((action) => {
                return this.service.Update(action.inputdata).pipe(
                    switchMap((data) => {
                        const  updaterecord:Update<Associate> = {
                            id:action.inputdata.id,
                            changes:action.inputdata
                        }
                        return of(updateassociatesuccess({ inputdata: updaterecord }),
                        showalert({ message: 'Update Successfully', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to update associate', resulttype: 'fail' })))
                )
            })
        )
    );

    _deleteassociate = createEffect(() =>
        this.action$.pipe(
            ofType(deleteassociate),
            switchMap((action) => {
                return this.service.Delete(action.code).pipe(
                    switchMap((data) => {
                        return of(deleteassociatesuccess({ code: action.code }),
                        showalert({ message: 'Delete Successfully', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to delete associate', resulttype: 'fail' })))
                )
            })
        )
    );

}