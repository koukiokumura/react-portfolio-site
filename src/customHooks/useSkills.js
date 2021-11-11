import { useEffect, useReducer } from 'react'
import axios from 'axios'

import { skillReducer, initialState, actionTypes } from '../reducers/skillReducer'

export const useSkills = () => {
  const [state, dispatch] = useReducer(skillReducer, initialState)

  useEffect(() => {
    //レンダリング初期時にはinitialの状態を、ローディングに変更
    dispatch({ type: actionTypes.fetch })
    axios.get('https://api.github.com/users/koukiokumura/repos')
      .then((response) => {
        //responseオブジェクトの中にdataというkeyとオブジェクトがあり、
        //さらにその中にあるlanguageというkeyに対応するvalueにプログラミング言語が入っている
        const languageList = response.data.map(res => res.language)
        //引数にallLanguageListを受け取り、それを整形して返す
        const countedLanguageList = generateLanguageCountObj(languageList)
        dispatch({ type: actionTypes.success, payload: { languageList: countedLanguageList } })
      })
      .catch(() => {
        dispatch({ type: actionTypes.error })
      })
  }, [])

  /**
   * 整形
   * 
   * @param {*} allLanguageList 
   * @returns 
   */
  const generateLanguageCountObj = (allLanguageList) => {
    //allLanguageListの中からnullじゃないものだけを抽出して新たに配列を生成
    const notNullLanguageList = allLanguageList.filter(language => language != null);
    //new Set()で重複値を取り除いた新たな配列を生成
    const uniqueLanguageList = [...new Set(notNullLanguageList)]

    //mapでuniqueLanguageListの中身の要素一つずつを評価し、新たな配列を生成
    return uniqueLanguageList.map(item => {
      return {
        language: item,
        count: allLanguageList.filter(language => language === item).length
      }
    })
  }

  /**
   * パーセンテージにして返す
   * 
   * @param {*} count 
   * @returns 
   */
  const converseCountToPercentage = (count) => {
    if (count > 10) {
      return 100
    }
    return count * 10
  }

  /**
   * skillの%が高い順にソート
   * 
   * @returns 
   */
  const sortedLanguageList = () => (
    state.languageList.sort((firstLang, nextLang) => nextLang.count - firstLang.count)
  )

  return [sortedLanguageList, state.requestState, converseCountToPercentage];
}

