import twilio from 'twilio';
const sendSms = async (to,body)=>{
  const client = twilio(process.env.TW_ACCOUNT_SID, process.env.TW_AUTH_TOKEN);
  const message = await client.messages.create({
    from: process.env.TW_PHONE_NUMBER,
    to: `+91${to}`,
    body,
  });
 return message;
}

export default sendSms;