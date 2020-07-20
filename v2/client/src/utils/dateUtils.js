export const localDateTime = timestamp => {
  return new Date(timestamp).toLocaleString()
}

export const sinceCreated = timestamp => {
  const then = new Date(timestamp)
  const now = new Date()

  const diffSeconds = (now.getTime() - then.getTime()) / 1000

  let response

  if (diffSeconds <= 60) {
    response = 'now'
  } else if (diffSeconds < 90) {
    response = Math.round(diffSeconds / 60) + ' minute ago'
  } else if (diffSeconds <= 3600) {
    response = Math.round(diffSeconds / 60) + ' minutes ago'
  } else if (diffSeconds < 5400) {
    response = Math.round(diffSeconds / 3600) + ' hour ago'
  } else if (diffSeconds <= 86400) {
    response = Math.round(diffSeconds / 3600) + ' hours ago'
  } else {
    response = 'on ' + then.toLocaleDateString()
  }

  return response
}
