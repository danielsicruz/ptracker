const Sequelize = require('sequelize')
const database = require('./db')
const Check = require('./mCheck');
const User = require('./mUser');
const Object = require('./mObject');
const Movement = require('./mMovement');
const Context = require('./mContext');
const ObjectPlace = require('./mObjectPlace');
const Place = require('./mPlace');

//Relations in Check table with User and Place
Check.belongsTo(User,{foreignKey: 'whoChecked'});
User.hasMany(Check, {as:'whoChecked',foreignKey: 'whoChecked'});
Check.belongsTo(Place,{foreignKey: 'whereChecked',});
Place.hasMany(Check, {as:'whereChecked',foreignKey: 'whereChecked'});

//Relations in Context table with Place
Context.hasMany(Place, {as:'place',foreignKey: 'context'});
Place.belongsTo(Context,{as:'contextPlace',foreignKey: 'context'});

//Relations in ObjectPlace table with Object and Place
ObjectPlace.belongsTo(Object,{ as:'object',foreignKey:'idObject'});
Object.hasMany(ObjectPlace,{as:'objectInPlace',foreignKey:'idObject'});
ObjectPlace.belongsTo(Place,{as:'place',foreignKey:'idPlace'});
Place.hasMany(ObjectPlace,{as:'refPlace',foreignKey:'idObject'});
ObjectPlace.belongsTo(Place,{as:'wherePlace',foreignKey:'whereIs', allowNull: true});
Place.hasMany(ObjectPlace,{as:'whereIs',foreignKey:'whereIs', allowNull: true});

//Relations in Movement table with Object, Place, User
Movement.belongsTo(Object,{foreignKey:'idObject'});
Object.hasMany(Movement, {as:'movement',foreignKey:'idObject'});
Movement.belongsTo(Place, {as:'fromPlace',foreignKey:'fromIdPlace'});
Place.hasMany(Movement, {as:'fromIdPlace', foreignKey:'fromIdPlace'});
Movement.belongsTo(Place, {as:'toPlace',foreignKey:'toIdPlace'});
Place.hasMany(Movement, {as:'toIdPlace', foreignKey:'toIdPlace'});
Movement.belongsTo(User, {foreignKey:'whoChanged'});
User.hasMany(Movement,{as:'whoChanged', foreignKey:'whoChanged'});
