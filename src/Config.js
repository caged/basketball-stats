const Config = {
  stats: [
    'EFG_PCT',
    'TS_PCT',
    'USG_PCT'
  ],

  filter: function(d) {
    return +d.GP >= 20
  }
}

export default Config
