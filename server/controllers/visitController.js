import db from "../config/db.js";
import path from 'path';
import sendSms from "../middleware/sendSms.js";
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
    const approveMessage = `Dear ${process.env.ADMIN_NAME},A new visit request has been registered for ${name}. The contact person for this visit is contact. Please review and approve the visit using the following link:${process.env.CLIENT_URL}/visit-approved/${id}.Thank you! Ikontel Solutions Pvt.Ltd.`;
    await sendSms(process.env.ADMIN_PHONE_NUMBER,approveMessage);
    res.status(200).json({ message: 'Success', id: result.insertId });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Error saving form data' });
  }
}

const approveVisit = async (req, res) => {
  try {
    const id = req.params.id;
    const date = req.body.date;
    const [visitExist] = await db.query(`SELECT * FROM visitorinfo WHERE id=${id}`);
    const user = visitExist[0];
    if (user.approved === 'yes') {
      return res.status(202).json({ success: false, message: 'This visit has already been approved.' });
    }
    if(visitExist.length > 0){
      const [result] = await db.query(`UPDATE visitorinfo SET approved='yes',visit_date='${date}' WHERE id=${id}`);
      const message = `Dear ${user.name}, ${user.contact_person} has approved your visit request. #url# please display the e-visitor pass to the reception which is in the link. Thank You - Ikontel Soluions Pvt. Ltd. Team`;

      // await sendSms(user.mobile, message);

      res.status(200).json({success:true,message: 'Visit approved successfully' });

    }else{
      res.status(404).json({success:false,message: 'Visit not found' });
    }
  } catch (error) {
      res.status(501).json({success:false,message:"Internal Server Error"});
  }
}
//get visitors info by id
const getVisitorInfoById = async (req,res)=>{
  try {
    const {id} = req.params;
    if(!id){
      return res.status(404).json({success:false,message: 'Missing Required Param id' });
    }
    const [result] = await db.query(`SELECT * FROM visitorinfo WHERE id=${id}`);
    if(result.length > 0){
      return res.status(200).json({
        success: true,
        data: result[0],
      });
    }
    return res.status(401).json({
      success: false,
      message:"Cannot Find Record of this id"
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({success:false,message:"Internal Server Error"});
  }
}

export {
  saveVisitorData,
  approveVisit,
  getVisitorInfoById
} 