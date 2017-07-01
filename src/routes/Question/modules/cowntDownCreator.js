const cowntDownCreator = (finishTime, everySecondCallback, finishedCallback) => {
  requestAnimationFrame(cowntDownFactory(finishTime, everySecondCallback, finishedCallback))
}

const cowntDownFactory = (finishTime, everySecondCallback, finishedCallback) => {
  let startedTime = null
  let progressTime = null
  let savedForEverySecondTime = null

  return function timerCallback (timestamp) {
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
      requestAnimationFrame(timerCallback)
    }

  }
}

export default cowntDownCreator
