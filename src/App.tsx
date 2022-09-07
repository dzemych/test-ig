import React, { FC } from 'react'
import classes from './App.module.sass'
import Navigation from './components/Navigation/Navigation'
import UsersList from './components/UsersList/UsersList'


const App: FC = () => {
   return (
      <>
         <Navigation/>

         <div className={classes.container}>
            <UsersList/>
         </div>
      </>
   )
}

export default App