import { createEntityAdapter } from "@ngrx/entity";
import { Associate, AssociateModel } from "../Model/Associate.model";

export const associateAdopter = createEntityAdapter<Associate>();

export const AssociateState:AssociateModel=associateAdopter.getInitialState();