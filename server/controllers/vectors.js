const Vector = require('../models').Vector;

module.exports = {
  create( req, res ){
    return Vector
      .create({
        optimizedDate: null,
        optimizedPath: null,
        optimizedSVG: null,
        originalPath: req.body.originalPath,
        originalSVG: req.body.originalSVG,
        dropboxId: req.body.dropboxId
      })
      .then(vector => res.status(201).send(vector))
      .catch(error => res.status(400).send(error))
  },
  list(req, res) {
    return Vector
      .findAll({
        attributes:['id','dropboxId']
      })
      .then(vector => res.status(200).send(vector))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Vector
      .findByPk(req.params.id)
      .then(vector => {
        if (!vector) {
          return res.status(404).send({
            message: 'VectorFile Not Found',
          });
        }
        return res.status(200).send(vector);
      })
      .catch(error => res.status(400).send(error));
  },
  retrieveOrCreateByDropboxId(req, res) {
    return Vector
      .findAll({
        where:{
          dropboxId: req.body.dropboxId
        },
        attributes : ['id','optimizedDate','optimizedPath', 'optimizedSVG','originalPath','originalSVG','dropboxId','createdAt','updatedAt']
      }
    ).then(vector => {
        if (!vector) {
          return res.status(404).send({
            message: 'VectorFile Not Found',
          });
        }
        if(vector && vector.length === 0){
          return res.status(200).send({
            message: 'No matching Dropbox file',
            found: false
          });
        }
        return res.status(200).send(vector);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Vector
      .findByPk(req.body.id)
      .then(vector => {
        if (!vector) {
          return res.status(404).send({
            message: 'Vector record Not Found',
          });
        }
        return vector
          .update({
            optimizedDate: req.body.optimizedDate || vector.optimizedDate,
            optimizedPath: req.body.optimizedPath || vector.optimizedPath,
            optimizedSVG: req.body.optimizedSVG || vector.optimizedSVG,
            originalPath: req.body.originalPath || vector.originalPath,
            originalSVG: req.body.originalSVG || vector.originalSVG,
            dropboxId: req.body.dropboxId || vector.dropboxId,
          })
          .then(() => res.status(200).send(vector))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return Vector
      .findById(req.params.id)
      .then(vector => {
        if (!vector) {
          return res.status(400).send({
            message: 'VectorFile Not Found',
          });
        }
        return vector
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
