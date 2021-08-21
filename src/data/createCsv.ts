import { ManagerName, Volunteers } from './mockData';
import * as R from 'remeda';

const months = [
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
	'January',
	'February',
	'March',
];

// const identityFn: <T>(x: T) => T = (x) => x;

const filePrefix = 'data:text/csv;charset=utf-8,';

const write2dArrayToCsvFile = (data: string[][]) => {
	const csvContent = `${filePrefix}${data
		.map((row) => row.join(','))
		.join('\r\n')}`;
	console.log(`got csvCOntent>>>>>`, csvContent);
	const encodedUri = encodeURI(csvContent);
	console.log(`encoded uri>>>>>`, encodedUri);
	const link = document.createElement('a');
	link.setAttribute('href', encodedUri);
	link.setAttribute('download', 'volunteer_hours_template.csv');
	document.body.appendChild(link);
	link.click();
};

export const createCsvByManager =
	(managerName: string) => (volunteers: Record<ManagerName, Volunteers>) => {
		const volunteersToInclude = volunteers[managerName];
		const vols = R.values(volunteersToInclude);
		const headers = ['volunteer name', 'volunteer role', ...months];
		console.log(`got headers >>>>`, headers);
		const rows = vols.map((v) => [
			`${v.firstName} ${v.lastName}`,
			v.roleName,
			...R.times(() => ' ')(months.length),
		]);
		console.log(`got rows>>>>>`, rows);
		const csvAsArray = [headers, ...rows];
		console.log(`got csvAsArrays>>>>>>`, csvAsArray);

		return write2dArrayToCsvFile(csvAsArray);
	};
