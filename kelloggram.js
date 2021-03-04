firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log('signed in')

    // Sign-out button
    document.querySelector('.sign-in-or-sign-out').innerHTML = `
      <button class="text-pink-500 underline sign-out">Sign Out</button>
    `
    document.querySelector('.sign-out').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
    })

    // Listen for the form submit and create/render the new post
    document.querySelector('form').addEventListener('submit', async function(event) {
      event.preventDefault()
      let postUsername = user.displayName
      let postImageUrl = document.querySelector('#image-url').value
      // 🔥🔥🔥 Lab
      // Step 1:   POST fetch the create_post endpoint. Send the currently logged-in
      //           user's uid and username, and the image URL from the form in the
      //           POST request's body.
      // Step 2-5: Implement the lambda function in create_post.js
      // Step 6:   The lambda should return an Object of data with information on the
      //           the post, including the newly created post's id. Use this JSON response
      //           object and pass the post's relevant values on to the renderPost()
      //           function below.
      // 🔥🔥🔥 End Lab
      document.querySelector('#image-url').value = '' // clear the image url field
      renderPost(postId, postUsername, postImageUrl, numberOfLikes)
    })

    let response = await fetch('/.netlify/functions/get_posts')
    let posts = await response.json()
    for (let i=0; i<posts.length; i++) {
      let post = posts[i]
      renderPost(post.id, post.username, post.imageUrl, post.likes)
    }
  } else {
    // Signed out
    console.log('signed out')

    // Hide the form when signed-out
    document.querySelector('form').classList.add('hidden')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})

// given a single post Object, render the HTML and attach event listeners
// expects attributes from an Object that looks similar to:
// {
//   id: 'abcdefg',
//   username: 'brian',
//   imageUrl: 'https://images.unsplash.com/...',
//   likes: 12
// }
async function renderPost(id, username, imageUrl, likes) {
  document.querySelector('.posts').insertAdjacentHTML('beforeend', `
    <div class="post-${id} md:mt-16 mt-8 space-y-8">
      <div class="md:mx-0 mx-4">
        <span class="font-bold text-xl">${username}</span>
      </div>

      <div>
        <img src="${imageUrl}" class="w-full">
      </div>

      <div class="text-3xl md:mx-0 mx-4">
        <button class="like-button">❤️</button>
        <span class="likes">${likes}</span>
      </div>
    </div>
  `)

  // listen for the like button on this post
  let likeButton = document.querySelector(`.post-${postId} .like-button`)
  likeButton.addEventListener('click', async function(event) {
    event.preventDefault()
    console.log(`post ${postId} like button clicked!`)
    let currentUserId = firebase.auth().currentUser.uid

    // 🔥🔥🔥 Code-Along
    // POST fetch the like endpoint and test for success
    // 🔥🔥🔥 End Code-Along

    let existingNumberOfLikes = document.querySelector(`.post-${postId} .likes`).innerHTML
    let newNumberOfLikes = parseInt(existingNumberOfLikes) + 1
    document.querySelector(`.post-${postId} .likes`).innerHTML = newNumberOfLikes
  })
}
