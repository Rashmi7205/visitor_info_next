import axios from 'axios';
// import twilio from 'twilio';
// const sendSms = async (to,body)=>{
//   const client = twilio(process.env.TW_ACCOUNT_SID, process.env.TW_AUTH_TOKEN);
//   const message = await client.messages.create({
//     from: process.env.TW_PHONE_NUMBER,
//     to: `+91${to}`,
//     body,
//   });
//  return message;
// }
const sendSms = async (to,body)=>{
  try {
    const url = `https://msg2all.com/TRANSAPI/sendsms.jsp?login=${process.env.SMS_PROVIDER_USER_NAME}&passwd=${process.env.SMS_PROVIDER_USER_PASS}&version=v1.0&msisdn=91${to}&msg_type=text&msg=${body}&sender_id=${process.env.SMS_PROVIDER_SENDER_ID}`;
   const { data } = await axios.post(url);
    return data.result.status.statusCode=="0"?true:false;
  } catch (error) {
    console.log(error);
    return false;
}
}

export default sendSms;