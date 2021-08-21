import { months } from './createCsv';

// type PartitionList = (sublistLength: number) => <T>(list: T[]) => T[][];
// // @ts-ignore
// const partitionList: PartitionList = (subListLength) => (list) => {
// 	const partition = R.take(subListLength)(list);
// 	const remaining = R.drop(subListLength)(list);
// 	if (remaining.length)
// 		return [partition, partitionList(subListLength)(remaining)];
// 	return [partition];
// };

const isEmptyString = (s: string) => s === '';
const isNumericString = (s: string) => RegExp(/^\d+$/).test(s);
const isValidHoursInput = (s: string) => isNumericString(s) || isEmptyString(s);

const isValidId = (id: string): boolean => id.length > 0 && isNumericString(id);
const getMonthsForInvalidIndexes = (indexes: number[], row: string[]) =>
	indexes.reduce(
		(acc, curr) =>
			`${!!acc ? `${acc}, ` : ''}${months[curr]}: ${row[curr + 3]}`,
		'',
	);

const validateHoursDataForRow = (row: string[]) => {
	console.log(`vlaidating row>>>>`, row);
	const invalidHoursIndexes = row
		.slice(3)
		.reduce(
			(acc, hoursValue, index) =>
				isValidHoursInput(hoursValue) ? acc : acc.concat([index]),
			new Array<number>(),
		);
	const errors = [];
	if (!isValidId(row[0])) {
		errors.push(
			`Invalid ID ${row[0]} for volunteer. Please do not change ID provided by template`,
		);
	}
	if (invalidHoursIndexes.length > 0) {
		errors.push(
			`Invalid hours value for month(s): ${getMonthsForInvalidIndexes(
				invalidHoursIndexes,
				row,
			)}`,
		);
	}
	return errors;
};

export type ValidationResult = {
	errors: {
		[rowNum: number]: string[];
	};
};

export const parseAndValidateCsv = (csvString: string): ValidationResult => {
	const asRows = csvString
		.split('\n')
		.map((rowString) => rowString.split(','))
		.slice(1)
		.map((row) =>
			row.map((elt, index) =>
				row.length - 1 === index ? elt.replace('\r', '').trim() : elt.trim(),
			),
		);
	console.log(`asRows>>>>>`, asRows);

	const errors = asRows.reduce((acc, curr, index) => {
		const rowErrors = validateHoursDataForRow(curr);
		console.log(`rowErrors>>>>>>`, rowErrors);
		if (rowErrors.length === 0) return acc;
		return Object.assign(acc, { [index]: rowErrors });
	}, {});

	return {
		errors,
	};
};
