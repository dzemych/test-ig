import React, { FC, useEffect, useState } from 'react'
import classes from './UsersList.module.sass'
import useHttp from '../hooks/useHttp'
import Loading from '../Loading/Loading'
import triangle from '../../assets/imgs/triangle_icon.png'


export interface IUser {
   accountType: string,
   currency: string,
   default: boolean,
   funds: number,
   id: number,
   isDemo: boolean,
   name: string,
   profitLoss: number,
   _id: number | string
}

const UsersList: FC = () => {

   const { loading, request } = useHttp()
   const [state, setState] = useState('idle')

   const [sort, setSort] = useState(['profitLoss', 'name'])
   const [users, setUsers] = useState<IUser[]>([])

   const getImgCls = (field) => [
      classes.sort_img,
      sort.includes(`-${field}`) && classes.rotated_img
   ].join(' ')

   const changeSort = field => {
      setSort(prev => {
         let newArr = [...prev]
         let fieldIndex = newArr.indexOf(field)

         if (fieldIndex < 0)
            fieldIndex = newArr.indexOf(`-${field}`)

         if (fieldIndex < 0)
            return [`-${field}`, ...newArr]

         if (fieldIndex >= 0) {
            const oldField = newArr.splice(fieldIndex, 1)[0]

            return [
               oldField.includes('-') ? field : `-${field}`,
               ...newArr
            ]
         }
      })
   }

   const sortUsers = (
      firstField: string = '',
      secondField: string = '',
      arr: IUser[] = []
   ) => {
      const compareNames = (a, b, field) => {
         if (a.name === b.name)
            return 0

         if (field.includes('-')) {
            return a.name.localeCompare(b.name)
         } else {
            return b.name.localeCompare(a.name)
         }
      }

      const compareProfitLoss = (a, b, field) => {
         if (a.profitLoss === b.profitLoss)
            return 0

         if (field.includes('-')) {
            return b.profitLoss - a.profitLoss
         } else {
            return a.profitLoss - b.profitLoss
         }
      }

      arr.sort((a, b) => {
         // 1) If first sort field is name
         if (firstField.includes('name')){
            const firstCompare = compareNames(a, b, firstField)

            // * If users has the same name compare by second field
            if (firstCompare === 0) {
               //Choose function for second field compare

               if (secondField.includes('profitLoss'))
                  compareProfitLoss(a, b, secondField)
            }

            return firstCompare
         }

         // 1) If first sort field is profitLoss
         if (firstField.includes('profitLoss')) {
            const firstCompare = compareProfitLoss(a, b, firstField)

            // * If users has the same profitLoss compare by second field
            if (firstCompare === 0) {
               //Choose function for second field compare

               if (secondField.includes('name'))
                  compareNames(a, b, secondField)
            }

            return firstCompare
         }

         return 0
      })
   }

   useEffect(() => {
      const fetchUsers = async () => {
         const response = await request('/accounts')

         // Something wierd is happening with API, and most part of users in array that we are getting
         // from response have only _id field
         const newUsers = response.filter(el => el.name)
         setUsers(newUsers)

         setState('loaded')
      }

      fetchUsers()
   }, [])

   useEffect(() => {
      if (state === 'loaded') {
         setUsers(prev => {
            let newUsers = [...prev]

            sortUsers(sort[0], sort[1], newUsers)

            return newUsers
         })
      }
   }, [sort, state])

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <div className={classes.sortBar}>

            </div>

            <div className={classes.list_container}>
               <div className={classes.list_header}>
                  <span onClick={() => changeSort('name')}>
                     Name
                     <img
                        className={getImgCls('name')}
                        src={triangle}
                        alt=''
                     />
                  </span>

                  <span onClick={() => changeSort('profitLoss')}>
                     Profit & Loss
                     <img
                        className={getImgCls('profitLoss')}
                        src={triangle}
                        alt=''
                     />
                  </span>

                  <span>Account Type</span>
               </div>

               { loading ?
                  <Loading/>:
                  <ul className={classes.list_items}>
                     {users.map(user => (
                        <li key={user.id} data-testid="user-item">
                           <span>{user.name}</span>

                           <span>{`${user.currency} ${user.profitLoss}`}</span>

                           <span>{user.accountType}</span>
                        </li>
                     ))}
                  </ul>
               }
            </div>
         </div>
      </div>
   )
}

export default UsersList