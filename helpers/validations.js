module.exports = {
   isEmpty: (value) => {
      if (value === null || value === '' || value === undefined) {
         return true;
      } else {
         return false;
      }
   },

}