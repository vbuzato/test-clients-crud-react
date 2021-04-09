import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { getItemById, insertProduct, updateItemById, verifyCpfDuplicity } from '../api';
import { cpf } from 'cpf-cnpj-validator';

export default function FormCustomers() {
  const [customer, setCustomer] = useState({ extraAddress: [] });
  const [cpfWarning, setCpfWarning] = useState(false);
  const [duplicateCpf, setDuplicateCpf] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  const fetchCustomer = useCallback(async () => {
    const dataCustomer = await getItemById(id)
    setCustomer(dataCustomer);
  }, [id]);

  useEffect(() => {
    id && fetchCustomer();
  }, [fetchCustomer, id]);

  const cpfTest = ({ target }) => {
    setDuplicateCpf(false);
    const isCpfValid = customer.cpf === '' || cpf.isValid(target.value);
    
    setCustomer((prev) => ({...prev, cpf: target.value}));
    
    if (!isCpfValid) return setCpfWarning(true);
    setCpfWarning(false);
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (id) {
      await updateItemById(id, customer);
      history.push('/');
    } else {
      const isCpfOk = await verifyCpfDuplicity(customer.cpf);
      if (isCpfOk) {
        setDuplicateCpf(true) 
      } else {
        await insertProduct(customer);
        history.push('/');
      }
    }
  };

  const setExtraAddressOnChange = (e, index) => {
    const fields = [...customer.extraAddress];
    fields[index] = e.target.value;
    setCustomer((prev) => ({...prev, extraAddress: fields}))
  }

  const addField = ({ target }) => {
    setCustomer(prev => ({...prev, extraAddress: [ ...prev.extraAddress, '' ]}))
  }

  const removeField = (index) => {
    const fields = [...customer.extraAddress];
    fields.splice(index, 1)
    setCustomer((prev) => ({...prev, extraAddress: fields}))
  }

  return (
    <Container className="nav justify-content-center w-50 flex-column">
      <h1 className="pt-3 text-center">Cadastro de clientes</h1>
      <h6 className="text-center font-italic">Página de registro de cliente</h6>
      <Form onSubmit={onSubmitForm} className="w-100 d-flex flex-wrap pt-4">
        {id && (
        <Col sm="12">
          <Form.Label htmlFor="id" className="w-100 text-left">
            Id
            <input id="id" value={customer.id || ''} type="text" className="form-control w-100" readOnly disabled />
          </Form.Label>
        </Col>
        )}
        <Col sm="6">
          <Form.Label htmlFor="firstName" className="w-100 text-left">
            Nome *
            <input
              id="firstName"
              className="form-control"
              value={customer.firstname || ''}
              type="text"
              onChange={(e) => setCustomer((prev) => ({...prev, firstname: e.target.value}))}
              required
            />
          </Form.Label>
        </Col>
        <Col sm="6">
          <Form.Label htmlFor="lastName" className="w-100 text-left">
            Sobrenome *
            <input
              id="lastName"
              className="form-control"
              value={customer.lastname || ''}
              type="text"
              onChange={(e) => setCustomer((prev) => ({...prev, lastname: e.target.value}))}
              required
            />
          </Form.Label>
        </Col>
        <Col sm="6">
          <Form.Label htmlFor="cpf" className="w-100 text-left">
            CPF *
            <input
              id="cpf"
              className="form-control"
              value={customer.cpf || ''}
              type="number"
              onChange={cpfTest}
              required
            />
          </Form.Label>
          {cpfWarning && <p className="alert alert-danger">CPF inválido!</p> }
          {duplicateCpf && <p className="alert alert-danger">CPF já existente!</p> }
        </Col>
        <Col sm="6">
          <Form.Label htmlFor="birthday" className="w-100 text-left">
            Data de Nascimento *
            <input
              id="birthday"
              className="form-control"
              value={customer.birthday || ''}
              type="date"
              onChange={(e) => setCustomer((prev) => ({...prev, birthday: e.target.value}))}
              required
            />
          </Form.Label>
        </Col>
        <Col sm="12">
          <Form.Label htmlFor="address" className="w-100 text-left">
            Endereço *
            <input
              id="address"
              className="form-control"
              value={customer.address || ''}
              type="text"
              onChange={(e) => setCustomer((prev) => ({...prev, address: e.target.value}))}
              required
            />
          </Form.Label>
        </Col>

        {customer.extraAddress?.map((eachAddress, index) => (
          <Col sm="12 text-left field-extra-address" key={index}>
            <Form.Label htmlFor="address" className="w-85 text-left">
            Endereço extra: {index + 1} 
              <input
                id="address"
                className="form-control"
                value={eachAddress}
                type="text"
                onChange={(e) => setExtraAddressOnChange(e, index)}
                required
              />
            </Form.Label>
            <button type="button" className="btn btn-danger bt-x" onClick={() => removeField(index)}>X</button>
          </Col>
          )
        )}

        <Col sm="12">
          <button type="button" className="btn btn-info m-1 p-2" onClick={addField}>
            Adicionar endereço
          </button>
        </Col>

        <Col className="form-group row w-75 justify-content-center m-3">
          <button type="submit" className="btn btn-primary" disabled={cpfWarning}>
            {id ? 'Atualizar dados do cliente' : 'Cadastrar cliente'}
          </button>
        </Col>
      </Form>
    </Container>
  );
}
