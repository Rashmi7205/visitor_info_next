import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import { generateOTP, getCurrentTimestamp } from '../helper/index.js';
import sendSms from '../middleware/sendSms.js';

const secretKey = 'your_jwt_secret_key';

export const signup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    console.log(rows);
    if (rows.length === 0) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
    const user = rows[0];

    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const sendOtp = async (req,res)=>{
  const {mobile} = req.params;
  if(!mobile){
    return res.status(401).json({
      success:false,
      message:"Mobile number is required"
    });
  }
  const otp = generateOTP();
  const otpSentTime = getCurrentTimestamp();
  const message = `Dear visitor ,Welcome to Ikontel Solutions Pvt. Ltd. .Please Use ${otp} to verify your Mobile number. Thank You Ikontel Solutions Pvt.Ltd.Team.`;
  try {
    const response = await sendSms(mobile, message);
    if(response){
      const [result] = await db.execute(
        `INSERT INTO visitorinfo (mobile, otp, otp_sent_time)
      VALUES (?, ?, ?)`,
        [mobile, otp, otpSentTime]
      );

      if (result.affectedRows > 0) {
        res.status(200).json({ success: true, message: 'OTP sent successfully', id: result.insertId });
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    }

  } catch (error) {
    console.error('Error updating OTP:', error);
    res.status(500).json({success:false,message: 'Failed to send OTP' });
  }
}

export const verifyOtp = async (req,res)=>{
  const { id, otp } = req.body;
  if (!id || !otp) {
    return res.status(400).json({success:false, message: 'User ID and OTP are required' });
  }

  try {
    const [rows] = await db.execute(
      `SELECT otp, otp_sent_time FROM visitorinfo WHERE id = ?`,
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success:false,message: 'User not found' });
    }
    const storedOtp = rows[0].otp;
    const otpSentTime = rows[0].otp_sent_time;

    // Optionally, check if OTP is within a valid time frame (e.g., 5 minutes)
    const currentTime = new Date(getCurrentTimestamp()).getTime();
    const sentTime = new Date(otpSentTime).getTime();
    const otpValidityPeriod = 5 * 60 * 1000;

    if (currentTime - sentTime > otpValidityPeriod) {
      return res.status(400).json({success:false, message: 'OTP has expired' });
    }
    if (otp === storedOtp) {
      res.status(200).json({success:true, message: 'OTP verified successfully' });
    } else {
      res.status(400).json({success:false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({success:false, message: 'Failed to verify OTP' });
  }
}
