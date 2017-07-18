const cowntDownCreator = (finishTime, everySecondCallback, finishedCallback) => {
  const factoryObj = cowntDownFactory(finishTime, everySecondCallback, finishedCallback)

  return {
    create: () => {
      return requestAnimationFrame(factoryObj.create)
    },
    cancel: () => {
      return factoryObj.cancel()
    }
  }
}

const cowntDownFactory = (finishTime, everySecondCallback, finishedCallback) => {
  let startedTime = null
  let progressTime = null
  let savedForEverySecondTime = null

  let animationFrameID

  return {
    create: function timerCallback(timestamp) {
      if (!startedTime) {
        startedTime = timestamp
        progressTime = timestamp
        savedForEverySecondTime = timestamp
      }

      progressTime = timestamp - startedTime

      if (timestamp - savedForEverySecondTime >= 1000) {
        savedForEverySecondTime = timestamp
        everySecondCallback(parseInt(progressTime))
      }

      if(progressTime >= finishTime) {
        finishedCallback(parseInt(progressTime))
      } else {
        animationFrameID = requestAnimationFrame(timerCallback)
      }
    },
    cancel: () => {
      if(animationFrameID)
        cancelAnimationFrame(animationFrameID)
    }
  }
}

export default cowntDownCreator
