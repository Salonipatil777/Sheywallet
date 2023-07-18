import React from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import PageTitle from '../../components/PageTitle'


const Home = () => {
  const {user} = useSelector(state=>state.users)
  const dispatch = useDispatch()
  return (
    <div>
      <PageTitle title={`
      Hello ${user.fname} ${user.lname}, Welcome to SHEYWALLET
      `}/>
      <div className='bg-tertiary p-2 mt-2 w-50 text-white br3 flex flex-col gap-1 upperCase'>
        <div className='flex justify-between'>
          <h1 className='text-md'>
            Account Number
          </h1>
          <h1 className='text-md'>
            {user._id}
          </h1>
        </div>
        <div className='flex justify-between'>
          <h1 className='text-md'>
            Balance
          </h1>
          <h1 className='text-md'>
            ${user.balance || 0}
          </h1>
        </div>
      </div>
      <div className='card p-2 mt-2 w-50 br3 flex flex-col gap-1 upperCase'>
        <div className='flex justify-between'>
          <h1 className='text-md'>
            First Name
          </h1>
          <h1 className='text-md'>
            {user.fname}
          </h1>
        </div>
        <div className='flex justify-between'>
          <h1 className='text-md'>
            Last Name
          </h1>
          <h1 className='text-md'>
            {user.lname}
          </h1>
        </div>
        <div className='flex justify-between'>
          <h1 className='text-md'>
            Mobile
          </h1>
          <h1 className='text-md'>
            {user.phone}
          </h1>
        </div>
        <div className='flex justify-between'>
          <h1 className='text-md'>
            Identification Type
          </h1>
          <h1 className='text-md'>
            {user.identificationtype}
          </h1>
        </div>
        <div className='flex justify-between'>
          <h1 className='text-md'>
            Identification Number
          </h1>
          <h1 className='text-md'>
            {user.identificationnumber}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Home
