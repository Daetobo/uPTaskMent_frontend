import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState('');

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg:'Todos los cmapos son obligatorios',
        error: true
      });
    }

    try {
      const url = '/usuarios/login';
      const { data } = await clienteAxios.post(url,{email,password});
      setAuth(data)
      
      setAlerta({});

      localStorage.setItem('token',data.token);
      navigate('/equipos')

    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error: true
      })
    }

  }

  const { msg } = alerta;

  return (
    <>

      { msg && <Alerta alerta={alerta} /> }

      <form 
        className="mt-20 md:mt-10 mb-3 bg-white rounded px-10 py-10 shadow-lg"
        onSubmit={handleSubmit}
      >

        <h2 className="text-2xl text-sky-600 font-black text-center mb-5">UpTaskMent</h2>
        <h5 className="text-center font-medium">Inicia sesión para continuar</h5>
        
        <div className="my-5">

          <input 
              type="email"
              placeholder="Email de Registro"
              className="w-full mt-2 p-3 border rounded bg-gray-50"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">

          <input 
              type="password"
              placeholder="Password de Registro"
              className="w-full p-3 border rounded bg-gray-50"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
          />
        </div>

        <input 
            type="submit"
            value="Iniciar Sesión"
            className="bg-midnight-600 w-full py-3 mb-5 text-white font-bold rounded hover:cursor-pointer hover:bg-midnight-800 transition-colors my-5"
        />
          <nav className='lg:flex lg:justify-between'>
            <Link
              className='block text-center my-2 mx-3 text-slate-500 capitalize text-sm hover:underline'
              to="/registrar"
            >
              ¿No tienes una Cuenta? Regístrate
            </Link>
            <p className=" block my-2 text-center text-slate-500 text-sm">-</p>
            <Link
              className='block text-center my-2 mx-3 text-slate-500 capitalize text-sm hover:underline'
              to="/olvide-password"
            >
              Olvide Password
            </Link>
          </nav>
      </form>

    </>
  )
}

export default Login