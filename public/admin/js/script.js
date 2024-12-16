// // thêm danh mục
// const formCategoryCreate = document.querySelector("[form-category-create]") ;
// if(formCategoryCreate) {
//     formCategoryCreate.addEventListener("submit" , (event) => {
//     event.preventDefault();

//     const data = {
//       title: formCategoryCreate.title.value,
//       description : formCategoryCreate.description.value ,
//       image : formCategoryCreate.image.value ,
//       status : formCategoryCreate.status.value ,
//       position : formCategoryCreate.position.value
//     } 
//     try {
//       fetch("/admin/categories/create" , {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)},
        
//       )
//       .then(res => res.json())
//       .then(data => {
//         if(data.code == 200) {
//           window.location.href = `/admin/categories`;
//         }
//       })
//     } catch (error) {
//       console.log(error);
//     }
    
//   })
// }