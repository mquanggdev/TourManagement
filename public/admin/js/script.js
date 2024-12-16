// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", () => {
    const file = uploadImageInput.files[0];
    if(file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
// End Upload Image

// Xóa sản phẩm - bao gồm xóa vĩnh viễn và xóa mềm
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
  buttonDelete.forEach(item => {
    item.addEventListener("click", () => {
      const link = item.getAttribute("button-delete");
      if (link) {
        fetch(link, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => res.json())
        .then(data => {
          if (data.code === 200) {
            window.location.reload();
          } else {
            console.log ("Không thể xóa danh mục.");
          }
        })
        .catch(error => {
          console.error("Lỗi khi xóa danh mục:", error);
          console.log("Có lỗi xảy ra khi xóa danh mục.");
        });
      }
    });
  });
}

// End Xóa sản phẩm