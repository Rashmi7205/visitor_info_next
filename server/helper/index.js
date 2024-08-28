
import nodemailer from 'nodemailer';
export function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
export function getCurrentTimestamp() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}
