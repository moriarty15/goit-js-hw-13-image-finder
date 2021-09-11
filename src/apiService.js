export default class NewApiRequest {
   constructor() {
      this.searchQuery = '';
      this.page = 1;
   }
   feachArticles() {
      const BASE_URL = 'https://pixabay.com/api/';
      const MY_KEY = '23320531-e67f94e9f6229e6b46894ace7'
      const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${MY_KEY}`;

      return fetch(url)
         .then(r => r.json())
         .then(data => {            
            this.incrementPage();
            return data.hits
         })
   }
   incrementPage() {
      this.page += 1;
   }

   resetPage() {
      return this.page = 1;
   }

   get query() {
      return this.searchQuery
   }

   set query(newQuery) {
      this.searchQuery = newQuery;
   }
   
}