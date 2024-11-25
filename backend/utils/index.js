module.exports.formatLotteryNumber = (number) => {
  const numberString = number.toString().padStart(12, '0'); // Ensure it's 12 digits with leading zeros
  const splitNumber = numberString.match(/.{1,2}/g); // Split into groups of 2 digits

  // Convert each group back to a number and return as an array
  return splitNumber.map(num => parseInt(num, 10));
};



// module.exports.formatDrawLotteryNumber = (number) => {


//   const splitNumber = number.match(/.{1,2}/g); // Split into groups of 2 digits

//   const solidNumber = splitNumber.map(num => parseInt(num, 10)).join('');
//   console.log(parseInt(solidNumber, 10))

//   console.log(splitNumber.map(num => parseInt(num, 10)))
//   // Convert each group back to a number and return as an array
//   return splitNumber.map(num => parseInt(num, 10));
// };


module.exports.formatDrawLotteryNumber = (number) => {
  const splitNumber = number.match(/.{1,2}/g); // Split into groups of 2 digits

  // Join the split numbers back into a single string and convert to an integer
  const makeSolidNumber = splitNumber.map(num => parseInt(num, 10)).join('');

  const solidNumber = parseInt(makeSolidNumber, 10)

  // Convert each group back to a number
  const arrayNumbers = splitNumber.map(num => parseInt(num, 10));

  // Return both solidNumber and parsedNumbers
  return {
    solidNumber,
    arrayNumbers,
  };
};





