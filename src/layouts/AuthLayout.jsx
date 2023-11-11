import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>  
        <main className='container mx-auto md:flex md:justify-center'>
            <div>
                <Outlet />
            </div>
        </main>
    </>
  )
}

export default AuthLayout