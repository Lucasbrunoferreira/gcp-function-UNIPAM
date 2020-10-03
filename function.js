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

  console.log('PARAMS -> ', req.query);
  console.log('PLAQUE -> ', plaque);

  const firestore = new Firestore({
    projectId: 'PROJECT_ID',
    keyFilename: './keyfile.json',
  });

  const carsRef = firestore.collection('americanCar');

  const car = await carsRef.where('plaque', '==', plaque).get();

  if (car.empty) {
    console.log('No car found for this plaque!');

    return res.status(404).send('No car found for this plaque!');
  }

  console.log('CAR -> ', car.data());

  res.status(200).send(car.data());
};
