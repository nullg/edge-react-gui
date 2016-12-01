import { combineReducers } from 'redux'
import { username } from './SignUp/Username/reducer'
import { pinNumber } from './SignUp/PinNumber/reducer'
import { loading } from './Loader/reducer'
import * as PasswordStates from './SignUp/Password/reducer'
import * as Loader from './Loader/reducer' 
import * as ErrorModal from './ErrorModal/reducer' 

const store = combineReducers({
	username,
	pinNumber,
	loading,
	password	: combineReducers({
		inputState		: PasswordStates.inputState,
		password 		: PasswordStates.password,
		passwordRepeat 	: PasswordStates.passwordRepeat
	}),
	loader 		: combineReducers({
		loading : 	Loader.loading,
		message :	Loader.message
	}),
	errorModal 	: combineReducers({
		visible : 	ErrorModal.visible,
		message :	ErrorModal.message
	})
})


export default store
