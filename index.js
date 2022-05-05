$(document).ready(function () {
  const postList = $("#postList");

  //GET REQUESTI UCUN
  const renderPosts = (arr) => {
    postList.html(
      arr
        .reverse()
        .map(
          (post) => `
                <div class="card m-4 w-100 position-relative">
                    <img
                    src="https://cdn.dribbble.com/users/713533/screenshots/14158095/media/ae32d01dfc221a34aa5f3a2060a1e028.png?compress=1&resize=400x300"
                    class="card-img-top"
                    height="200"
                    id="moviePoster"
                    style="object-fit: cover"
                    />
                    <div class="card-body">
                    <h5 class="card-title" id="movieName">${post.title}</h5>
                    <p class="card-text" id="movieAwards">
                        ${post.body}
                    </p>
                 
                    <button class="delete-button" value="${post.id}">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
            </div>
            `
        )
        .join("")
    );
  };

  const getPosts = () => {
    $("#postDesc").val("");

    $.ajax({
      url: "https://bloggy-api.herokuapp.com/posts",
      method: "GET",
      // headers:{
      //     "api-key":"43jhfs",
      //     "Content-Type":"application/json"
      // }
      // data:{
      //     apiKey:"dsasd",
      //     t:"titanic"
      // }
    }).then((res) => {
      console.log("getPosts", res);
      renderPosts(res);
    });
  };

  const createPost = (postData) => {
    $.ajax({
      url: "https://bloggy-api.herokuapp.com/posts",
      method: "POST",
      data: postData,
    })
      .then(() => {
        getPosts();
        $("#postTitle").val("");
        $("#postDesc").val("");
      })
      .catch((err) => {
        alert(err);
      });
  };

  $("#addPostBtn").on("click", function () {
    let title = $("#postTitle").val();
    let body = $("#postDesc").val().trim();

    let createPostData = {
      title,
      body,
    };

    console.log(createPostData);
    createPost(createPostData);
  });

  //Delete ucun
  $(document).on("click", ".delete-button", function () {
    let buttonValue = $(this).val();

    console.log("postID", buttonValue);

    let userConfirm = confirm("Silmek istediyivize eminsinizmi?");

    if (userConfirm) {
      console.log("Xeber silindi");
      deletePost(buttonValue);
    } else {
      console.log("Xeber silinmedi");
    }
  });

  const deletePost = (id) => {
    $.ajax({
      url: `https://bloggy-api.herokuapp.com/posts/${id}`,
      method: "DELETE",
    })
      .then(() => {
        alert("Post ugurla silindi");
        getPosts();
      })
      .catch((err) => {
        alert("Yeniden cehd edin!");
      });
  };

  getPosts();
});
