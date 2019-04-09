import vectorExamples from './example_json_svg'

const vectorList = [
  {
    id: 1,
    optimizedDate: new Date(),
    optimizedPath: '/optimized/drawing_optimized.svg',
    optimizedSVG: JSON.stringify(vectorExamples.json_svg_1),
    originalPath:'/drawing.svg',
    originalSVG: JSON.stringify(vectorExamples.json_svg_2),
    updatedAt: new Date(),
    createdAt: new Date(),
    dropboxId: '49YU1498JK'
  }
];

exports.createVector = function(){
  return vectorList[0]
};

exports.listVectors = function(){
  return { vectors: vectorList }
};

exports.retrieveVector= function(){
  return vectorList[0]
};

exports.newDropboxID = function(){
  let example = vectorList[0];
  example.dropboxId = '59YU1498JK';
  return example
};

exports.updateVector = function(){
  let example = vectorList[0];
  example.optimizedSVG = JSON.stringify(vectorExamples.json_svg_1_updated);
  example.updatedAt = new Date();
  return example
};