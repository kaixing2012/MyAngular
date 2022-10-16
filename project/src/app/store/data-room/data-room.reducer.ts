import { DataRoom } from '@shared/models/data-room.model';
import { DataRoomAction } from './data-room.action';


export function dataRoomReducer(state: DataRoom, action: DataRoomAction): DataRoom {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        status: 'LOADING',
      };

    case 'SUCCESS':
      const room = new Map(state.collection);
      room.set(action.request.name, action.payload);

      return {
        ...state,
        status: 'SUCCESS',
        collection: room
      };

    case 'FAILURE':
      return {
        ...state,
        status: 'FAILURE'
      };

    default:
      return state;
  }
}
