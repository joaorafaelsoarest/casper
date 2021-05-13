import { Action } from '@interfaces';
import { join } from 'path';
import { isFunction } from 'util';

/**
 * Recebe a string contida no campo `action` da intent do Dialogflow.
 * Padrão adotado para nomear a action:
 * - `'nomeDoArquivo'` -> Quando o arquivo exporta uma função default.
 * - `'nomeDoArquivo.nomeDaFuncao'` -> Quando o arquivo exporta mais de
 * uma função
 *
 * **Exemplo 1**\
 * Action do Dialogflow = `example`\
 * Será procurado em `/actions/features/` o arquivo `example.ts`.\
 * Como a string não contém `.`, será executado: `example.default(...args)`\
 * \
 * **Exemplo 2**\
 * Action do Dialogflow = `example.function1()`\
 * O arquivo procurado será `example` e a função `function1()`:
 * `example.function1(...args)`
 *
 * Os argumentos recebidos na função a ser executada, é descrito por type `Action`,
 * em `/interfaces`
 *
 * @param action Nome da ação contida na intent do Dialogflow
 */
export default async function (action: string): Promise<Action> {
  try {
    /** Nome do arquivo da ação a ser executada */
    let fileName: string;

    /** Nome da função da ação a ser executada */
    let functionName: string;

    if (action.includes('.')) {
      [fileName, functionName] = action.split('.');

    } else {
      fileName = action;
      functionName = 'default';
    }

    /** Caminho do módulo procurado, na pasta /actions/features/ */
    const modulePath: string = join(__dirname, 'features', fileName);

    /** Importa o módulo com o nome contido na action */
    const module = await import(modulePath);

    // Verifica se o módulo foi encontrado e se a ação existe
    if (module) {
      const actionFunction = (module[functionName] as Action);

      if (actionFunction && isFunction(actionFunction)) {
        // Ação correspondente, do tipo Action
        return actionFunction;
      }

      return Promise.reject({
        message: `[/actions/index] Função '${functionName}' não encontrada no módulo ${modulePath}`,
        name: 'Função não encontrada',
        stack: `/actions/index/${modulePath}.${functionName}`,
      });
    }

    return Promise.reject({
      message: `[/actions/index] Módulo não encontrado - ${modulePath}`,
      name: 'Módulo não encontrado',
      stack: `/actions/index/${modulePath}`,
    });

  } catch (error) {
    return Promise.reject(error);

  }
}
