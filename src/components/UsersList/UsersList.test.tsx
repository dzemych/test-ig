import { render, screen } from '@testing-library/react'
import axios from 'axios'
import UsersList from './UsersList'


jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Users list test', () => {
   let response

   beforeEach(() => {
      response = {
         statusText: 'OK',
         data: [
            {
               "_id":"5d9ddef4915161280000853b",
               "id":1,
               "name":"Spread bet",
               "profitLoss":0.23,
               "accountType":"IGSB",
               "currency":"$"
            },
            {
               "_id":"5d9ddef4915161280000853b",
               "id":2,
               "name":"second",
               "profitLoss":100,
               "accountType":"saaa",
               "currency":"$"
            },
            {
               "_id":"5d9ddef415161280000853b",
            },
         ]
      }
   })

   test('Renders users list', async () => {
      mockedAxios.request.mockReturnValue(response);
      render( <UsersList /> )

      const users = await screen.findAllByTestId('user-item')

      expect(axios.request).toBeCalledTimes(1)
      expect(users.length).toBe(2)
   })
})