import styled from 'styled-components';

export const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	height: 100vh;
`;

export const H1 = styled.h1`
	text-align: center;
	align-self: center;
`;

export const H2 = styled.h2`
	/* text-align: center; */
	margin-left: 20px;
	margin-right: 20px;
`;

export const P = styled.p`
	/* text-align: center; */
	margin-left: 28px;
	margin-right: 28px;
`;

export const Button = styled.button`
	margin-left: 28px;
	margin-right: 28px;
	width: 250px;
	height: 50px;
	font-weight: bold;
`;

export const FileInputWrapper = styled.div`
	width: 100%;
	.isDragging {
		background-color: gray;
	}
`;

export const FileInputZone = styled.div`
	display: flex;
	margin-left: 28px;
	margin-right: 28px;
	border: dashed 2px salmon;
	width: 60%;
	height: 100px;
	text-align: center;
	justify-content: center;
	align-items: center;
`;
