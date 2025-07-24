import * as SQLite from 'expo-sqlite';

let dbInstance = null;

// Función principal para abrir la conexión
export const openDatabaseConnection = async () => {
  if (dbInstance) return dbInstance;
  
  try {
    dbInstance = await SQLite.openDatabaseAsync('scanresults.db');
    
    await dbInstance.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE scan_results (
        id INTEGER PRIMARY KEY NOT NULL,
        lote TEXT NOT NULL,
        informe_url TEXT,
        fecha_informe TEXT,
        certificado_url TEXT,
        fecha_certificado TEXT,
        created_at TEXT,
        scan_date TEXT NOT NULL
      );
    `);
    
    return dbInstance;
  } catch (error) {
    console.error('Error opening database:', error);
    throw error;
  }
};

// Operaciones CRUD
export const ScanDatabase = {
  // Insertar o actualizar un registro
  insertResult: async (resultData) => {
    try {
      const db = await openDatabaseConnection();
      const result = await db.runAsync(
        `INSERT INTO scan_results 
        (lote, informe_url, fecha_informe, certificado_url, fecha_certificado, created_at, scan_date) 
        VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,
        [
          resultData.lote,
          resultData.informe || null,
          resultData.fecha_informe || null,
          resultData.certificado || null,
          resultData.fecha_certificado || null,
          resultData.created_at || new Date().toISOString()
        ]
      );
      return {
        success: true,
        insertId: result.lastInsertRowId,
        changes: result.changes
      };
    } catch (error) {
      console.error('Insert error:', error);
      throw error;
    }
  },

  // Obtener todos los resultados ordenados
  getAllResults: async () => {
    try {
      const db = await openDatabaseConnection();
      const results = await db.getAllAsync(
        `SELECT * FROM scan_results 
         ORDER BY scan_date DESC`
      );
      return results;
    } catch (error) {
      console.error('Fetch all error:', error);
      throw error;
    }
  },

  // Obtener un resultado específico por lote
  getResultByLote: async (lote) => {
    try {
      const db = await openDatabaseConnection();
      const result = await db.getFirstAsync(
        `SELECT * FROM scan_results 
         WHERE lote = ?`,
        [lote]
      );
      return result;
    } catch (error) {
      console.error('Fetch by lote error:', error);
      throw error;
    }
  },

  // Eliminar un registro
  deleteResult: async (lote) => {
    try {
      const db = await openDatabaseConnection();
      const result = await db.runAsync(
        `DELETE FROM scan_results 
         WHERE lote = ?`,
        [lote]
      );
      return result.changes > 0;
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  }
};