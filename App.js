import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native';
import Picker from './src/components/Picker';
import api from './src/services/api';



export default function App() {

  const [moedas, setMoedas] = useState([])//resposavel por buscas as moedas na API
  const [loading, setLoading] = useState(true)//enquando nao buscar todas as moedas a pagina nao eh carreagada

  const [moedaSelecionada, setMoedaSelecionada] = useState(null)
  const [moedaBValor, setMoedaBValor] = useState(0)

  const [valorMoeda, setValorMoeda] = useState(null)
  const [valorConvertido, setValorConvertido] = useState(0)


  useEffect(() => {
    async function loadMoedas() {//essa funcao eh async pode busca dados em uma api demandando tempo para o carregamento dos dados
      const respose = await api.get('all')

      let arrayMoedas = []
      Object.keys(respose.data).map((key) => {
        arrayMoedas.push({
          key: key,
          label: key,
          value: key,
        })
        // console.log(respose.data)
      })

      setLoading(false)
      setMoedas(arrayMoedas)
    }
    loadMoedas()
  }, [])

  async function converter() {
    if (moedaSelecionada === null || moedaBValor === 0) {
      alert('Por Favor selecione uma moeda')
      return
    }
    const response = await api.get(`all/${moedaSelecionada}-BRL`)
//    console.log(response.data[moedaSelecionada].ask)

    let resultado = (response.data[moedaSelecionada].ask * parseFloat(moedaBValor))
    setValorConvertido(`R$ ${resultado.toFixed(2)}`)
    setValorMoeda(moedaBValor)

    Keyboard.dismiss()
    
  }


  if (loading) {
    return (

      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} >
        <ActivityIndicator animating={true} color="blue" />
      </View>
    )
  } else {
    return (

      <SafeAreaView style={styles.container}>

        <View style={styles.areaMoeda}>
          <Text style={styles.titulo}> Selecione a moeda</Text>
          <Picker moedas={moedas} onChange={(moeda) => setMoedaSelecionada(moeda)} />
        </View>

        <View style={styles.areaValor}>
          <Text style={styles.titulo}>Digite o valor para converte em (R$)</Text>
          <TextInput placeholder="   Ex: 150" keyboardType='numeric' style={styles.input} onChangeText={(valor) => { setMoedaBValor(valor) }} />
        </View>
        <TouchableOpacity style={styles.botaoArea}>

          <Text style={styles.botaoTexto} onPress={converter} > Converter</Text>

        </TouchableOpacity>


        {valorConvertido !== 0 && (
          <View style={styles.areaResultado}>
            <Text style={styles.valorConvertido} >
              {valorMoeda} {moedaSelecionada}
            </Text>
            <Text style={[styles.valorConvertido, { fontSize: 15, margin: 10 }]} >
              Corresponde a
            </Text>
            <Text style={styles.valorConvertido} >
              {valorConvertido}
            </Text>
          </View>
        )}


      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#76095f',
    paddingTop: 70

  },
  areaMoeda: {
    width: '90%',
    backgroundColor: '#d7fff7',
    paddingTop: 19,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    // marginBottom: 1
  },

  areaValor: {
    width: '90%',
    color: 'white',
    backgroundColor: '#9feb56',
    paddingBottom: 8,
    paddingTop: 8
  },
  titulo: {
    fontSize: 15,
    color: '#000',
    paddingTop: 5,
    paddingLeft: 5
  },
  input: {
    width: '100%',
    padding: 9,
    height: 45,
    fontSize: 20,
    marginTop: 8,
    color: '#006d8f',
    textDecorationLine: 'underline'
  },
  botaoArea: {
    width: "90%",
    backgroundColor: "#ffc295",
    height: 45,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  botaoTexto: {
    fontSize: 15,
    color: '#513e67',
    fontWeight: 'bold'
  },
  areaResultado: {
    width: '90%',
    backgroundColor: '#fff',
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  valorConvertido: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#09a6ac'
  }
});
