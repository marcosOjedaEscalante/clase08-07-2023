import pkg from 'pg';
const { Client } = pkg;

const findAll = async () => {

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'casoEstudiantes',
        password: 'root',
        port: 5432
    });

    await client.connect();

    const res = await client.query('SELECT * FROM curso');
    await client.end();
    return res.rows;
}

const findByIdPlanFormativo = async (idPlanFormativo) => {
    const connectionString = 'postgresql://postgres:root@localhost:5432/casoEstudiantes';

    const client = new Client({
        connectionString
    });

    await client.connect();

    const text = 'SELECT * FROM curso WHERE codigo_plan_formativo = $1';
    const values = [idPlanFormativo];

    const res = await client.query(text, values);
    await client.end();
    return res.rows;
}

const create = async (codigoCurso, fechaInicio, fechaTermino, codigoComuna, codigoPlanFormativo) => {
    const connectionString = 'postgresql://postgres:root@localhost:5432/casoEstudiantes';

    const client = new Client({
        connectionString
    });

    await client.connect();

    const text = 'INSERT INTO curso(codigo_curso, fecha_inicio, fecha_termno, codigo_comuna, codigo_plan_formativo) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const values = [codigoCurso, fechaInicio, fechaTermino, codigoComuna, codigoPlanFormativo];

    const res = await client.query(text, values);
    await client.end();
    return res.rows;
}

const update = async (fechaTermino, codigoCurso) => {
    const connectionString = 'postgresql://postgres:root@localhost:5432/casoEstudiantes';

    const client = new Client({
        connectionString
    });

    await client.connect();

    const text = "UPDATE curso SET fecha_termno = $1 WHERE codigo_curso = $2 RETURNING *";
    const values = [fechaTermino, codigoCurso];

    const res = await client.query(text, values);
    console.log(res.rows);
    await client.end();
}

const deleteById = async (idCurso) => {
    const connectionString = 'postgresql://postgres:root@localhost:5432/casoEstudiantes';

    const client = new Client({
        connectionString
    });

    await client.connect();

    const text = "DELETE FROM curso WHERE codigo_curso = $1 RETURNING *";
    const values = [idCurso];

    const res = await client.query(text, values);
    await client.end();
    return res.rows;
}

export{
    findAll,
    findByIdPlanFormativo,
    create,
    update,
    deleteById
}