import { parseAndValidateCsv } from './parseAndValidateCsv';

const validCsv = `ID,volunteer name,volunteer role,April,May,June,July,August,September,October,November,December,January,February,March
1,Rob Upson,Software Engineer,,,,,,,,,,,,\r
2,Kevin I have had some wine and forgotten kevin's last name 🙈,Software Engineer,,,,,,,,,,,,
3,Scott D'Alessandro,Software Engineer,,,,,,,,,,,,`;

describe(`parse and vlaidate csv`, () => {
	describe(`given a valid csv`, () => {
		it(`returns an empty array of errors`, () => {
			const res = parseAndValidateCsv(validCsv);
			expect(res.errors).toEqual({});
		});
	});
});
