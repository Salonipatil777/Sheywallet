import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PublicRoute = (props) => {
    const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("token")){
            navigate('/')
        }
    },[])
  return (
    <div>{props.children}</div>
  )
}

export default PublicRoute