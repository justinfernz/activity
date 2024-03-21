import pool from './database';

export const create = async (description) => { //does this have to be an async function?
    try { //is there a way to write this without try/catch?
        const result = await pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [
            description,
        ]);
        return result.rows[0]; // Assuming you want to return the inserted row
    } catch (error) {
        throw error;
    }
};

export const get = async () => {
    try { //code can be simplified (hint: try/catch & async may not be needed)
        const result = await pool.query('SELECT * FROM todo');
        return result.rows; // Assuming you want to return all rows
    } catch (error) {
        throw error;
    }
};

export const removeTodo = async (id) => {
    try { //same as above, you can simplify this function without using try/catch & async
        await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
    } catch (error) {
        throw error;
    }
};

//your original method of exporting each function as module.exports may be the better option
