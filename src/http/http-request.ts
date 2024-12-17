import axios from "axios";

const apiURL = "http://localhost:3000/users/";

interface ICreateRegisterRequest {
  nome: string;
  email: string;
  cep: string;
}
interface IUpdateRegisterRequest {
  nome?: string;
  email: string;
  cep?: string;
}
interface ICreateRegisterResponse {
  mensagem: string;
  erro?: string | null;
  data?: object | null;
}

interface IUserResponse {
  id: string;
  nome: string;
  email: string;
  cep: string;
}

const createRegister = async ({
  nome,
  email,
  cep,
}: ICreateRegisterRequest): Promise<ICreateRegisterResponse> => {
  try {
    const response = await axios.post(apiURL, {
      nome,
      email,
      cep,
    });

    return {
      mensagem: "Registro cadastrado com sucesso.",
      data: response.data,
      erro: null,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const serverMessage =
        error.response?.data?.mensagem ||
        "Erro ao criar o registro. Tente novamente mais tarde.";
      return { mensagem: serverMessage, erro: error.message, data: null };
    }
    return {
      mensagem: "Erro inesperado ao criar o registro.",
      erro: String(error),
      data: null,
    };
  }
};

const getRegister = async (): Promise<IUserResponse[]> => {
  try {
    const { data } = await axios.get(apiURL);
    return data as IUserResponse[];
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erro ao buscar registros:",
        error.response?.data || error.message
      );
    } else {
      console.error("Erro inesperado ao buscar registros:", error);
    }
    return [];
  }
};

const editRegister = async ({
  nome,
  email,
  cep,
}: Partial<IUpdateRegisterRequest>): Promise<ICreateRegisterResponse> => {
  try {
    const response = await axios.patch(apiURL + email, { nome, email, cep });

    return {
      mensagem: "Registro atualizado com sucesso.",
      data: response.data,
      erro: null,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const serverMessage =
        error.response?.data?.mensagem ||
        "Erro ao atualizar o registro. Tente novamente mais tarde.";
      return { mensagem: serverMessage, erro: error.message, data: null };
    }
    return {
      mensagem: "Erro inesperado ao atualizar o registro.",
      erro: String(error),
      data: null,
    };
  }
};

export { getRegister, createRegister, editRegister };
