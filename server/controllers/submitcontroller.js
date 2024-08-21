import pool from './db';

export const submitVisitorForm = async (req,res) => {
  const {
    name,
    email,
    mobile,
    contactPerson,
    govId,
    visitPurpose,
    noOfVisitors,
    documents,
  } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO VisitorInfo
      (name, email, mobile, contact_person, gov_id, visit_purpose, no_of_visitors, documents)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
        mobile,
        contactPerson,
        govId,
        visitPurpose,
        noOfVisitors,
        JSON.stringify(documents), // Convert documents array to JSON string
      ]
    );

    res.status(200).json({ message: 'Form submitted successfully', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting form', error });
  }
};

export const getVisitors = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM VisitorInfo');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving visitors', error });
  }
};
