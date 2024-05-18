import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AssociateModel } from "../Model/Associate.model";
import { associateAdopter } from "./Associate.State";

const getassociatestate = createFeatureSelector<AssociateModel>('associate');

const associateSelector = associateAdopter.getSelectors();

export const getassociatelist = createSelector(getassociatestate,associateSelector.selectAll);

const selectedentities = createSelector(getassociatestate,associateSelector.selectEntities)

export const getassociate =(id:number) => createSelector(selectedentities,(state)=> state[id]);

export const getErrormessage= createSelector(getassociatestate,(state)=>state.errormessage);