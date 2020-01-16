import * as aws from 'aws-sdk';
import { CognitoEvent, CognitoUser } from './declarations';
import sendEmail from './sendEmail';
// import awsmobile from '../amplify/aws-exports-dev';

const db = new aws.DynamoDB.DocumentClient({ region: 'ap-south-1' });
const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider();

export const handler = async (event: CognitoEvent) => {
	console.log(event);
	try {
		const user = event.request.userAttributes;
		if (event.triggerSource === 'PostConfirmation_ConfirmSignUp') {
			await newUser(user, event.userName, event.userPoolId);
		} else if (event.triggerSource === 'PostConfirmation_ConfirmForgotPassword') {
			await sendEmail(
				user.email,
				'Account Modification',
				`Hello ${user.name}, your password has just been reset.`,
			);
		}
		return event;
	} catch (error) {
		console.log(error);
		return error;
	}
};

const newUser = async (user: CognitoUser, username, pool_id) => {
	//Add user to admin group
	const cognitoParams = {
		UserPoolId: pool_id,
		Username: username,
		UserAttributes: [ { Name: 'custom:role', Value: 'admin' } ],
	};
	await cognitoidentityserviceprovider.adminUpdateUserAttributes(cognitoParams).promise();

	let employee = {
		TableName: process.env.EMPLOYEES_TABLE || 'ineed-dev',
		Key: {
			id: username,
			company_id: user['custom:trade_id'],
		},
		UpdateExpression: 'set #s1 = :s2',
		ExpressionAttributeNames: {
			'#s1': 'status',
		},
		ExpressionAttributeValues: {
			':s2': 'verified',
		},
		ReturnValues: 'UPDATED_NEW',
	};
	await db.update(employee).promise();

	//Send email to user based on role
	const message = `Hello ${user.name}, welcome to iNeed Car Rental. You are the Admin for ${user[
		'custom:trade_id'
	]}.`;
	await sendEmail(user.email, 'Welcome to iNeed', message);
};

const test = {
	version: '1',
	region: 'ap-south-1',
	userPoolId: 'redacted',
	userName: 'redacted',
	callerContext: {
		awsSdkVersion: 'aws-sdk-unknown-unknown',
		clientId: 'redacted',
	},
	triggerSource: 'PostConfirmation_ConfirmSignUp' || 'PostConfirmation_ConfirmForgotPassword',
	request: {
		userAttributes: {
			sub: 'redacted',
			'cognito:email_alias': 'redacted',
			'cognito:user_status': 'CONFIRMED',
			email_verified: 'true',
			name: 'AppDrive',
			'custom:trade_id': 'redacted',
			'custom:subscription': 'trial',
			phone_number_verified: 'false',
			phone_number: 'redacted',
			email: 'redacted',
		},
	},
	response: {},
};
