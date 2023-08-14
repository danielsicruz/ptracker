-- PAY ATTENTION ON THIS INSTRUCTION, KEEP COMMENTED
-- DROP DATABASE IF EXISTS ptracker;
-- CREATE DATABASE ptracker;
-- PAY ATTENTION ON THIS INSTRUCTION, KEEP COMMENTED
USE ptracker;

-- Start Contexts dummy data
INSERT INTO
    Contexts(`name`, `createdAt`, `updatedAt`)
VALUES
    ('Escola', '2023-05-08 23:45', '2023-05-08 23:45');

INSERT INTO
    Contexts(`name`, `createdAt`, `updatedAt`)
VALUES
    ('CAT', '2023-05-08 23:45', '2023-05-08 23:45');

-- End Contexts dummy data
-- Start Users dummy data
INSERT INTO
    Users(
        `id`,
        `name`,
        `login`,
        `password`,
        `active`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        '8f74b043-c036-4b1b-ac6c-c2231648258c',
        'Daniel',
        'ssDaniel',
        '1234',
        1,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    Users(
        `id`,
        `name`,
        `login`,
        `password`,
        `active`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        '2cf96536-daf0-41a6-8c3b-01935834a7c3',
        'usuario',
        'ssUsuario',
        '1234',
        1,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

-- End Users dummy data
-- Start Objects dummy data
INSERT INTO
    Objects(
        `id`,
        `name`,
        `description`,
        `imagePath`,
        `dispatched`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        1310521,
        'Cadeira Vermelha',
        'Cadeira Vermelha',
        '\images\objects\1310521',
        0,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    Objects(
        `id`,
        `name`,
        `description`,
        `imagePath`,
        `dispatched`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        1310522,
        'Cadeira Vermelha',
        'Cadeira Vermelha',
        '\images\objects\1310522',
        0,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    Objects(
        `id`,
        `name`,
        `description`,
        `imagePath`,
        `dispatched`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        1310523,
        'Cadeira Azul',
        'Cadeira Azul',
        '\images\objects\1310523',
        0,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    Objects(
        `id`,
        `name`,
        `description`,
        `imagePath`,
        `dispatched`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        1310524,
        'Cadeira Azul',
        'Cadeira Azul',
        '\images\objects\1310524',
        0,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    Objects(
        `id`,
        `name`,
        `description`,
        `imagePath`,
        `dispatched`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        1310525,
        'Cadeira Azul',
        'Cadeira Azul',
        '\images\objects\1310525',
        1,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    Objects(
        `id`,
        `name`,
        `description`,
        `imagePath`,
        `dispatched`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        1310526,
        'Cadeira Amarela',
        'Cadeira Amarela',
        '\images\objects\1310526',
        0,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

-- End Objects dummy data
-- Start Places dummy data
INSERT INTO
    Places(
        `vid`,
        `name`,
        `context`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        1,
        'Despachado Escola',
        1,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    Places(
        `vid`,
        `name`,
        `context`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        2,
        'Despachado CAT',
        2,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    Places(
        `vid`,
        `name`,
        `context`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        103115,
        'Sala 1',
        1,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    Places(
        `vid`,
        `name`,
        `context`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        103116,
        'Sala 2',
        1,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    Places(
        `vid`,
        `name`,
        `context`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        103117,
        'Sala 3',
        1,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    Places(
        `vid`,
        `name`,
        `context`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        103118,
        'Sala 4',
        1,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    Places(
        `vid`,
        `name`,
        `context`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        103119,
        'Academia',
        2,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    Places(
        `vid`,
        `name`,
        `context`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        103120,
        'Sala de judô',
        2,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    Places(
        `vid`,
        `name`,
        `context`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        103121,
        'Sala de ginástica',
        2,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    Places(
        `vid`,
        `name`,
        `context`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        103122,
        'Hall de entrada',
        2,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

-- End Places dummy data
-- Start Check dummy data
INSERT INTO
    Checks(
        `id`,
        `whoChecked`,
        `whereChecked`,
        `objectsToFind`,
        `foundObjects`,
        `missingObjects`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        'a7893d4a-8f85-4af0-82ce-05b4aac30b06',
        '8f74b043-c036-4b1b-ac6c-c2231648258c',
        3,
        5,
        5,
        0,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    Checks(
        `id`,
        `whoChecked`,
        `whereChecked`,
        `objectsToFind`,
        `foundObjects`,
        `missingObjects`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        'f5e5d29a-1fe3-41fa-8f06-b97a47b6478d',
        '8f74b043-c036-4b1b-ac6c-c2231648258c',
        4,
        0,
        0,
        0,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

-- End Check dummy data
-- Start ObjectPlaces dummy data
INSERT INTO
    ObjectPlaces(
        `idObject`,
        `idPlace`,
        `isThere`,
        `movedBy`,
        `lastCheck`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        1310521,
        3,
        1,
        '8f74b043-c036-4b1b-ac6c-c2231648258c',
        'a7893d4a-8f85-4af0-82ce-05b4aac30b06',
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    ObjectPlaces(
        `idObject`,
        `idPlace`,
        `isThere`,
        `movedBy`,
        `lastCheck`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        1310522,
        3,
        1,
        '8f74b043-c036-4b1b-ac6c-c2231648258c',
        'a7893d4a-8f85-4af0-82ce-05b4aac30b06',
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    ObjectPlaces(
        `idObject`,
        `idPlace`,
        `isThere`,
        `movedBy`,
        `lastCheck`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        1310523,
        3,
        1,
        '8f74b043-c036-4b1b-ac6c-c2231648258c',
        'a7893d4a-8f85-4af0-82ce-05b4aac30b06',
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    ObjectPlaces(
        `idObject`,
        `idPlace`,
        `isThere`,
        `movedBy`,
        `lastCheck`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        1310524,
        4,
        1,
        '8f74b043-c036-4b1b-ac6c-c2231648258c',
        'a7893d4a-8f85-4af0-82ce-05b4aac30b06',
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    ObjectPlaces(
        `idObject`,
        `idPlace`,
        `isThere`,
        `movedBy`,
        `lastCheck`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        1310524,
        3,
        1,
        '8f74b043-c036-4b1b-ac6c-c2231648258c',
        'a7893d4a-8f85-4af0-82ce-05b4aac30b06',
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    ObjectPlaces(
        `idObject`,
        `idPlace`,
        `isThere`,
        `movedBy`,
        `lastCheck`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        1310526,
        3,
        1,
        '8f74b043-c036-4b1b-ac6c-c2231648258c',
        'a7893d4a-8f85-4af0-82ce-05b4aac30b06',
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

-- End ObjectPlaces dummy data
-- Start Movement dummy data
INSERT INTO
    Movements(
        `idObject`,
        `fromIdPlace`,
        `toIdPlace`,
        `whoChanged`,
        `temporary`,
        `whenBack`,
        `isBack`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        1310524,
        3,
        4,
        '2cf96536-daf0-41a6-8c3b-01935834a7c3',
        0,
        null,
        null,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );

INSERT INTO
    Movements(
        `idObject`,
        `fromIdPlace`,
        `toIdPlace`,
        `whoChanged`,
        `temporary`,
        `whenBack`,
        `isBack`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        1310526,
        3,
        4,
        '2cf96536-daf0-41a6-8c3b-01935834a7c3',
        1,
        '2023-06-08 23:45',
        1,
        '2023-05-08 23:45',
        '2023-05-08 23:45'
    );
INSERT INTO
    Movements(
        `idObject`,
        `fromIdPlace`,
        `toIdPlace`,
        `whoChanged`,
        `temporary`,
        `whenBack`,
        `isBack`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        1310526,
        3,
        4,
        '2cf96536-daf0-41a6-8c3b-01935834a7c3',
        1,
        '2023-06-13 23:45',
        0,
        '2023-05-12 23:45',
        '2023-05-12 23:45'
    );

-- End Movement dummy data