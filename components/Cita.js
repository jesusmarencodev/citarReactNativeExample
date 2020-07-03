/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react'
import { StyleSheet, Text, View,  TouchableOpacity, TouchableHighlight } from 'react-native'

export default function Cita({cita, eliminarPaciente}) {

  const dialogoEliminar = id => {
    eliminarPaciente(id);
  }

    return (
      <View style={styles.cita}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <Text style={styles.texto}>{cita.paciente}</Text>
        </View>
        <View>
          <Text style={styles.label}>Propietario:</Text>
          <Text style={styles.texto}>{cita.propietario}</Text>
        </View>
        <View>
          <Text style={styles.label}>Sintomas:</Text>
          <Text style={styles.texto}>{cita.sintomas}</Text>
        </View>
        <View>
          <TouchableHighlight onPress={()=> dialogoEliminar(cita.id)} style={styles.btnEliminar}>
            <Text style={styles.textoEliminar}>Eliminar &times;</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  cita : {
    backgroundColor :"#fff",
    borderBottomColor : "#e1e1e1",
    borderStyle : "solid",
    borderBottomWidth : 1,
    paddingVertical : 10,
    paddingHorizontal : 10,
  },
  label : {
    fontWeight : "bold",
    fontSize : 18,
  },
  texto : {
    fontSize : 18,
    marginBottom :10
  },
  btnEliminar : {
    padding : 10,
    backgroundColor : 'red',
    marginVertical :10,
  },
  textoEliminar : {
    color :'#fff',
    textAlign : "center",
    fontWeight : "bold",
  }

})
