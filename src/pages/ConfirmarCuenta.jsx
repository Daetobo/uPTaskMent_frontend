import { useState,useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({});
  const [cuentaCornfirmada, setCuentaConfirmada] = useState(false);

  const params = useParams()
  const { id } = params

  console.log(id)

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `http://localhost:4000/api/usuarios/confirmar/${id}`
        const { data } = await axios(url)
        setAlerta({
          msg:data.msg,
          error:false
        })
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg:error.response.data.msg,
          error: true
        })
      }
    }
    return () => confirmarCuenta()
  }, []);

  const {msg} = alerta

  return (
    <>
      <div className="mt-20 md:mt-10 mb-3 bg-white rounded px-10 py-10 shadow-lg md:w-96">
        {msg && <Alerta alerta={alerta} /> }
        <h2 className="text-2xl text-sky-600 font-black text-center mb-5">UpTaskMent</h2>
        {cuentaCornfirmada ? <h5 className="text-center font-medium">Tu cuenta se ha confirmado con éxito. Ahora puedes iniciar sesión.</h5>:<h5 className="text-center font-medium">Confirma tu cuenta para continuar</h5>}
        {cuentaCornfirmada && (
          <>
            <Link
              to='/login'
              className="block text-center mt-6 mx-3 text-slate-500 capitalize text-lg hover:underline"
            >
              Inicia sesión
            </Link>
          </>
          
        )}
        
      </div>
    </>
  )
}

export default ConfirmarCuenta