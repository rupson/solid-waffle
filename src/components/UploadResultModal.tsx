import styled from 'styled-components';
import * as R from 'remeda';
import { Button, H1, H2, P } from '.';
import { ValidationResult } from '../data/parseAndValidateCsv';

type UploadResultModalProps = {
	validationResult?: ValidationResult;
	setIsModalOpen: (isOpen: boolean) => void;
};

const ModalWrapper = styled.div`
	position: absolute;
	margin: calc((100vh - 500px) / 2) calc((100vw - 500px) / 2);
	height: 500px;
	width: 500px;
	border-radius: 20px;
	border: solid 1px black;
	background-color: white;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const ModalContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	padding: 20px;
`;

const UploadSuccess: React.FC = () => (
	<H1 style={{ color: 'green' }}>SUCCESS</H1>
);

const ErrorsContainer = styled.div`
	overflow: scroll;
`;

const RowError: React.FC<{ rowNum: number; errors: string[] }> = ({
	rowNum,
	errors,
}) => {
	return (
		<P>
			{`Row number ${rowNum + 1}`}
			<ul>
				{errors.map((error) => (
					<li style={{ color: 'red' }}>{error}</li>
				))}
			</ul>
		</P>
	);
};

const UploadFailure: React.FC<{ validationResult: ValidationResult }> = ({
	validationResult: { errors },
}) => {
	const rowNums = R.pipe(errors, R.keys, R.map(Number));
	return (
		<ErrorsContainer>
			{rowNums.map((rowNum) => (
				<RowError rowNum={rowNum} errors={errors[rowNum]} />
			))}
		</ErrorsContainer>
	);
};

const isUploadSuccessful = (validationResult: ValidationResult) =>
	Object.keys(validationResult.errors).length === 0;

export const UploadResultModal: React.FC<UploadResultModalProps> = ({
	validationResult,
	setIsModalOpen,
}) => {
	if (!validationResult) {
		setIsModalOpen(false);
		return null;
	}
	return (
		<ModalWrapper>
			<ModalContentContainer>
				<H2>Upload result</H2>
				{isUploadSuccessful(validationResult) ? (
					<UploadSuccess />
				) : (
					<UploadFailure validationResult={validationResult} />
				)}
				<Button onClick={() => setIsModalOpen(false)}>Close</Button>
			</ModalContentContainer>
		</ModalWrapper>
	);
};
