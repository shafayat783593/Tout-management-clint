import React, { use } from 'react'
import { AuthContext } from '../Context/AuthContext'

function UseAuth() {

    const authInfo  =  use(AuthContext)
  return authInfo
}

export default UseAuth



































