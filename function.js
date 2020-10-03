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

exports.findCarByPlaque = async (req, res) => {
  const { plaque } = req.query;

  const firestore = new Firestore({
    projectId: 'PROJECT_ID',
    keyFilename: './keyfile.json',
  });

  const carsRef = firestore.collection('americanCar');

  const snapshot = await carsRef.where('plaque', '==', plaque).get();

  if (snapshot.empty) {
    return res.status(404).send('No car found for this plaque!');
  }

  res.status(200).send(snapshot[0].data());
};
