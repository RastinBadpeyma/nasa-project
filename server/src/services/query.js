const DEFAULT_PAGE_NUMBER = 1;
// 0: all  of the document in collection
const DEFAULT_PAGE_LIMIT = 0

function getPagination(query){
   //abs = (+ number) => + number || (- number) => + number
   const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER ;
   const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
   const skip = (page - 1) * limit;

   return {
      skip,
      limit,
   };
}

module.exports = {
   getPagination
};