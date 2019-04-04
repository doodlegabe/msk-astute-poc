const Canvas = require("../models").Canvas;

module.exports = {
  create( req, res ){
    return Canvas
      .create({
        bluescapeCanvasId: req.body.bluescapeCanvasId,
        workspaceid: req.body.workspaceid
      })
      .then(canvas => res.status(201).send(canvas))
      .catch(error => res.status(400).send(error))
  },
  list(req, res) {
    return Canvas
      .all()
      .then(canvas => res.status(200).send(canvas))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Canvas
      .findById(req.params.id)
      .then(canvas => {
        if (!canvas) {
          return res.status(404).send({
            message: 'Canvas Not Found',
          });
        }
        return res.status(200).send(canvas);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Canvas
      .findById(req.params.id)
      .then(canvas => {
        if (!canvas) {
          return res.status(404).send({
            message: 'Canvas Not Found',
          });
        }
        return canvas
          .update({
            bluescapeCanvasId: req.body.bluescapeCanvasId || canvas.bluescapeCanvasId,
            workspaceid: req.body.bluescapeCanvasId || canvas.workspaceid
          })
          .then(() => res.status(200).send(canvas))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return Canvas
      .findById(req.params.id)
      .then(canvas => {
        if (!canvas) {
          return res.status(400).send({
            message: 'Canvas Not Found',
          });
        }
        return canvas
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
