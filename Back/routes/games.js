// Back/routes/games.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ---------- GAME ----------
router.get('/', async (req, res, next) => {
  try {
    const { rows } = await db.query(
      `SELECT id, name, slug, coverurl, description
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
      ? `SELECT id, name, slug, coverurl, description FROM game WHERE id=$1`
      : `SELECT id, name, slug, coverurl, description FROM game WHERE slug=$1`;
    const { rows } = await db.query(sql, [p]);
    if (!rows[0]) return res.status(404).json({ message: 'Game not found' });
    res.json(rows[0]);
  } catch (e) { next(e); }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, slug, coverurl, description } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: 'name is required' });
    const { rows } = await db.query(
      `INSERT INTO game (name, slug, coverurl, description)
       VALUES ($1,$2,$3,$4)
       RETURNING id, name, slug, coverurl, description`,
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
              price_thb AS "priceThb", iconurl, rank
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
    const { title, priceThb, iconurl, rank = 0 } = req.body;
    if (!title?.trim()) return res.status(400).json({ message: 'title is required' });
    if (priceThb == null) return res.status(400).json({ message: 'priceThb is required' });

    const { rows } = await db.query(
      `INSERT INTO game_price (game_id, title, price_thb, iconurl, rank)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING id, game_id AS "gameId", title,
                 price_thb AS "priceThb", iconurl, rank`,
      [gameId, title.trim(), Number(priceThb), iconurl || null, Number(rank)]
    );
    res.status(201).json(rows[0]);
  } catch (e) { next(e); }
});

router.delete('/:gameId/prices/:priceId', async (req, res, next) => {
  try {
    await db.query(`DELETE FROM game_price WHERE id=$1 AND game_id=$2`,
      [req.params.priceId, req.params.gameId]);
    res.json({ message: 'price deleted' });
  } catch (e) { next(e); }
});

module.exports = router;
