import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView, TouchableOpacity,TextArea } from 'react-native';
import styles from './style';
export default function App() {
  const [postagem, setPostagem] = useState([]);
  const [titulo, setTitulo] = useState("");
    const [conteudo, setConteudo] = useState("");

  const criarPost = () => {


    fetch("http://10.87.207.28:5000/forum/", {
       "method": "POST",
       "headers":{
         "Content-Type": "application/json"
       },
       "body": JSON.stringify({
           "nome":titulo,
           "email": conteudo
       })
     })
     .then(res => {return res.json()})
     
     }

     const deletar = () => {


      fetch("http://10.87.207.28:5000/forum/", {
         "method": "DELETE",
         "headers":{
           "Content-Type": "application/json"
         },
         "body": JSON.stringify({
             "nome":titulo,
             "email": conteudo
         })
       })
       .then(res => {return res.json()})
       
       
       }

      //  const alterar = () => {


      //   fetch("http://10.87.207.28:5000/forum/", {
      //      "method": "PUT",
      //      "headers":{
      //        "Content-Type": "application/json"
      //      },
      //      "body": JSON.stringify({
      //          "nome":titulo,
      //          "email": conteudo
      //      })
      //    })
      //    .then(res => {return res.json()})
         
         
      //    }

  useEffect(() => {
    fetch("http://10.87.207.28:5000/forum/posts")
    .then(res => {return res.json()})
    .then(data => {
      setPostagem(data);
    })
  });


  return (
    <View >
        <View>
        <TextInput style={styles.input} 
        placeholder="Titulo..."
        onChangeText={(e)=>{setTitulo(e)}}
        value={titulo}
        
      />
        <TextArea style={styles.input}
        placeholder="Conteudo...."
        onChangeText={(e)=>{setConteudo(e)}}
        value={conteudo}
        
      />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {
                criarPost()
            }}>
                <Text style={styles.textButton}>Criar</Text>
            </TouchableOpacity>


        <View style={styles.container} >
        <ScrollView>
            {
 postagem.map((posts, index) => {
    return (
        <View style={styles.containers} key={index} >
            
            
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/3615/3615319.png"}}/><Text>{`${posts.nome}        ${posts.data_post}`}</Text>
            <Text>{`${posts.titulo}`}</Text>
            <View style={styles.hairline} />
            <Text>{`${posts.conteudo}`}</Text>

            <TouchableOpacity onPress={() => {
                deletar()
            }}><Image source={{uri: ""}}></Image></TouchableOpacity>

            {/* <TouchableOpacity onPress={() => {
                alterar()
            }}><Image source={{uri: ""}}></Image></TouchableOpacity> */}
        </View>
    )
})
            }
        </ScrollView>
        </View>

    </View>
  );
}
