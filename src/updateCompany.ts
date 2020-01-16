import * as aws from 'aws-sdk';
const db = new aws.DynamoDB.DocumentClient({ region: 'ap-south-1' });
export interface Document {
	label: string;
	description?: string;
	uploaded_by: string;
	uploaded_for: string;
	uploaded_date: string;
	url: string;
}
interface Company {
	id: string;
	email: string;
	call_center?: string;
	english_name: string;
	arabic_name: string;
	added_date: string;
	status: string;
	subscription: string;
	documents: Document[];
}
export const handler = async (args: Company) => {
	try {
		const res = await db
			.get({
				TableName: process.env.COMPANIES_TABLE || 'ineed-dev',
				Key: {
					id: args.id,
				},
			})
			.promise();

		let params = {
			TableName: process.env.COMPANIES_TABLE || 'ineed-dev',
			Item: {
				...args,
				status: 'pending',
				subscription: res.Item ? res.Item.subscription : 'trial',
			},
		};
		const company = (await db.put(params).promise()).$response.data
			? params.Item
			: {
					code: 'CompanyUpdateError',
					message: 'Error Updating Company',
				};
		console.log({ company });
		return company;
	} catch (error) {
		console.log(error);
		return {
			code: error.code ? error.code : 'UNKNOWN',
			msg: error.msg ? error.msg : 'UNKNOWN ERROR',
		};
	}
};
