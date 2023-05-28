import * as React from 'react'
import {AuthProvider} from './AuthContext.jsx'
import { MainProvider } from "./MainContext.jsx";

function AppProviders({children}) {
  return (
    <AuthProvider>
      <MainProvider>{children}</MainProvider>
    </AuthProvider>
  )
}

export default AppProviders