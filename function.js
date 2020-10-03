const Firestore = require('@google-cloud/firestore');

exports.createCar = async (req, res) => {
  const {
    plaque,
    color,
    price,
    brand,
    carModel,
  } = req.body;

  const firestore = new Firestore({
    projectId: 'PROJECT_ID',
    keyFilename: './keyfile.json',
  });

  const docRef = firestore.collection('americanCar').doc('car');

  await docRef.set({
    plaque,
    color,
    price,
    brand,
    carModel,
  })

  res.status(200).send('Car created!');
};