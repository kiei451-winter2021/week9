// /.netlify/functions/like
let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()
  let body = JSON.parse(event.body)
  let userId = body.userId
  let username = body.username
  let imageUrl = body.imageUrl
  
  console.log(`user: ${userId}`)
  console.log(`imageUrl: ${imageUrl}`)

  let docRef = await db.collection('posts').add({ 
    userId: userId,
    username: username, 
    imageUrl: imageUrl, 
    created: firebase.firestore.FieldValue.serverTimestamp()
  })

  return {
    statusCode: 200,
    body: docRef.id
  }

}