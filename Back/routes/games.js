// Back/routes/games.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ---------- GAME ----------
router.get('/', async (req, res, next) => {
  try {
    const { rows } = await db.query(
      `SELECT id, name, slug, coverurl, description, active
       FROM game ORDER BY id DESC`
    );
    res.json(rows);
  } catch (e) { next(e); }
});

router.get('/:idOrSlug', async (req, res, next) => {
  try {
    const p = req.params.idOrSlug;
    const isId = /^\d+$/.test(p);
    const sql = isId
      ? `SELECT id, name, slug, coverurl, description, active FROM game WHERE id=$1`
      : `SELECT id, name, slug, coverurl, description, active FROM game WHERE slug=$1`;
    const { rows } = await db.query(sql, [p]);
    if (!rows[0]) return res.status(404).json({ message: 'Game not found' });
    res.json(rows[0]);
  } catch (e) { next(e); }
});


router.post('/', async (req, res, next) => {
  try {
    const { name, slug, coverurl, description } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: 'name is required' });

    // เช็กซ้ำ
    const check = await db.query(
      `SELECT id FROM game WHERE name=$1 OR slug=$2 LIMIT 1`,
      [name.trim(), slug || null]
    );
    if (check.rows.length > 0) {
      return res.status(400).json({ message: 'Game name or slug already exists' });
    }

    const { rows } = await db.query(
      `INSERT INTO game (name, slug, coverurl, description, active)
       VALUES ($1,$2,$3,$4,true)
       RETURNING id, name, slug, coverurl, description, active`,
      [name.trim(), slug || null, coverurl || null, description || null]
    );

    res.status(201).json(rows[0]);
  } catch (e) { next(e); }
});


router.delete('/:id', async (req, res, next) => {
  try {
    await db.query(`DELETE FROM game WHERE id=$1`, [req.params.id]);
    res.json({ message: 'deleted' });
  } catch (e) { next(e); }
});

// ---------- PRICES (nested under game) ----------
router.get('/:gameId/prices', async (req, res, next) => {
  try {
    const { rows } = await db.query(
      `SELECT id, game_id AS "gameId", title,
              price_thb AS "priceThb", iconurl, rank, active
       FROM game_price
       WHERE game_id=$1
       ORDER BY rank ASC, id ASC`,
      [req.params.gameId]
    );
    res.json(rows);
  } catch (e) { next(e); }
});

router.post('/:gameId/prices', async (req, res, next) => {
  try {
    const gameId = Number(req.params.gameId);
    const { title, priceThb, iconurl } = req.body;
    if (!title?.trim()) return res.status(400).json({ message: 'title is required' });
    if (priceThb == null) return res.status(400).json({ message: 'priceThb is required' });

    // ✅ ป้องกัน "ราคาซ้ำ" ในเกมเดียวกัน
    const dup = await db.query(
      `SELECT id FROM game_price WHERE game_id=$1 AND price_thb=$2 LIMIT 1`,
      [gameId, Number(priceThb)]
    );
    if (dup.rows.length > 0) {
      return res.status(400).json({ message: 'This price already exists in this game' });
    }

    // ✅ หา rank ล่าสุดในเกมนี้
    const { rows: maxRows } = await db.query(
      `SELECT COALESCE(MAX(rank),0)+1 AS nextRank FROM game_price WHERE game_id=$1`,
      [gameId]
    );
    const nextRank = maxRows[0].nextrank;

    const { rows } = await db.query(
      `INSERT INTO game_price (game_id, title, price_thb, iconurl, rank, active)
       VALUES ($1,$2,$3,$4,$5,true)
       RETURNING id, game_id AS "gameId", title,
                 price_thb AS "priceThb", iconurl, rank, active`,
      [gameId, title.trim(), Number(priceThb), iconurl || null, nextRank]
    );
    res.status(201).json(rows[0]);
  } catch (e) { next(e); }
});

// อัปเดตเกม
router.put('/:id', async (req, res, next) => {
  try {
    const { name, slug, coverurl, description, active } = req.body;

    const fields = [];
    const values = [];
    let idx = 1;

    if (name !== undefined) { fields.push(`name=$${idx++}`); values.push(name); }
    if (slug !== undefined) { fields.push(`slug=$${idx++}`); values.push(slug); }
    if (coverurl !== undefined) { fields.push(`coverurl=$${idx++}`); values.push(coverurl); }
    if (description !== undefined) { fields.push(`description=$${idx++}`); values.push(description); }
    if (active !== undefined) { fields.push(`active=$${idx++}`); values.push(active); }

    if (!fields.length) return res.status(400).json({ message: 'No fields to update' });

    values.push(req.params.id);

    const sql = `
      UPDATE game SET ${fields.join(', ')}
      WHERE id=$${idx}
      RETURNING id, name, slug, coverurl, description, active
    `;
    const { rows } = await db.query(sql, values);

    if (!rows[0]) return res.status(404).json({ message: 'Game not found' });
    res.json(rows[0]);
  } catch (e) { next(e); }
});


// อัปเดตราคา
router.put('/:gameId/prices/:priceId', async (req, res, next) => {
  try {
    const { title, priceThb, iconurl, rank, active } = req.body;

    const fields = [];
    const values = [];
    let idx = 1;

    if (title !== undefined) { fields.push(`title=$${idx++}`); values.push(title); }
    if (priceThb !== undefined) { fields.push(`price_thb=$${idx++}`); values.push(priceThb); }
    if (iconurl !== undefined) { fields.push(`iconurl=$${idx++}`); values.push(iconurl); }
    if (rank !== undefined) { fields.push(`rank=$${idx++}`); values.push(rank); }
    if (active !== undefined) { fields.push(`active=$${idx++}`); values.push(active); }

    if (!fields.length) return res.status(400).json({ message: 'No fields to update' });

    values.push(req.params.priceId, req.params.gameId);

    const sql = `
      UPDATE game_price SET ${fields.join(', ')}
      WHERE id=$${idx++} AND game_id=$${idx}
      RETURNING id, game_id AS "gameId", title, price_thb AS "priceThb", iconurl, rank, active
    `;
    const { rows } = await db.query(sql, values);

    if (!rows[0]) return res.status(404).json({ message: 'Price not found' });
    res.json(rows[0]);
  } catch (e) { next(e); }
});

// ลบราคา (ของเกมนั้น ๆ)
router.delete('/:gameId/prices/:priceId', async (req, res, next) => {
  try {
    const gameId = Number(req.params.gameId);
    const priceId = Number(req.params.priceId);

    const { rowCount } = await db.query(
      `DELETE FROM game_price WHERE id=$1 AND game_id=$2`,
      [priceId, gameId]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: 'Price not found for this game' });
    }

    // (ทางเลือก) จัด rank ใหม่ให้เรียง 1..n หลังลบ
    await db.query(`
      WITH ranked AS (
        SELECT id, ROW_NUMBER() OVER (ORDER BY rank, id) AS rn
        FROM game_price
        WHERE game_id = $1
      )
      UPDATE game_price gp
      SET rank = r.rn
      FROM ranked r
      WHERE gp.id = r.id AND gp.game_id = $1
    `, [gameId]);

    res.json({ message: 'price deleted' });
  } catch (e) { next(e); }
});

module.exports = router;
