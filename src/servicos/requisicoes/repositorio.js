import api from "../api";

export async function pegarRepositorioDoUsuario(login) {
    try {
        const resultado = await api.get(`/users/${login}/repos`);
        
        return resultado.data
    }
    catch (error) {
        console.log(error)

        return []
    }
}

export async function salvarRepositorioDoUsuario(postId, nome, data, id) {
    try {
        const resultado = await api.put(`/repos/${id}`,{
            name: nome,
            data: data,
            postId: postId,
            id: id
        });
        
        return 'sucesso'
    }
    catch (error) {
        console.log(error)

        return 'erro'
    }
}

export async function pegarRepositorioEspecifico(login, repoNome) {
    try {
        const resultado = await api.get(`/repos/${login}/${repoNome}`);
        return Array(resultado.data)
    }
    catch (error) {
        console.log(error)
        return []
    }
}

export async function criarRepositorioDoUsuario(postId, nome, data) {
    try {
        const resultado = await api.post(`/repos`,{
            name: nome,
            data: data,
            postId: postId
        });
        
        return 'sucesso'
    }
    catch (error) {
        console.log(error)

        return 'erro'
    }
}

export async function deletarRepositorioDoUsuario(id) {
    try {
        const resultado = await api.delete(`/repos/${id}`,{
        });
        
        return 'sucesso'
    }
    catch (error) {
        console.log(error)

        return 'erro'
    }
}