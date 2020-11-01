const express = require('express');
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');

const minionsRouter = express.Router();

// minionsRouter.param('minionId', (req, res, next, id) => {
// 	const minion = getFromDatabaseById('minion', id);
// 	if (minion) {
// 		req.minion = minion;
// 		next();
// 	} else {
// 		res.status(404).send();
// 	}
// });

minionsRouter.param('workId', (req, res, next, id) => {
	const work = getFromDatabaseById('work', id);
	if (work) {
		req.work = work;
		next();
	} else {
		res.status(404).send();
	}
});

minionsRouter.get('/', (req, res, next) => {
	const minions = getAllFromDatabase('minions');
	if (minions) {
		res.status(200).send(minions);
	} else {
		res.status(404).send();
	}
});

minionsRouter.get('/:minionId', (req, res, next) => {
	const minionId = req.params.minionId;
	const minion = getFromDatabaseById('minions', minionId);
	if (minion) {
		res.status(200).send(minion);
	} else {
		res.status(404).send();
	}	
});

minionsRouter.get('/:minionId/work', (req, res, next) => {
	const allWork = getAllFromDatabase('work');
	const minionWork = allWork.filter(work => {
		return work.minionId === req.params.minionId;
	});
	if (minionWork.length > 0) {
		res.status(200).send(minionWork);
	} else {
		res.status(404).send();
	}
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    const minion = getFromDatabaseById('minions', minionId);
    if (minion) {
        req.minion = minion;
        const updatedMinion = updateInstanceInDatabase('minions', req.body);
        res.status(200).send(updatedMinion);
    } else {
        res.status(404).send();
    }
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
	const minionId = req.params.minionId;
	const minion = getFromDatabaseById('minions', minionId);
	if (minion) {
		if (req.body.minionId === minionId) {
			const updatedWork = updateInstanceInDatabase('work', req.body);
			res.send(updatedWork);
		} else {
			res.status(400).send();
		}
	} else {
		res.status(404).send();
	}
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
	const newWork = addToDatabase('work', req.body);
	res.status(201).send(newWork);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
	const minionId = req.params.minionId;
	const minion = deleteFromDatabasebyId('minions', minionId);
	if (!minion) {
		res.status(404).send();
	} else {
		res.status(204).send();
	}
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
	deleteFromDatabasebyId('work', req.params.workId);
	res.status(204).send();
});

module.exports = minionsRouter;
