let data = [];
window.onload = () => {
    fetchData("new");
};
let search = document.getElementById('search-text');
if (search) {
    search.addEventListener("keydown", (e) => {
        if (e.key == 'Enter')
            Runfetch();
    });
}
const Runfetch = () => {
    fetchData(search.value);
};
const fetchData = async (key) => {
    try {
        key = key ? key : "new";
        let res = await fetch(`https://saavn.me/search/songs?query=${key}&page=1&limit=100`);
        res = await res.json();
        data = res.data.results;
        if (data.length > 0) {
            cardContainer.innerHTML = "";
            addCards();
        }
    }
    catch (err) {
        alert(err);
    }
};
let cardContainer = document.getElementById('cardContainer');
const addCards = () => {
    data.forEach((ele, index) => {
        let div = document.createElement('div');
        div.setAttribute("class", "card flex flex-col just-between");
        div.innerHTML =
            `<div class="c-top">   
                <img src="${ele.image[2].link}" alt="">
            </div>
            <div class="c-bot">
                <h2>${ele.name}</h2>
                <h4>${ele.primaryArtists}</h4>
            </div>
            <div class="layer">
                <button class="play-btn" ><i class="fa-solid fa-play playbtn"> <p class="hidden">${index}</p></i></button>
            </div>
        `;
        cardContainer.appendChild(div);
        console.log("from addCards()");
        if ((data.length - 1) == index) {
            addEvents();
        }
    });
};



const addEvents = () => {
    let playBtn = document.getElementsByClassName('playbtn');
    playBtn = [...playBtn];
    playBtn.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            index = e.target.children[0].innerHTML;
            // console.log(data[index]);
            // console.log(data[index].downloadUrl[2].link);
            playSong(data[index]);
        });
    });
};

{/* <div class="card flex flex-col just-between">
<div class="c-top">
    <img src="https://c.saavncdn.com/290/Malayalam-Trending-Songs-Malayalam-2022-20220728211021-500x500.jpg" alt="">
</div>
<div class="c-bot">
    <h2>Ra Ra...</h2>
    <h4>Tippu, Bhadra Rajin...</h4>
</div>
</div> */}

