import React from 'react';
import { createCsvByManager } from './data/createCsv';
import { volunteersByManager } from './data';
import { AppContainer, Button, H1, H2, P } from './components';
import { FileInput } from './components/FileInput';

function App() {
	const [isProcessing, setIsProcessing] = React.useState(false);
	const handleFileUpload = (fileAsString: string) => {
		setIsProcessing(true);
	};
	return (
		<AppContainer>
			<H1>CSV Template generator & upload tool 🚀</H1>
			<H2>Step #1: Download the csv template.</H2>
			<P>
				This will create and download a template CSV with all the volunteer
				information pre-filled. All you need to do is enter the hours
			</P>
			<Button onClick={() => createCsvByManager('Javier')(volunteersByManager)}>
				Generate CSV
			</Button>
			<H2>Step #2: Fill in the volunteers hours</H2>
			<P>
				Add hours for your volunteers for the months you would like to upload to
				organiser. Any values left blank will be ignored, so don't worry about
				filling in pre-existing data!
			</P>
			<P>@TODO add screencap here maybe</P>
			<H2>Step #3: Save your filled csv & upload below</H2>
			<P>
				We'll take it from here and upload all the data you've added to the
				organiser system. It really is that simple. If anything has gone wrong
				with the upload, we will let you know so you can try again.
			</P>
			<FileInput handleFileUpload={handleFileUpload} />
		</AppContainer>
	);
}

export default App;
