import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {

  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [cambioPassword, setCambioPassword] = useState(false);

  const params = useParams();
  const {token} = params;

  useEffect(() => {
    const comprobarToken = async () =>{
      try {
        const url = `/usuarios/olvide-password/${token}`
        const { data } = await clienteAxios(url)

        setAlerta({
          msg:data.msg,
          error:false
        });

        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg:error.response.data.msg,
          error: true
        })
      }
    }
    return () => comprobarToken()
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (password === '') {
      setAlerta({
        msg:'Debe ingresar una contraseña',
        error:true
      })
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg:'Contraseña muy corta, debe contener minimo 6 caracteres',
        error:true
      })
      return;
    }

    try {
      const url = `/usuarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url,{password});

      setAlerta({
        msg:data.msg,
        error:false
      });

      setCambioPassword(true)
      setPassword('');

    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error: true
      });
    }

  }

  const { msg } = alerta;
  return (
    <>
      { msg && <Alerta alerta={alerta} /> }

      {tokenValido && (
        <form 
          className="mt-20 md:mt-10 mb-3 bg-white rounded px-10 py-10 shadow-lg"
          onSubmit={handleSubmit}
        >
          
          <h2 className="text-2xl text-sky-600 font-black text-center mb-5">UpTaskMent</h2>
          <h5 className="text-center font-medium">Ingresa tu nueva contraseña para continuar</h5>
          
          <div className="my-5">

            <input 
                type="password"
                placeholder="Escribe tu nuevo Password"
                className="w-full mt-2 p-3 border rounded bg-gray-50"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
          </div>

          <input 
              type="submit"
              value="Guardar Nuevo Password"
              className="bg-midnight-600 w-full py-3 mb-5 text-white font-bold rounded hover:cursor-pointer hover:bg-midnight-800 transition-colors my-5"
          />
            {cambioPassword && (
              <nav className='text-center'>
              <Link
                className='block text-center my-2 mx-3 text-slate-500 capitalize text-sm hover:underline'
                to="/login"
              >
                Inicia Sesión
              </Link>
            </nav>
            )}
            
        </form>
      )};
    
    </>
  )
}

export default NuevoPassword