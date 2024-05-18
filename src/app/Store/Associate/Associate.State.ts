import { createEntityAdapter } from "@ngrx/entity";
import { Associate, AssociateModel } from "../Model/Associate.model";

export const associateAdopter = createEntityAdapter<Associate>({
    selectId:(associate:Associate)=>associate.id,
    sortComparer:sortbyName
});

export const AssociateState:AssociateModel=associateAdopter.getInitialState({
    errormessage:'',
    isloading:false
});

export function sortbyName(a:Associate,b:Associate) {
    return a.name.localeCompare(b.name)
}