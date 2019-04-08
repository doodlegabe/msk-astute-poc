import vectorExamples from './example_json_svg'

const vectorFileList = [
  {
    id: 1,
    optimizedDate: new Date(),
    optimizedPath: '/optimized/drawing_optimized.svg',
    optimizedSVG: JSON.stringify(vectorExamples.json_svg_1),
    originalPath:'/drawing.svg',
    originalSVG: JSON.stringify(vectorExamples.json_svg_2),
    updatedAt: new Date(),
    createdAt: new Date()
  }
];

exports.createVectorFile = function(){
  return vectorFileList[0]
};

exports.listVectorFiles = function(){
  return { vectorFiles: vectorFileList }
};

exports.retrieveVectorFile = function(){
  return vectorFileList[0]
};

exports.updateVectorFile = function(){
  let example = vectorFileList[0];
  example.optimizedSVG = JSON.stringify(vectorExamples.json_svg_1_updated);
  example.updatedAt = new Date();
  return example
};