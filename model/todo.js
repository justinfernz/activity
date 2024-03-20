const pool = require('./database');

const create = async (description) => {
    try {
        const result = await pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [
            description,
        ]);
        return result.rows[0]; // Assuming you want to return the inserted row
    } catch (error) {
        throw error;
    }
};

const get = async () => {
    try {
        const result = await pool.query('SELECT * FROM todo');
        return result.rows; // Assuming you want to return all rows
    } catch (error) {
        throw error;
    }
};

const removeTodo = async (id) => {
    try {
        await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    removeTodo,
    get,
    create,
};

