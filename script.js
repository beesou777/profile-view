const profileSection = document.querySelector(".profile-section");
const container = document.querySelector(".container-max");

let isActive = null;

const profileData = [];
const fetchData = async () => {
  try {
    const response = await fetch("profile.json");
    const data = await response.json();
    profileData.push(data.data);
  } catch (error) {
    console.log("this is an error", error);
  }
};

const proData = fetchData().then(() => {
  let newData = "";
  let profileMatch = []
  profileData.forEach((data) => {
    data.forEach((datas, index) => {
      newData += `
            <div class="img" style="--i:${index + 1}">
                    <img src="${datas.profile}">
            </div>
            `;
    });
  });
  profileSection.innerHTML = newData;
  const img = document.querySelectorAll(".img");
  const profileDetails = document.querySelector(".profile-details");
  img.forEach((img) => {
    img.addEventListener("click", (ev) => {
      if (isActive) {
        isActive.classList.remove("active");
      }
      img.classList.add("active");
      isActive = img;

      profileData.forEach((data)=>{
            data.forEach((datas,index)=>{
                const location = window.location.href
                if(ev.target.src === location+datas.profile){
                   const NewprofileDetails = `
                   <div class="img text-center">
                   <img src="${datas.profile}" alt="" class="rounded-3">
                  </div>
                  <p class="name fs-3  text-dark fw-semibold mb-0">${datas.name}</p>
                  <p class="status mb-0 text-dark">${datas.status}</p>
                   <div class="social-icon d-flex gap-2 py-3 justify-content-center">
                   <a href="${datas.instagram}" target="_blank" > <i class="fa-brands fa-square-instagram"></i></a> 
                   <a href="${datas.facebook}" target="_blank" ><i class="fa-brands fa-facebook"></i></a>
                       <a href="${datas.linkdin}" target="_blank" > <i class="fa-brands fa-linkedin"></i></a>
                        <a href="${datas.github}" target="_blank" ><i class="fa-brands fa-square-github"></i></a>
                       
                   </div> 
                   `
                    
                     profileDetails.innerHTML = NewprofileDetails;
                }
            })
      })
    });
  });
});

window.addEventListener("load", () => {
  proData;
});
