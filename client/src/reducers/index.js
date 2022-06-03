/* eslint-disable import/prefer-default-export */
import { combineReducers } from 'redux';
import auth from './auth';
import currentNoteId from './currentNoteId';
import notes from './notes';
import savedStatus from './savedStatus';

export const reducers = combineReducers({ notes, savedStatus, currentNoteId, auth });
