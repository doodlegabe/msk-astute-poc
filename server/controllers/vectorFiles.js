const VectorFile = require("../models").VectorFile;

module.exports = {
  create( req, res ){
    return VectorFile
      .create({

      })
      .then(vectorFile => res.status(201).send(vectorFile))
      .catch(error => res.status(400).send(error))
  },
  list(req, res) {
    return VectorFile
      .all()
      .then(vectorFile => res.status(200).send(vectorFile))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return VectorFile
      .findById(req.params.id)
      .then(vectorFile => {
        if (!vectorFile) {
          return res.status(404).send({
            message: 'Vector File Not Found',
          });
        }
        return res.status(200).send(vectorFile);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return VectorFile
      .findById(req.params.id)
      .then(vectorFile => {
        if (!vectorFile) {
          return res.status(404).send({
            message: 'Vector File Not Found',
          });
        }
        return vectorFile
          .update({

          })
          .then(() => res.status(200).send(vectorFile))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return VectorFile
      .findById(req.params.id)
      .then(vectorFile => {
        if (!vectorFile) {
          return res.status(400).send({
            message: 'Vector File Not Found',
          });
        }
        return vectorFile
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
