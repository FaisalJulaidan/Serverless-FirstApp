export interface CognitoUser {
	'custom:role': string;
	'custom:status': string;
	'custom:trade_id': string;
	email: string;
	email_verified: boolean;
	name: string;
	phone_number: string;
	phone_number_verified: boolean;
	sub: string;
}

export interface CognitoEvent {
	version: string;
	region: string;
	userPoolId: string;
	userName: string;
	callerContext: {
		awsSdkVersion: string;
		clientId: string;
	};
	triggerSource:
		| 'PostConfirmation_ConfirmSignUp'
		| 'PostConfirmation_ConfirmForgotPassword'
		| 'PreSignUp_AdminCreateUser';
	request: {
		userAttributes: CognitoUser;
	};
	response: {
		autoConfirmUser: boolean;
		autoVerifyEmail: boolean;
		autoVerifyPhone: boolean;
	};
}
export interface Employee {
	id: string;
	company_id: string;
	email: string;
	name: string;
	phone: string;
	added_date: string;
	role: string;
	access_list: string[];
	status: string;
}
