import React from 'react';
import * as R from 'remeda';
import { FileInputWrapper, FileInputZone } from '.';

const withPreventDefault = (handler: (e: any) => void) => (e: any) => {
	e.preventDefault();
	handler(e);
};
const hasFiles = (e: DragEvent) =>
	!!e.dataTransfer && e.dataTransfer.items && e.dataTransfer.items.length > 0;

const getDropZoneText = (isDragging: boolean, uploadedFileName?: string) => {
	if (uploadedFileName) return `Uploaded ${uploadedFileName}`;
	return isDragging ? 'Drop here' : 'Drag & drop your file here';
};

export const FileInput: React.FC<{ handleFileUpload: (i: string) => void }> = ({
	handleFileUpload,
}) => {
	const [isDragging, setIsDragging] = React.useState(false);
	const [uploadedFileName, setUploadedFileName] = React.useState<
		string | undefined
	>();

	const dropZoneText = getDropZoneText(isDragging, uploadedFileName);

	const handleDrag = (e: DragEvent) => {
		e.stopPropagation();
	};

	const handleDragIn = (e: DragEvent) => {
		if (hasFiles(e)) setIsDragging(true);
	};
	const handleDragOut = (e: DragEvent) => {
		setIsDragging(false);
	};
	const handleDrop = (e: DragEvent) => {
		console.log(`whoa u dropped somethin there xxx`);
		setIsDragging(false);
		if (hasFiles(e)) {
			processDroppedFile(e.dataTransfer?.items[0]);
		}
	};

	const processDroppedFile = async (input?: DataTransferItem) => {
		if (!input) return;
		const asFile = input.getAsFile();
		if (!asFile) return;
		setUploadedFileName(asFile.name);
		const asString = await asFile.text();
		console.log(`file as string>>>>>`, asString);
		handleFileUpload(asString);
	};

	return (
		<FileInputWrapper>
			<FileInputZone
				className={isDragging ? 'isDragging' : ''}
				onDragEnter={withPreventDefault(handleDragIn)}
				onDragExit={withPreventDefault(handleDragOut)}
				onDragLeave={withPreventDefault(handleDragOut)}
				onDrop={withPreventDefault(handleDrop)}
				onDrag={withPreventDefault(handleDrag)}
				onDragOver={withPreventDefault(handleDrag)}
			>
				{dropZoneText}
			</FileInputZone>
		</FileInputWrapper>
	);
};
