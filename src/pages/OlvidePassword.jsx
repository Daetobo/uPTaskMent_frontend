import { Link } from "react-router-dom";
import { useState } from "react";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if (email === '' || email.length < 6) {
      setAlerta({
        msg: 'El email es obligatorio',
        error:true
      })
      return;
    }

    try {
      const url = '/usuarios/olvide-password'
      const { data } = await clienteAxios.post(url,{email})
      setAlerta({
        msg:data.msg,
        error:false
      })

      setEmail('')

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

  }

  const {msg} = alerta

  return (
    <>
      <form 
        className="mt-20 md:mt-10 mb-3 bg-white rounded px-10 py-10 shadow-lg md:w-96"
        onSubmit={handleSubmit}
      >
        { msg && <Alerta alerta={alerta}/> }
        <h2 className="text-2xl text-sky-600 font-black text-center mb-5">UpTaskMent</h2>
        <h5 className="text-center font-medium">¿No puedes iniciar sesión?</h5>
        
        <p className="mt-5 text-gray-500 font-medium text-xs">Enviaremos un enlace de recuperación a</p>
        <div className="mb-5">

          <input 
              type="email"
              placeholder="Introducir correo"
              className="w-full mt-2 p-3 border rounded bg-gray-50"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
          />
        </div>

        <input 
            type="submit"
            value="Enviar enlace de recuperación"
            className="bg-midnight-600 w-full py-3 mb-5 text-white font-bold rounded hover:cursor-pointer hover:bg-midnight-800 transition-colors my-5"
        />
          <nav className='text-center'>
            <Link
              className='block text-center my-2 mx-3 text-slate-500 capitalize text-sm hover:underline'
              to="/login"
            >
              Volver a Inicio de sesión
            </Link>
          </nav>
      </form>

    </>
  )
}

export default OlvidePassword