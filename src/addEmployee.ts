import * as aws from 'aws-sdk';
import { AdminCreateUserRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { Employee } from './declarations';
// import awsmobile from '../amplify/aws-exports-dev';

const db = new aws.DynamoDB.DocumentClient({ region: 'ap-south-1' });
const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider();

export const handler = async (event) => {
	console.log(event);
	const employee: Employee = event.employee;
	try {
		const url: string = event.pool_url;
		const pool_id = url.substr(url.indexOf('.com') + 5);
		console.log({ pool_id });
		const cognitoParams: AdminCreateUserRequest = {
			UserPoolId: pool_id,
			Username: employee.id,
			UserAttributes: [
				{ Name: 'email', Value: employee.email },
				{ Name: 'preferred_username', Value: employee.id },
				{ Name: 'phone_number', Value: employee.phone },
				{ Name: 'name', Value: employee.name },
				{ Name: 'custom:role', Value: employee.role },
				{ Name: 'custom:trade_id', Value: employee.company_id },
			],
			DesiredDeliveryMediums: ['EMAIL'],
			// MessageAction: 'RESEND',
		};
		await cognitoidentityserviceprovider.adminCreateUser(cognitoParams).promise();

		let employeeParams = {
			TableName: process.env.EMPLOYEES_TABLE || 'ineed-dev',
			Item: {
				...employee,
				status: 'pending',
			},
		};
		await db.put(employeeParams).promise();
		return employeeParams.Item;
	} catch (error) {
		console.log(error);
		return error;
	}
};

const t = {
	claims: {
		sub: 'e2893253-b520-4b7f-891d-1dec4ebd813c',
		email_verified: true,
		iss: 'redacted',
		phone_number_verified: false,
		'cognito:username': 'redacted',
		preferred_username: 'redacted',
		aud: 'redacted',
		event_id: '7fb462d7-adbe-4bfa-b38c-84e9e38c4083',
		token_use: 'id',
		auth_time: 1576064007,
		'custom:status': 'verified',
		'custom:trade_id': 'redacted',
		name: 'Faisal Julaidan ',
		phone_number: 'redacted',
		exp: 1576128586,
		'custom:role': 'admin',
		iat: 1576124986,
		email: 'redacted',
	},
	defaultAuthStrategy: 'ALLOW',
	groups: null,
	issuer: 'redacted',
	sourceIp: ['redacted'],
	sub: 'redacted',
	username: 'redacted',
};
