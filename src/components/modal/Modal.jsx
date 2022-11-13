import React from 'react';
import styled from 'styled-components';

const Modal = ({
	children,
	estado,
	cambiarEstado,
	titulo = 'Alerta',
	mostrarHeader,
	mostrarOverlay,
	posicionModal,
	padding
}) => {
	return (
		<>
			{estado &&
				<Overlay mostrarOverlay={mostrarOverlay} posicionModal={posicionModal}>
					<ContenedorModal padding={padding}>
						{mostrarHeader &&
							<EncabezadoModal>
								<h3>{titulo}</h3>
							</EncabezadoModal>
						}
						<BotonCerrar onClick={() => cambiarEstado(false)}>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="" viewBox="0 0 16 16">
								<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
							</svg>
						</BotonCerrar>
						{children}
					</ContenedorModal>
				</Overlay>
			}
		</>
	);
}

export default Modal;


const Overlay = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background: ${props => props.mostrarOverlay ? 'rgba(0,0,0,.5)' : 'rgba(0,0,0,0)'};
	padding: 40px;
	display: flex;
	align-items: ${props => props.posicionModal ? props.posicionModal : 'center'};
	justify-content: center;
`;

const ContenedorModal = styled.div`
	width: 500px;
	min-height: 100px;
	background: #151320;
	position: relative;
	border-radius: 5px;
	border: 3px solid rgb(187, 14, 100);
	box-shadow: inset 0 0 10px rgb(233, 42, 121),  0 0 20px rgb(233, 42, 121);
	padding: ${props => props.padding ? props.padding : '15px'};
`;

const EncabezadoModal = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 20px;
	color: rgb(233, 42, 121);
	border-bottom: 1px solid #E8E8E8;
	h3 {
		font-weight: 900;
		font-size: 16px;
		color: rgb(233, 42, 121);
	}
`;

const BotonCerrar = styled.button`
	position: absolute;
	top: 15px;
	right: 20px;
	width: 30px;
	height: 30px;
	cursor: pointer;
	transition: .3s ease all;
	border-radius: 5px;
  background-color: #151320;
	color: #1766DC;
	&:hover {
		background: rgb(199, 24, 97);
    box-shadow: 0 0 10px rgb(199, 24, 97), 0 0 40px rgb(199, 24, 97), 0 0 80px rgb(199, 24, 97);
	}
	svg {
		width: 100%;
		height: 100%;
	}
`;