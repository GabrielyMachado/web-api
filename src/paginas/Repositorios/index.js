import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import estilos from './estilos';
import { pegarRepositorioDoUsuario, pegarRepositorioEspecifico } from '../../servicos/requisicoes/repositorio';
import { useIsFocused } from '@react-navigation/native';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const [filtroRepo, setFiltroRepo] = useState('');
    const estaNaTela = useIsFocused();

    useEffect(async () => {
        const resultado = await pegarRepositorioDoUsuario(route.params.id)
        setRepo(resultado)
    },[estaNaTela]);

    async function busca(){
        let resultado;

        if (filtroRepo.length > 0) {
            resultado = await pegarRepositorioEspecifico(filtroRepo);

            if (resultado.length > 0){
                setRepo(resultado);
            }
            else{
                Alert.alert('Repositório não encontrado');
            }

        } else {
            resultado = await pegarRepositorioDoUsuario(route.params.id)
            setRepo(resultado)
        }
        
    }
    

    return (
        <View style={estilos.container}>
                <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
                <TouchableOpacity 
                    style={estilos.botao}
                    onPress={() => navigation.navigate('CriarRepositorio')}
                >
                    <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
                </TouchableOpacity>

                <TextInput
                    placeholder="Busque por um repositório"
                    autoCapitalize="none"
                    style={estilos.entrada}
                    value={filtroRepo}
                    onChangeText={setFiltroRepo}
                />
                <TouchableOpacity style={estilos.botao}
                    onPress={busca}>
                    <Text style={estilos.textoBotao}>
                        Buscar
                    </Text>
                </TouchableOpacity>

                <FlatList
                    data={repo}
                    style={{width: '100%' }}
                    keyExtractor={repo => repo.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={estilos.repositorio}
                            onPress={() => navigation.navigate('InfoRepositorio',{item})}
                        >
                            <Text style={estilos.repositorioNome}>{item.name}</Text>
                            <Text style={estilos.repositorioData}>Atualizado em {item.data}</Text>
                        </TouchableOpacity>
                    )}
                />
        </View>
    );
}
