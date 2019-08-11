import React, { useEffect } from 'react';
import { Container, Image } from 'react-bootstrap';
import { documentTitle } from '../util/documentTitle';
import ClassDiagram from '../img/ClassDiagram.png';

const About: React.FC = () => {
  useEffect(() => documentTitle('About'), []);

  return (
    <main className='py-4'>
      <Container>
        <h3 className='text-center mb-3'>CSIS-3280-002 HoshiLe Project</h3>
        <p>Student: Takanori Hoshi - 300306402</p>
        <p>Student: Ngoc Tin Le – 300296440</p>
        <p>Team name: HoshiLe</p>
        <p>Meeting minutes: Thursday – from 3:00-4:00</p>
        <p>Project is an online computer store (HoshiLe’s store)</p>
        <p>+ Create a repository on GitHub</p>
        <p>+ Entities: Product, Orders, Order Details, User (Shopping Cart)</p>
        <p>+ Web services:</p>
        <ul>
          <li>CRUD for the Product</li>
          <li>CRUD Orders (Order Details)</li>
          <li>CRUD Users</li>
          <li>Authentication for User</li>
        </ul>
        <p>Store Front page / Admin page</p>
        <p><Image src={ClassDiagram} alt='Class Diagram' fluid /></p>
      </Container>
    </main>
  );
};

export default About;
