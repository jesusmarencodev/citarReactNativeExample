/* eslint-disable keyword-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable jsx-quotes */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

export default function Formulario({citas, setCitas, setMostrarForm, guardarCitasStorage}) {
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  //Muestra u oculta el datePicker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    const opciones = {year: 'numeric', month: 'long', day : '2-digit'};
    setFecha(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };

  //Muestra u oculta el time picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = time => {
    const opciones = {hour: 'numeric', minute : '2-digit', hour12: false};
    console.log(time.toLocaleString('en-US', opciones))
    setHora(time.toLocaleString('en-US', opciones));
    hideTimePicker();
  };

  //Crear nueva cita
  const crearNuevaCita = () => {
    if(paciente.trim()    === '' ||
       propietario.trim() === '' ||
       telefono.trim()    === '' ||
       fecha.trim()       === '' ||
       hora.trim()        === '' ||
       sintomas.trim()    === ''){
         mostrarAlerta();
         return
       }
    //Creando la cita
    const cita = { paciente, propietario, telefono, fecha, hora, sintomas};

    cita.id = shortid.generate();

    //agregar al state
    const citasNuevo = [...citas, cita];
    setCitas(citasNuevo);

    //pasar las nuevas citas al storage
    guardarCitasStorage(JSON.stringify(citasNuevo));

    //Ocultar form
    setMostrarForm( false );

    //Reset form

  }
  //Muestra la alerta si falla la validacion
  const mostrarAlerta = () => {
    Alert.alert(
      'Error',//Titulo,
      'Todos los campos son obligatorios',
      [{
        text : 'OK', //Arreglo de botones
      }]
    )
  }

  return (
    <>
    <ScrollView style={styles.formulario}>
      <View>
        <Text style={styles.label}>Paciente:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(texto) => setPaciente(texto)}
        />
      </View>
      <View>
        <Text style={styles.label}>Dueño:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(texto) => setPropietario(texto)}
        />
      </View>
      <View>
        <Text style={styles.label}>Telefono Contacto:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(texto) => setTelefono(texto)}
          keyboardType = 'phone-pad'
          locale='es_ES'
        />
      </View>
      <View>
        <Text style={styles.label}>Fecha:</Text>
        <Button s title="Seleccionar Fecha" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
          locale='es_ES'
        />
        <Text>{fecha}</Text>
      </View>
      <View>
        <Text style={styles.label}>Hora:</Text>
        <Button title="Seleccionar Hora" onPress={showTimePicker} />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmTime}
          onCancel={hideTimePicker}
        />
        <Text>{hora}</Text>
      </View>
      <View>
        <Text style={styles.label}>Sintomas:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(texto) => setSintomas(texto)}
          multiline
        />
      </View>
      <View>
        <TouchableHighlight onPress={()=> crearNuevaCita()} style={styles.btnSubmit}>
          <Text style={styles.textoSubmit}>Crear nueva cita</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  label : {
    fontWeight : "bold",
    fontSize : 18,
  },
  input : {
    marginTop : 10,
    height : 40,
    borderColor : '#e1e1e1',
    borderWidth : 1,
    borderStyle : 'solid',
    fontSize : 18,
  },
  formulario :{
    backgroundColor : '#fff',
    paddingHorizontal : 20,
    paddingVertical : 10,
    marginHorizontal : '2.5%',
  },
  btnSubmit : {
    padding : 10,
    backgroundColor : '#7d024e',
    marginTop : 20,
  },
  textoSubmit : {
    color :'#fff',
    textAlign : "center",
    fontWeight : "bold",
  },
})
