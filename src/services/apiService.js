import axios from "axios";

const MY_API_KEY = "23063121-c7c43e31505ed95884d92e826";
axios.defaults.baseURL =
  "https://pixabay.com/api/?image_type=photo&orientation=horizontal&safesearch=false";

export async function getPictures(query, page) {
  const {
    data: { hits },
  } = await axios.get(`&q=${query}&page=${page}&per_page=12&key=${MY_API_KEY}`);

  return hits;
}


