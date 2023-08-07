const Sequelize = require('sequelize')
const database = require('./db')
const Check = require('./mCheck');
const User = require('./mUser');
const Object = require('./mObject');
const Movement = require('./mMovement');
const Context = require('./mContext');
const ObjectPlace = require('./mObjectPlace');
const Place = require('./mPlace');

Check.belongsTo(User,{foreignKey: 'whoChecked'});
User.hasMany(Check, {as:'whoChecked',foreignKey: 'whoChecked'});
Check.belongsTo(Place,{foreignKey: 'whereChecked',});
Place.hasMany(Check, {as:'whereChecked',foreignKey: 'whereChecked'});

Context.hasMany(Place, {as:'context',foreignKey: 'context'});
Place.belongsTo(Context,{foreignKey: 'context'});

ObjectPlace.belongsTo(Object, {foreignKey:'idObject'});
Object.hasMany(ObjectPlace,{as:'objectInPlace',foreignKey:'idObject'})
ObjectPlace.belongsTo(Place,{foreignKey:'idPlace'});
Place.hasMany(ObjectPlace,{as:'place',foreignKey:'idObject'})

Movement.belongsTo(Object,{foreignKey:'idObject'});
Object.hasMany(Movement, {as:'object',foreignKey:'idObject'});
Movement.belongsTo(Place, {foreignKey:'fromIdPlace'});
Place.hasMany(Movement, {as:'fromIdPlace', foreignKey:'fromIdPlace'});
Movement.belongsTo(Place, {foreignKey:'toIdPlace'});
Place.hasMany(Movement, {as:'toIdPlace', foreignKey:'toIdPlace'});
Movement.belongsTo(User, {foreignKey:'whoChanged'});
User.hasMany(Movement,{as:'whoChanged', foreignKey:'whoChanged'});
