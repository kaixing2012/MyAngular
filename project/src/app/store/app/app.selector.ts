import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataRoom } from '@shared/models/data-room.model';

export const getDataRoom =  createSelector(
  createFeatureSelector<DataRoom>('dataRoom'),
  (state: DataRoom) => state
);
