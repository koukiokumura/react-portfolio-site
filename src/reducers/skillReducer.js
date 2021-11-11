import { requestStates } from '../constans'

export const actionTypes = {
  initial: 'INITIAL',
  fetch: 'FETCHING',
  success: 'FETCH_SUCCESS',
  error: 'FETCH_ERROR'
}

export const initialState = {
  languageList: [],
  requestState: requestStates.idle,
}

//第一引数はstate,第二引数はアクション
export const skillReducer = (
  state, action
) => {
  switch (action.type) {
    //初期ステートと同じものを返す
    case actionTypes.initial: {
      return {
        languageList: [],
        requestState: requestStates.initial
      }
    }
    //第一引数stateは現在のステートオブジェクト。これを{ ...state }でスプレット構文で展開
    case actionTypes.fetch: {
      return {
        ...state,
        requestState: requestStates.loading
      }
    }
    /**データ取得時はrequestStateを変えるだけでなく、
    reducer関数の第二引数であるactionオブジェクトの中からレスポンスデータそのものを引き出して、
    ステートにセットしないといけない
    actionオブジェクトは以下のかたちになる想定で、action.payload.languageListでデータを引き出す。*/
    case actionTypes.success: {
      return {
        languageList: action.payload.languageList,
        requestState: requestStates.success,
      }
    }
    /**エラー時はAPIからの返り値がない、あるいは予期せぬところでエラーになるため、
     * languageListは存在しないもの([])としてセット
     * requestStateはもちろんrequestStates.errorを入れておく */
    case actionTypes.error: {
      return {
        languageList: [],
        requestState: requestStates.error
      }
    }
    default: {
      throw new Error()
    }
  }
}
