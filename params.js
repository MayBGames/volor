module.exports = {
  biom: {
    rules: 'left:25:10/20:10/20,right:25:10/20:10/20,up:25:10/20:10/20,down:25:10/20:10/20->10000',
    properties: require('./biom_properties'),
    direction_allowed: require('./direction_allowed'),
    transform: {
      template: 'A:is_horizontal,B:is_narrow,C:is_tall',
      effects:  'A=ground:+20:0/0:0/0,B=ground:-20:10/10:11/11,C=ground:0:-10/-10:0/20',
      mask:     'AB,BA'
    }
  }
}
