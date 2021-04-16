import React, { useCallback, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { getAllItems, deleteItemById, onApiError } from '../api';
import Loading from '../components/Loading';

type itemProps = {
  id: string;
  firstname: string;
  lastname: string;
  cpf: string;
  address: string;
  extraAddress: string[];
  birthday: string;
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = useCallback(async () => setCustomers(await getAllItems()), []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const onDelete = async (id: string) => {
    await deleteItemById(id);
    setCustomers(await getAllItems());
  };

  const table = () => {
    if (customers && customers.length === 0) return <Alert variant="secondary">No customers</Alert>;
    if (customers[0] === onApiError) return <Alert variant="warning">{onApiError}</Alert>;

    const indexTable = ["Id", "Nome", "Sobrenome", "CPF", "Endereços", "Data de Nascimento", "Edit", "Delete"];

    return (
      <Table striped bordered hover className="font-size-table">
        <thead>
          <tr>
            {indexTable.map((index) => <th key={index}>{index}</th>)}
          </tr>
        </thead>
        <tbody>
          {customers.map((item: itemProps) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.cpf}</td>
                <td>
                  <span>{item.address}</span>
                  {item.extraAddress?.length > 0 && item.extraAddress.map((address, index) => <span key={index}><br />{address}</span>)}
                </td>
                <td>{item.birthday}</td>
                <td>
                  <Link className="btn btn-warning" to={`/customer/${item.id}`}>Select</Link>
                </td>
                <td>
                  <button className="btn btn-danger" type="button" onClick={() => onDelete(item.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  return (
    <Container>
      <h1 className="pt-3">Clientes</h1>
      <div className="nav justify-content-end">
        <Link to="/customer" className="btn btn-primary m-3">Adicionar novo cliente</Link>
      </div>
      <div className="text-center">{customers ? table() : <Loading />}</div>
    </Container>
  );
}

export default Customers;
