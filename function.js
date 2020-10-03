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

  const docRef = firestore.collection('americanCar').doc(plaque);

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

  const query = await carsRef.where('plaque', '==', plaque).get();

  if (query.empty) {
    return res.status(404).send('No car found for this plaque!');
  }

  const snapshot = query.docs[0];
  const data = snapshot.data();

  res.status(200).send(data);
};
