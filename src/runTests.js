const contests = [
  require('./dsa/Queue.test'),
  require('./number/clipping.test'),
]

contests.forEach(c => c.run())
