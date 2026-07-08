// Esta função servirá para remover o campo da senha(password) de um objeto User
//Isso vai fazer com que, quando chamarmos ela em Services, ele envia ao banco o usuário normal (completo) mas envia para o Controller um usuário que não tem senha, assim o JSON não contém a senha do usuário

import { User } from "../models/User";

export function omitPassword(user:User){
    // Copiamos o valor da senha do user para a variável password
    // O resto (id, name, email) fica dentro da variável rest
    // Ela que retornamos
    const { password, ...rest} = user
    return rest
}