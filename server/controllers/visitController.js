import db from "../config/db.js";
import path from 'path';
import { sendEmail } from "../helper/index.js";
const saveVisitorData = async (req, res) => {

  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json({
        success: false,
        message: "Id is required"
      });
    }
    const {
      name,
      email,
      mobile,
      contactPerson,
      govId,
      visitPurpose,
      noOfVisitors
    } = req.body;

    const documents = req.files['documents'] || [];
    const capturedImage = req.files['capturedImage'] ? req.files['capturedImage'][0].filename : null;

    const documentsPaths = documents.map(file => file.filename);

    const [result] = await db.query(`UPDATE visitorinfo SET name = ?, email = ?, contact_person = ?, gov_id = ?, visit_purpose = ?,no_of_visitors = ?, captured_image_path = ?,documents = ? WHERE id = ?`, [
      name,
      email,
      contactPerson,
      govId,
      visitPurpose,
      noOfVisitors,
      capturedImage ? path.join('uploads', capturedImage) : null,
      JSON.stringify(documentsPaths.map(doc => path.join('uploads', doc))),
      id
    ]);

    const html = `
       <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; background-color: #f4f4f4;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
<h1 style="color: #4A90E2; font-size: 24px; border-bottom: 2px solid #4A90E2; padding-bottom: 10px; margin-bottom: 20px;">Visitor Information</h1>

    <!-- Correct Image URL -->
    <img src="${process.env.SERVER_URL}/uploads/${capturedImage}" alt="Captured Image" style="max-width: 100%; height: auto; display: block; margin-bottom: 20px;" />

    <p style="margin: 10px 0;"><strong>ID:</strong> ${id}</p>
    <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
    <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
    <p style="margin: 10px 0;"><strong>Mobile:</strong> ${mobile}</p>
    <p style="margin: 10px 0;"><strong>Contact Person:</strong> ${contactPerson}</p>
    <p style="margin: 10px 0;"><strong>Government ID:</strong> ${govId}</p>
    <p style="margin: 10px 0;"><strong>Visit Purpose:</strong> ${visitPurpose}</p>
    <p style="margin: 10px 0;"><strong>Number of Visitors:</strong> ${noOfVisitors}</p>

    <p style="margin: 10px 0;"><strong>Documents:</strong></p>
    ${documentsPaths.length ? documentsPaths.map(doc => `
    <div style="margin-bottom: 10px;">
      <a href="${process.env.SERVER_URL}/uploads/${doc}" download="${doc}" style="display: inline-block; padding: 10px 15px; background-color: #4A90E2; color: #ffffff; text-decoration: none; border-radius: 4px;">Download ${doc}</a>
    </div>`).join('') : '<p>None</p>'}
  </div>
</body>
</html>

      `;
    await sendEmail("rashmiranjanbehera8260@gmail.com", "New Visitor Info Added", html);
    res.status(200).json({ message: 'Success', id: result.insertId });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Error saving form data' });
  }
}
export {
  saveVisitorData
}