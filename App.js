/* eslint-disable space-infix-ops */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react'
import { 
        StyleSheet,
        Text,
        View,
        FlatList,
        TouchableHighlight,
        Platform,
        ScrollView,
        TouchableWithoutFeedback,
        Keyboard,
       } from 'react-native'
import Cita from './components/Cita'
import Formulario from './components/Formulario'


export default function App() {

  const [mostrarForm, setMostrarForm] = useState(false);

  const [citas, setCitas] = useState([
    {id:"1", paciente : "Hook", propietario : "Jesus", sintomas : "No come"},
    {id:"2", paciente : "Redux", propietario : "Dario", sintomas : "No duerme"},
    {id:"3", paciente : "Native", propietario : "Marenco", sintomas : "No canta"},
  ])

  //Eliminar pacientes
  const eliminarPaciente = id => {
    setCitas((citasActuales) => {
      return citasActuales.filter(cita => cita.id !== id)
    })
  }

  //Muestra u oculta el formulario
  const mostrarFormulario = () => {
    console.log("mostrar u ocultar form")
    setMostrarForm(!mostrarForm)
  }
  //Ocultar el teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }


  return ( 
    <TouchableWithoutFeedback onPress={()=>cerrarTeclado()}>
      <ScrollView style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de Citas</Text>
        <View>
          <TouchableHighlight onPress={()=> mostrarFormulario()} style={styles.btnMostrarForm}>
            <Text style={styles.textoMostrarForm}>{mostrarForm ?  'Listar citas' : 'Crear nueva cita'}</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Text style={styles.titulo}>Crear Nueva cita</Text>
              <Formulario citas={citas} setCitas={setCitas} setMostrarForm={setMostrarForm}/>
            </>
          ):(
            <>
              <Text style={styles.titulo}>{citas.length > 0 ? 'Administra tus citas' : 'No hay citas'}</Text>
              <FlatList
                style={styles.listado}
                data={citas}
                renderItem={({item})=>(
                  <Cita 
                    cita={item}
                    eliminarPaciente={eliminarPaciente}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </>
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  contenedor : {
    backgroundColor : "#AA076B",
    flex : 1,
  },
  titulo : {
    marginTop : Platform.OS === 'ios' ? 40  : 10,
    marginBottom : 20,
    fontSize : 24,
    fontWeight : "bold",
    textAlign : "center",
    color : "#fff",
  },
  contenido : {
    flex : 1,
    marginHorizontal : "2.5%",
  },
    listado : {
    flex : 1,
  },
  btnMostrarForm : {
    padding : 10,
    backgroundColor : '#7d024e',
    marginTop : 10,
    marginHorizontal : 10,
  },
  textoMostrarForm : {
    color :'#fff',
    textAlign : "center",
    fontWeight : "bold",
  },
})
