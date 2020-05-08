import { AuthActionResponses } from "../actions/authActions";
import { AuthValidationResponses } from "../logic/validateInputFormats";
import { useNavigation } from "@react-navigation/native";
import { fetchUserDataAction } from "../actions/fetchUserDataAction";
import { useDispatch, useSelector } from "react-redux";

const useReactToAuthResponses = ({ setNotifyUserWithMessage, handleValidationResponses }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const authData = useSelector((state: any) => state.authData)

  const reactToAuthResponses = (action) => {
    const payload = action.payload
    switch (action.type) {
      case AuthActionResponses.register_form_validation_failed:
        setNotifyUserWithMessage(handleValidationResponses(payload, 'register'))
        break
      case AuthActionResponses.login_form_validation_failed:
        setNotifyUserWithMessage({general: AuthValidationResponses.invalidLoginCredentials})
        break
      case AuthActionResponses.successfully_registered:
        dispatch(fetchUserDataAction(authData))
        navigation.navigate('Game')
        //@ navigate to ticktacktoe screen
        break
      case AuthActionResponses.successfully_logged_in:
        navigation.navigate('Game')
        //@ navigate to ticktacktoe screen
        break

      default:
        break;
    }
  }

  return { reactToAuthResponses }
}

export default useReactToAuthResponses