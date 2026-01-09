// async function loadUser() {
//   const user = await fetchUser();
//   const posts = await fetchPosts(user.id);
//   return { user, posts };
// }

function loaduser(){
    return new Promise(()=>{
        fetchuser
    })
}

    loaduser()
        .then(()=>{
            return fetchUser()
                .then((data)=>{
                    return fetchPosts(data.id)
                })
        })