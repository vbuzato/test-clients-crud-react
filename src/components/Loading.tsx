import React from 'react';
import { Container } from 'react-bootstrap';
import './Loading.css';

export default function Loading() {
  return (
    <Container>
      <div className="load-ball" />
      <div className="load-ball" />
      <div className="load-ball" />
      <div className="load-ball" />
      <div className="load-ball" />
    </Container>
  );
}
