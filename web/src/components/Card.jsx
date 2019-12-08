import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';

const CardStyle = styled.div`
  margin: 1em;
  padding: 1em 2em;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template: repeat(2, 2.5em) / minmax(8em, 1fr);
  background-color: #FAFAFA;
`;

const bgColorA = keyframes`
  from {
    background-color: #A7A7A7;
  }
  to {
    background-color: #5290F5;
  }
`;

const bgColorR = keyframes`
  from {
    background-color: #5290F5;
  }
  to {
    background-color: #A7A7A7;
  }
`;

const CAtive = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(50px);
  }
`;

const CRemove = keyframes`
  from {
    transform: translateX(50px);
  }
  to {
    transform: translateX(0);
  }
`;

const Switch = styled.span`
  width: 80px;
  height: 30px;
  padding: 3px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  background-color: #A7A7A7;
  box-sizing: border-box;
  cursor: pointer;
  ${props => props.animate && css`
    animation: ${bgColorA} .5s linear forwards;
  `|| props.animate === false && css`
    animation: ${bgColorR} .5s linear forwards;
  `}
  ::before{
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #FAFAFA;
    ${props => props.animate && css`
      animation: ${CAtive} .5s linear forwards;
    `|| props.animate === false && css`
      animation: ${CRemove} .5s linear forwards;
    `}
  }
`;

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (state.value && props.check !== null && props.check !== props.name) {
      return { value: false }
    } else { return state }
  }
  render() {
    const { name, port } = this.props;
    return (
      <CardStyle>
        <span>{name}</span>
        <Switch
          animate={this.state.value}
          onClick={() => {
            if (Number(port) && port.length < 3) {
              this.props.active(name)
              this.setState((state) => ({
                value: !state.value
              }));
            } else {
              alert('Ingreza un numero de puerto valido');
            }
          }}
        />
      </CardStyle>
    );
  }
}

export default Card;