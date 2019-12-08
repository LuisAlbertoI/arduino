import React, { Component } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import Card from '../components/Card';

const GlobalStyle = createGlobalStyle`
 body {
   margin: 0;
   font-family: Arial, Helvetica, sans-serif;
   background-color: #ECECEC;
 }
 #root {
  height: 100vh;
  display: grid;
  align-content: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    align-content: initial;
    justify-content: initial;
  }
 }
`;

const Content = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template: 3em 1fr / 1fr;
  @media screen and (max-width: 768px) {
    justify-items: initial;
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Label = styled.label`
  display: grid;
  justify-items: center;
`;

const Input = styled.input`
  min-width: 20em;
  height: 25px;
  margin: 0 2em;
  text-align: center;
  border-radius: 5px;
  border: 1px solid grey;
`;

const list_name = [
  "Animacion",
  "Parpadeo",
  "Fundido",
  "Pulso"
];

const socket = io();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      port: '',
      check: null
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ port: event.target.value });
  }
  handleClick(name) {
    this.setState({ check: name });
    socket.emit('active', { name: name, port: this.state.port });
  }
  render() {
    const { port } = this.state;
    return (
      <Content>
        <GlobalStyle />
        <Label>
          {port !== '' ?
            Number(port) ? port.length < 3 ?
              <span>El valor ingrezado es valido</span> :
              <span>Lo lamentamos solo se admiten dos digitos</span> :
              <span>Lo lamentamos solo se admiten numeros</span> :
            <span>Ingreza un numero de puerto</span>
          }
          <Input type="text" onChange={this.handleChange} />
        </Label>
        <Items>
          {list_name.map((item, index) => (
            <Card
              key={index}
              name={item}
              port={this.state.port}
              check={this.state.check}
              active={this.handleClick}
            />
          ))}
        </Items>
      </Content>
    );
  }
}

export default Home;