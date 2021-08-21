type Role = 'Software Engineer' | 'Designer' | 'Product Owner';

type Volunteer = {
	firstName: string;
	lastName: string;
	roleName: Role;
};

export type Volunteers = {
	[volunteerId: number]: Volunteer;
};

const volunteers: Volunteers = {
	1: {
		firstName: 'Rob',
		lastName: 'Upson',
		roleName: 'Software Engineer',
	},
	2: {
		firstName: 'Kevin',
		lastName: `I have had some wine and forgotten kevin's last name 🙈`,
		roleName: 'Software Engineer',
	},
	3: {
		firstName: 'Scott',
		lastName: `D'Alessandro`,
		roleName: 'Software Engineer',
	},
};

export type ManagerName = string;
export const volunteersByManager: Record<ManagerName, Volunteers> = {
	Javier: volunteers,
};
