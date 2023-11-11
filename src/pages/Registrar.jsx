import { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios.jsx";
import Alerta from "../components/Alerta.jsx";

const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    
    // los campos son obligatorios
    if ([nombre,email,user,password,repetirPassword].includes('')) {
      setAlerta({
        msg:'todos los campos son obligatorios',
        error:true
      })
      return
    }

    //validar contraseñas
    if (password !== repetirPassword) {
      setAlerta({
        msg:'las contraseñas no son iguales',
        error:true
      })
      return
    }

    //Longitud contraseñas
    if (password.length < 6) {
      setAlerta({
        msg:'La contraseña es muy corta, debes agregar minimo 6 caracteres',
        error:true
      })
      return
    }

    setAlerta({})

    try {
      const { data } = await clienteAxios.post('/usuarios',{nombre,email,user,password})

      setAlerta({
        msg:data.msg,
        error: false
      })

      setNombre('');
      setEmail('');
      setUser('');
      setPassword('');
      setRepetirPassword('');

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }

  }

  const {msg} = alerta

  return (
    <>
       { msg && <Alerta alerta={alerta} /> }
      <form 
        className="mt-20 md:mt-10 mb-3 bg-white rounded-lg px-10 py-10 shadow"
        onSubmit={handleSubmit}
      >
        
        <h2 className="text-2xl text-sky-600 font-black text-center mb-5">UpTaskMent</h2>
        <h5 className="text-center font-medium">Regístrate para continuar</h5>

        <div className="my-5">

            <input 
              type="text"
              placeholder="Tu Nombre"
              className="w-full mt-3 p-3 border rounded bg-gray-50"
              id="nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
        </div>
        <div className="my-5">

            <input 
              type="email"
              placeholder="Email de Registro"
              className="w-full mt-3 p-3 border rounded bg-gray-50"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
        </div>
        <div className="my-5">

            <input 
              type="text"
              placeholder="Registre un usuario de Red"
              className="w-full mt-3 p-3 border rounded bg-gray-50"
              id="usuario"
              value={user}
              onChange={e => setUser(e.target.value)}
            />
        </div>
        <div className="my-5">

            <input 
              type="password"
              placeholder="Password de Registro"
              className="w-full mt-3 p-3 border rounded bg-gray-50"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
        </div>
        <div className="my-5">

            <input 
              type="password"
              placeholder="Repetir Password"
              className="w-full mt-3 p-3 border rounded bg-gray-50"
              id="password2"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
        </div>

        <input 
          type="submit"
          value="Crear Cuenta"
          className="bg-indigo-600 w-full py-3 mb-5 text-white font-bold rounded hover:cursor-pointer hover:bg-indigo-700 transition-colors"
        />
          <nav className='lg:flex lg:justify-between'>
            <Link
              className='block text-center my-2 mx-3 text-slate-500 capitalize text-sm hover:underline'
              to="/login"
            >
                ¿Ya tienes una cuenta? inicia sesión
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

export default Registrar