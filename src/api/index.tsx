import axios from 'axios';

const URL = 'http://localhost:4000/customers';

const onApiError = 'Erro na requisição. Tente executar "json-server --watch -p 4000 db.json"';

type bodyProps = {
  
}

const insertProduct = async (body: any) => {
  const { data } = await axios.post(URL, body).catch(() => ({ data: [onApiError] }));
  return data;
};

const getAllItems = async () => {
  const { data } = await axios.get(URL).catch(() => ({ data: [onApiError] }));
  return data;
};

const getItemById = async (id: string) => {
  const { data } = await axios.get(`${URL}/${id}`).catch(() => ({ data: [onApiError] }));
  return data;
};

const updateItemById = async (id: string, body: any) => {
  const { data } = await axios.put(`${URL}/${id}`, body).catch(() => ({ data: [onApiError] }));
  return data;
};

const deleteItemById = async (id: string) => {
  const { data } = await axios.delete(`${URL}/${id}`).catch(() => ({ data: [onApiError] }));
  return data;
};

const verifyCpfDuplicity = async (cpf: string) => {
  const { data } = await axios.get(`${URL}/?cpf=${cpf}`).catch(() => ({ data: [onApiError] }));
  return data.length > 0;
}

export {
  onApiError,
  insertProduct,
  getAllItems,
  getItemById,
  updateItemById,
  deleteItemById,
  verifyCpfDuplicity,
};
