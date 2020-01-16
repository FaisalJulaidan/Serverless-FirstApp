import * as aws from 'aws-sdk';
import { CognitoEvent } from './declarations';

const db = new aws.DynamoDB.DocumentClient({ region: 'ap-south-1' });
const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider();

export const handler = async (event: CognitoEvent) => {
	console.log(event);
	try {
		const attributes = event.request.userAttributes;
		if (event.triggerSource === 'PreSignUp_AdminCreateUser') {
			event.response = {
				autoConfirmUser: true,
				autoVerifyEmail: true,
				autoVerifyPhone: false,
			};
			return event;
		}

		const companyExists = await db
			.get({
				TableName: process.env.COMPANIES_TABLE || 'ineed-dev',
				Key: {
					id: attributes['custom:trade_id'],
				},
			})
			.promise();
		console.log(companyExists);
		if (companyExists.Item) {
			throw new Error('Company Exists');
		}
		return event;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const addCompany = async (event) => {
	console.log(event);
	const attributes = JSON.parse(event.body);
	console.log(attributes);
	try {
		const signedUp = await cognitoidentityserviceprovider
			.adminGetUser({
				UserPoolId: attributes.pool_id,
				Username: attributes.id,
			})
			.promise();
		console.log(signedUp);
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'User Not Signed up' }),
		};
	}

	const today = new Date();
	const added_date = `${today.getFullYear()}-${today.getMonth() +
		1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}`;
	let company = {
		TableName: process.env.COMPANIES_TABLE || 'ineed-dev',
		Item: {
			id: attributes.trade_id,
			email: attributes.unified_email,
			added_date,
			call_center: attributes.call_center || '-',
			english_name: attributes.english_name,
			arabic_name: attributes.arabic_name,
			status: 'new',
			subscription: 'trial',
		},
	};
	console.log({ company });
	await db.put(company).promise();

	let employee = {
		TableName: process.env.EMPLOYEES_TABLE || 'ineed-dev',
		Item: {
			id: attributes.id,
			company_id: attributes.trade_id,
			email: attributes.email,
			added_date,
			phone: attributes.phone,
			name: attributes.name,
			status: 'verified',
			role: 'admin',
		},
	};
	console.log({ employee });
	await db.put(employee).promise();
	return {
		statusCode: 200,
		headers: {
			'access-control-allow-origin': event.headers.origin,
		},
		body: JSON.stringify({ message: 'Success' }),
	};
};

const t = {
	version: '1',
	region: 'ap-south-1',
	userPoolId: 'redacted',
	userName: 'redacted',
	callerContext: {
		awsSdkVersion: 'aws-sdk-unknown-unknown',
		clientId: 'redacted',
	},
	triggerSource: 'PreSignUp_SignUp',
	request: {
		userAttributes: {
			password: 'redacted',
			unified_email: 'appdrivedevelopers@gmail.com',
			call_center: '+966133782222',
			trade_id: 'redacted',
			phone: 'redacted',
			arabic_name: 'آب درايف',
			name: 'Hussain Alaidarous',
			confirmPassword: 'redacted',
			id: 'redacted',
			email: 'redacted',
			english_name: 'redacted',
		},
		validationData: null,
	},
	response: {
		autoConfirmUser: false,
		autoVerifyEmail: false,
		autoVerifyPhone: false,
	},
};
