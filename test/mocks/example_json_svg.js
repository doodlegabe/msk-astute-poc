exports.json_svg_1 = function(){
  return {
    type: 'element',
    name: 'svg',
    attributes: { width: '100', height: '100', viewBox: '0 0 100 100' },
    value: '',
    children: [
      {
        type: 'element',
        name: 'circle',
        attributes: {
          r: '15',
          'data-name': 'stroke',
          'stroke-linecap': 'round',
        },
        children: [],
        value: '',
      },
    ],
  }
};

exports.json_svg_1_updated = function(){
  return {
    type: 'element',
    name: 'svg',
    attributes: { width: '120', height: '120', viewBox: '0 0 120 120' },
    value: '',
    children: [
      {
        type: 'element',
        name: 'circle',
        attributes: {
          r: '15',
          'data-name': 'stroke',
          'stroke-linecap': 'round',
        },
        children: [],
        value: '',
      },
    ],
  }
};

exports.json_svg_2 = function(){
  return {
    tag: 'svg',
    props: { width: '100', height: '100', viewBox: '0 0 100 100' },
    children: [
      {
        tag: 'circle',
        props: {
          r: '15',
          'data-name': 'stroke',
          'stroke-linecap': 'round',
        },
      },
    ],
  }
};