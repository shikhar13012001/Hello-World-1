function search() {
  const val = document.querySelector(".MovieSearch");
  const searchParam = val.value;
  let str = "";
  for (let i = 0; i < searchParam.length; i++) {
    if (searchParam[i] === " ") {
      str += "%20";
    } else {
      str += searchParam[i];
    }
  }

  async function getMovie() {
    try {
        console.log("i have run")
      const response = await fetch(
        `https://imdb8.p.rapidapi.com/auto-complete?q=${str}`,
        {
          method: "GET",
          "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": "892adc1b5dmsh7cbbeb1057feeb6p1a3c5ejsnc381149ac2cb"
        },
        }
      );
      const data = await response.json();
      console.log(data);
     let img = document.querySelector(".moviePoster");
      img.src = data.d[0].i.imageUrl;
      let title = document.querySelector(".title");
      title.innerHTML = data.d[0].l;
      let cast = document.querySelector(".cast");
      cast.innerHTML = data.d[0].s;
      let rank=document.querySelector(".rank");
      rank.innerHTML="IMDB Rank: "+data.d[0].rank;
      console.log(rank);
      const recommend=document.querySelector(".otherReccomendations")
      recommend.innerHTML="";
      let ans=[];
      for(let it=0;it<data.d.length;it++)
      { const div=document.createElement('div');
      div.classList.add("adjust-div");
     
          div.innerHTML=`<img src=${data.d[it].i.imageUrl} class="adjust">`
          recommend.appendChild(div);
        ans.push(data.d[it]);
          
      }

      console.log(ans,"Colut");
      const arr=document.querySelectorAll('.adjust-div');
      console.log(arr.length);
      arr.forEach((element,ix)=>element.addEventListener("click",()=>{
    
          cast.innerHTML=ans[ix].s;
          title.innerHTML=ans[ix].l;
          img.src=ans[ix].i.imageUrl;
      }))
    } catch (e) {
      console.log(e);
    }
  }
  getMovie();
}
