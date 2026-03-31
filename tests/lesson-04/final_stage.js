let selectedNumbersSet = new Set();
// //  Anws1:
//  for (let i = 1; i <= 100; i++) {
//         for (let j = 1; j <= 100; j ++ ){
//             if((i + j) % 17 === 0){
//                 let pair = i > j ? [i, j] : [j, i];
//                 selectedNumbersSet.add(pair.toString());
//             }
//         }
//  }
//  console.log(selectedNumbersSet);
  

//  Anws2:
// for (let i = 1; i <= 100; i++) {
//     for (let j = i; j <= 100; j ++ ){
//         if((i + j) % 17 === 0){
//             let pair = i > j ? [i, j] : [j, i];
//             selectedNumbersSet.add(pair.toString());
//         }
//     }
// }
// console.log(selectedNumbersSet.size);

// Anws3:

for (let i =1; i <= 100; i++){
    let targetNumber = 17 - (i % 17);
    for (let j = targetNumber; j <= 100; j +=17){
        let pair = i > j ?  [i,j] : [j,i] ;
        selectedNumbersSet.add(pair.toString());
    } 
}
console.log(selectedNumbersSet.size);
