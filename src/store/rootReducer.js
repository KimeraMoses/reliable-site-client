import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import settlementReport from './modules/settlementReport/reducer';
import userReducer from './modules/auth/reducer';

const reducer = combineReducers({
  auth: userReducer,
  settlementsReports: settlementReport,
  form: formReducer,
});

export default reducer;
