const profileSection = document.querySelector(".profile-section");
let isActive = null;

const fetchData = async () => {
  try {
    const response = await fetch("profile.json");
    const data = await response.json();

    let imageData = data.data;
    const renderImage = imageData
      .map(
        (item, index) => `
              <div class="img" style="--i:${index + 1}">
                      <img src="${item.profile}">
                 </div> `
      )
      .join("");

    profileSection.innerHTML = renderImage;

    const imgElement = document.querySelectorAll(".img");
    const profileDetails = document.querySelector(".profile-details");
    imgElement.forEach((img) => {
      img.addEventListener("click", (ev) => {
        if (isActive) {
          isActive.classList.remove("active");
        }
        img.classList.add("active");
        isActive = img;

        const selectedProfile = imageData.find(
          (item) => ev.target.src === window.location.href + item.profile
        );
        if (selectedProfile) {
          profileDetails.innerHTML = `
                  <div class="img text-center">
                    <img src="${selectedProfile.profile}" alt="" class="rounded-3">
                  </div>
                  <p class="name fs-3 text-dark fw-semibold mb-0">${selectedProfile.name}</p>
                  <p class="status mb-0 text-dark">${selectedProfile.status}</p>
                  <div class="social-icon d-flex gap-2 py-3 justify-content-center">
                    <a href="${selectedProfile.instagram}" target="_blank"><i class="fa-brands fa-square-instagram"></i></a>
                    <a href="${selectedProfile.facebook}" target="_blank"><i class="fa-brands fa-facebook"></i></a>
                    <a href="${selectedProfile.linkdin}" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="${selectedProfile.github}" target="_blank"><i class="fa-brands fa-square-github"></i></a>
                  </div>
                `;
        }
      });
    });
  } catch (error) {
    console.log("this is an error", error);
  }
};

window.addEventListener("load",fetchData);
