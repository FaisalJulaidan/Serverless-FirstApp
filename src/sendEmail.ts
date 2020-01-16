import * as aws from 'aws-sdk';

const ses = new aws.SES({ apiVersion: '2010-12-01', region: 'us-east-1' });

export default async (to: string, subject: string, message: string, from?: string) => {
	const fromAddress = from || 'redacted';
	var params = {
		Destination: {
			BccAddresses: [ 'redacted' ],
			ToAddresses: [ to ],
		},
		Message: {
			Body: {
				Html: {
					Charset: 'UTF-8',
					Data: message,
				},
				Text: {
					Charset: 'UTF-8',
					Data: message,
				},
			},
			Subject: {
				Charset: 'UTF-8',
				Data: subject,
			},
		},
		Source: `iNeed Car Rental <${fromAddress}>`,
		ReplyToAddresses: [ fromAddress ],
	};
	const data = await ses.sendEmail(params).promise();
	return data;
};
