/**
 * Fuzzy String Matching
 *
 * @param {value,column,index,threshold} input The value to fuzzy match
 * @return The index
 * @customfunction
 */

function ZLOOKUP(value, column, index, threshold) {  
  let accArr = []
  for(i=0;i<column.length;++i){
    accArr.push([column[i][0],lev(column[i][0],value)])
    }
  let scoreArr = accArr.map( elem => elem[1])
  if (Math.max(...scoreArr)>threshold){
    let calculatedIndex = scoreArr.indexOf(Math.max(...scoreArr))
    return column[calculatedIndex][index-1]
  } else { 
    throw "Error: No match in column above threshold";
  }
 }

/**
 * Fuzzy String Comparing
 *
 * @param {value1,value2,threshold,valIfEqual,valNotEqual} input The values to fuzzy match
 * @return If similar "valIfEqual", else returns "valNotEqual"
 * @customfunction
 */

function ZCOMPARE(value1, value2, threshold, valIfEqual, valNotEqual) {  
  if (lev(value1, value2) > threshold){
    return valIfEqual
  }else{
    return valNotEqual
  }
 }

// Levenshtein Distance Implementation from https://gist.github.com/andrei-m/982927/0efdf215b00e5d34c90fdc354639f87ddc3bd0a5

function lev(a, b){
  a = String(a)
  b = String(b)
  if(a.length == 0) return b.length; 
  if(b.length == 0) return a.length; 

  var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return (1-matrix[b.length][a.length]/Math.max(a.length,b.length))*100;
};
