import { createReducer, on } from "@ngrx/store";
import { AssociateState, associateAdopter } from "./Associate.State";
import { addassociate, addassociatesuccess, deleteassociatesuccess, getassociatesuccess, loadassociatefail, loadassociatesuccess, openpopup, updateassociatesuccess } from "./Associate.Action";

const _AssociateReducer = createReducer(AssociateState,
    on(loadassociatesuccess, (state,action)=>{
        return associateAdopter.setAll(action.list,{
            ...state,
            errormessage:''
        });
    }),
    on(loadassociatefail, (state,action)=>{
        return {...state,errormessage:action.errormessage}
    }),
    on(addassociatesuccess, (state,action)=>{
        const _maxid= Math.max(...state.ids.map(item=> item as number));
        const _newdata={...action.inputdata};
        _newdata.id = _maxid+1;
        return associateAdopter.addOne(_newdata,state);
    }),
    on(updateassociatesuccess, (state,action) =>{
       return associateAdopter.updateOne(action.inputdata,state);
    }),
    on(deleteassociatesuccess, (state,action) =>{
       return associateAdopter.removeOne(action.code,state);
     })
)

export function AssociateReducer(state:any,action:any) {
    return _AssociateReducer(state,action);
}